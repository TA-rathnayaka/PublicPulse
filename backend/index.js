const dotenv = require('dotenv');
const connectDB = require('./config/db'); 

dotenv.config();

const app = require('./app'); 

connectDB()

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
