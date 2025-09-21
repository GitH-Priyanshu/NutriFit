const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    meal: String,
    calories: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meal", mealSchema);