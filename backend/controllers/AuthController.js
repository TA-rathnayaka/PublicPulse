const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  // Incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // Incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // Duplicate email or nationalId error
  if (err.code === 11000) {
    if (err.keyValue.email) {
      errors.email = 'That email is already registered';
    } else if (err.keyValue.nationalId) {
      errors.nationalId = 'That national ID is already registered';
    }
    return errors;
  }

  // Validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const registerUser = async (req, res) => {
  try {
    const { 
      email, 
      password, 
      birthdate, 
      district, 
      division, 
      nationalId, 
      citizenship, 
      phoneNo, 
      imgURL 
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      email,
      password,
      birthdate,
      district,
      division,
      nationalId,
      Verified: false, // Automatically set to false
      citizenship,
      phoneNo,
      imgURL
    });

    const savedUser = await newUser.save();
    console.log('User registered successfully:', savedUser);

    // Generate JWT
    const token = jwt.sign({ savedUser. }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });;
    res.cookie('jwt', token, { 
      httpOnly: true, 
      maxAge: maxAge * 1000,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).json({ user: savedUser._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(500).json({ message: 'Something went wrong', errors });
  }
};

const loginUser = async (req, res) => {
  console.log('login called');
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      const auth = await bcrypt.compare(password, existingUser.password);
      if (auth) {
        // Generate JWT
        const token = createToken(existingUser._id);
        res.cookie('jwt', token, { 
          httpOnly: true, 
          maxAge: maxAge * 1000,
          sameSite: 'Lax'
        });
        return res.status(200).json({ user: existingUser._id });
      } else {
        throw new Error('incorrect password');
      }
    } else {
      throw new Error('incorrect email');
    }
  } catch (error) {
    const errors = handleErrors(error);
    return res.status(400).json({ errors });
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // Clear the JWT token
  res.status(200).json({ message: 'Logged out successfully' });
};

const checkAuth = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json({ isLoggedIn: false }); 
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ isLoggedIn: true });
  } catch (err) {
    return res.json({ isLoggedIn: false });  
  }
};

module.exports = { registerUser, loginUser, logout, checkAuth };
