//importing express library
const express = require("express");
const app = express();

//importing database function
const DBConn = require("./config/DBConn")

//importing dotenv library
require("dotenv").config();
const port = process.env.PORT || 5000;

//importing auth router here
const router = require("./routes/AuthRoutes")

//importing cors library
const cors = require("cors");

//importing the bodyparser library for accepting json data
const bodyParser = require("body-parser");

//using cors for avoiding cross origin resource sharing error while sending req to server
app.use(cors());

//middlewares for accepting incoming json and parsing data
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//calling the database connection function
DBConn()

//declaring  auth router here
app.use("/auth", router);

//simple message for all routes on server port that API's are running
app.get("*", (req, res) => {
  res.send("API's are running");
});

//making the app run on specified port
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
