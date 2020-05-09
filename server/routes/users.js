let User = require("../models/userModel");

module.exports = (app) => {
  app.get("/users", (req, res) => {
    User.find() //mongodb'den butun Userslari aliyor
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  app.post("/users/add", (req, res) => {
    const username = req.body.username; //yapilan post requeslet req.body'ye gidiyor.
    const newUser = new User({ username });

    newUser
      .save()
      .then(() => res.json("User added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
};
