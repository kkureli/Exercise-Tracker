const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //to connect mongoDB
const bodyParser = require("body-parser");

require("dotenv").config();

//create server
const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => {
  console.log("Server is running");
});
