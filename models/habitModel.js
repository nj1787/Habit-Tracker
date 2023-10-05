const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: String,
  status: String,
  statusHistory: [{ date: Date, status: String }],
});

module.exports = mongoose.model("Habit", habitSchema);
