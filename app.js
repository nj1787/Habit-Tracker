const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const habitController = require("./controllers/habitController");

mongoose.connect("mongodb://localhost/habit-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", habitController.getIndex);
app.post("/update-habit/:id", habitController.updateHabit);
app.post("/add-habit", habitController.addHabit); // Add this line for adding habits

app.listen(port, () => {
  console.log(`Habit Tracker app listening at http://localhost:${port}`);
});
