const express = require('express');
const AuthRoutes = require ('../routes/AuthRoutes');
const userRoutes = require ('../routes/UserRoutes');
const PollRoutes = require ('../routes/PollRoutes');
const VoteRoutes = require('../routes/VoteRoutes');

const app = express();

app.use(express.json());

app.use('/auth', AuthRoutes);
app.use('/polls', PollRoutes);
app.use('/users',userRoutes);
app.use('/votes',VoteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
