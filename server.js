const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const path = require('path');
const usersRouter = require('./routes/users');
const watchlistsRouter = require('./routes/watchlists');
require('dotenv').config();
const port = 3001;


app.use(cors());

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/users', usersRouter);
app.use('/watchlists', watchlistsRouter);

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });


app.listen(port, "127.0.0.1");
console.log(`Listening on port ${port}...`);
