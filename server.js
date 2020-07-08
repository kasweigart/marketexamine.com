require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 3001;



app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const homeRouter = require("./routes/home");
app.use("/home", homeRouter);

const marketsRouter = require("./routes/markets");
app.use("/markets", marketsRouter);

const newsRouter = require("./routes/news");
app.use("/news", newsRouter);

const toolsRouter = require("./routes/tools");
app.use("/tools", toolsRouter);

const cryptoRouter = require("./routes/crypto");
app.use("/crypto", cryptoRouter);

const contactRouter = require("./routes/contact");
app.use("/contact", contactRouter);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(port, "127.0.0.1");
console.log(`Listening on port ${port}...`);
