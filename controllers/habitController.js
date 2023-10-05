const Habit = require("../models/habitModel");

exports.getIndex = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ name: 1 });
    res.render("index", { habits, getDate, isSelected });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateHabit = async (req, res) => {
  const habitId = req.params.id;
  const newStatus = req.body.status;
  const date = new Date(req.body.date);

  try {
    await Habit.findByIdAndUpdate(habitId, {
      status: newStatus,
      $push: { statusHistory: { date, status: newStatus } },
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addHabit = async (req, res) => {
  const habitName = req.body.habitName;

  try {
    const newHabit = new Habit({
      name: habitName,
      status: "None",
    });

    await newHabit.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

function getDate(offset) {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().split("T")[0];
}

function isSelected(habit, date, status) {
  const statusEntry = habit.statusHistory.find(
    (entry) => entry.date.toISOString().split("T")[0] === date
  );
  return statusEntry && statusEntry.status === status ? "selected" : "";
}
