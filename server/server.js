const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //to connect mongoDB
const bodyParser = require("body-parser");

require("dotenv").config();

//create server
const app = express();

//middlewares
app.use(cors());
app.use(express.json()); //allow us to parse JSON bcs our server will send and receive JSON
app.use(bodyParser.urlencoded({ extended: true }));
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

require("./routes/users")(app);
require("./routes/exercises")(app);

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //like our main.js file, or main.css file
  app.use(express.static("../build"));

  //express will serve up the index.html file
  //if it doesn't recognize the route

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000; //Whenever Heroku runs or application it has the ability to inject what are called environment variablesenvironment variables are variables that are set in the underlying runtime that node is running on top of.
app.listen(PORT);
