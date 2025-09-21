const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.set('view engine', 'ejs')

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/nutrifit")   // agar local use kar raha hai
    // mongoose.connect(process.env.MONGO_URI)              // agar Atlas use kar raha hai
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ DB Error:", err));

// Meal Schema
const mealSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,   // abhi manually pass karenge
    meal: String,
    calories: Number,
    date: { type: Date, default: Date.now }
});

const Meal = mongoose.model("Meal", mealSchema);

// Route: Add Meal
app.post("/logMeal", async (req, res) => {
    try {
        const { userId, meal, calories } = req.body;
        const newMeal = new Meal({ userId, meal, calories });
        await newMeal.save();
        res.json({ message: "Meal logged successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/', (req, res) => {
    res.render("index")
})
// Route: Get Meals
app.get("/meals/:userId", async (req, res) => {
    try {
        const meals = await Meal.find({ userId: req.params.userId });
        res.json(meals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));