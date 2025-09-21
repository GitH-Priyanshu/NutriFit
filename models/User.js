const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model("User", userSchema)




git init
git remote add origin https://github.com/GitH-Priyanshu/NutriFit.git
git branch - M main
git add.
git commit - m "Initial commit"
git push - u origin main
