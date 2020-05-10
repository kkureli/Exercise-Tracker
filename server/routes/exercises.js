let Exercise = require("../models/exerciseModel");

module.exports = (app) => {
  app.get("/exercises", (req, res) => {
    Exercise.find()
      .then((exercises) => res.json(exercises))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  app.post("/exercises/add", (req, res) => {
    const { username, description } = req.body;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
      username,
      description,
      duration,
      date,
    });

    newExercise
      .save()
      .then(() => res.json("Exercise added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  app.get("/exercises/:id", (req, res) => {
    Exercise.findById(req.params.id)
      .then((exercise) => res.json(exercise))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  app.delete("/exercises/:id", (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json("Exercise deleted"))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  app.post("/exercises/update/:id", (req, res) => {
    Exercise.findById(req.params.id)
      .then((exercise) => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = req.body.duration;
        exercise.date = Date.parse(req.body.date);

        exercise
          .save()
          .then(() => res.json("Exercises updated"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
};
