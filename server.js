const express = require('express');
const connectDB = require("./config/db");

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');


const app = express();
// 2-Middleware
app.use(express.json({ extended: false}))


// connect mongoose
connectDB();

// Use Routes
app.use('/api/users', users);
app.use('/api/auth', auth);


// run server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
