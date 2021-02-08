const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    require: "Enter a name for the exercise",
  },
  Exercise: {
    type: Schema.Types.ObjectId,
    ref: "Exercise",
  },
  date: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
