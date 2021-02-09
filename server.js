const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { findOneAndUpdate } = require("./models/Workout");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  db.Workout.find({})
    .populate("Exercise")
    .sort(-1)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/exercise", ({ body }, res) => {
  const newObj = {
    name: body.name,
    reps: body.reps,
    unit: body.unit,
    notes: body.notes,
  };
  db.Exercise.create(newObj)
    .then(({ _id }) =>
      db.Workout.findOneAndUpdate(
        { _id: body._id },
        { $push: { exercises: _id } },
        { new: true }
      )
    )
    .then((dbWorkout) => {
      res.send(dbWorkout);
    })
    .catch((err) => {
      res.send(err);
    });
});

// app.put();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
