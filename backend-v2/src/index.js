const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRoutes = require ('../routes/AuthRoutes');
const userRoutes = require ('../routes/UserRoutes');
const PollRoutes = require ('../routes/PollRoutes');
const VoteRoutes = require('../routes/VoteRoutes');
const pool = require("../config/db");
//const UploadRoutes = require ('../routes/uploadRoutes');
const app = express();
app.use(cors()); // Enable CORS

app.use(cors({
  origin: 'http://localhost:3001',  // Allow only this origin
}));
app.use(express.json());
app.use(bodyParser.json());
app.use('/auth', AuthRoutes);
app.use('/polls', PollRoutes);
app.use('/users',userRoutes);
app.use('/votes',VoteRoutes);
//app.use('/upload',UploadRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  
});
