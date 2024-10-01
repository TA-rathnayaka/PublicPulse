const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // Check for duplicate email error (PostgreSQL unique constraint violation)
  if (err.code === "23505" && err.constraint === "users_email_key") {
    errors.email = "This email is already registered";
  }

  // Validation error for password (you can customize this based on your validation logic)
  if (err.message.includes("password")) {
    errors.password = "Password must be at least 8 characters long";
  }

  return errors;
};

const loginUser = async (req, res) => {
  console.log('login called');
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const existingUser = result.rows[0];
    
    // Add check if user does not exist
    if (!existingUser) {
      return res.status(400).json({ errors: { email: "Email not found" } });
    }

    // Compare provided password with the hashed password in the database
    const auth = await bcrypt.compare(password, existingUser.password);

    if (auth) {
      // Generate JWT if authentication is successful
      const token = createToken(existingUser.userid);
      console.log(token);
      
      // Set the cookie with the JWT token
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
        sameSite: "Lax",
        // Only set secure flag in production
        secure: process.env.NODE_ENV === "production",
      });
      console.log('success');
      // Return the user ID on successful login
      return res.status(200).json({ user: existingUser.userid });
    } else {
      // Password does not match
      return res.status(400).json({ errors: { password: "Incorrect password" } });
    }
  } catch (error) {
    console.error(error);
    // Handle any other errors
    const errors = handleErrors(error);
    return res.status(500).json({ errors });
  }
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING UserId",
      [email, hashedPassword]
    );

    const userId = result.rows[0].userid;
    const token = createToken(userId);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production", // Ensure this only applies in production
    });

    res.status(201).json({ user: userId });
  } catch (error) {
    console.error(error);
    const errors = handleErrors(error);
    res.status(500).json({ message: "Something went wrong", errors });
  }
};

module.exports = { loginUser, registerUser };
