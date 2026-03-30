const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/userdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", UserSchema);

// Routes

// GET users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST user
app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// DELETE user
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
