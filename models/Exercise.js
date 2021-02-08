const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Exercise name",
  },
  count: {
    type: Number,
    required: "Exercise Count",
  },
  unit: {
    type: String,
    required: "Unit",
  },
  notes: String,
});

const Exercise = mongoose.model("User", ExerciseSchema);

module.exports = Exercise;
