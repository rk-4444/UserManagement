// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const User = require("./models/Users");
const cors = require("cors");

app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/user_management")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error connecting to Database: ", err);
  });

app.post("/userform", (req, res) => {
  // Logic to retrieve users from database
  const { name, dob, contact, email, desc } = req.body;
  console.log(name, dob, contact, email, desc);
  // console.log("hi_____>>>>>");

  const newUser = new User({
    name,
    dob: new Date(dob),
    contact,
    email,
    desc, // Assuming dateOfBirth is sent as a string in ISO format
  });

  newUser
    .save()
    .then((savedUser) => {
      res.status(201).json({ stats: "user added successfully!" }); // Respond with the saved user data
    })
    .catch((error) => {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Error saving user" });
    });
});

app.get("/userdetail/:email", async (req, res) => {
  try {
    let { email } = req.params;
    const foundUser = await User.findOne({ email: email });
    // console.log(foundUser);
    res.json(foundUser);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

app.get("/userlist", async (req, res) => {
  try {
    const users = await User.find({});
    // console.log(users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

app.put("/updateuser/:id", async (req, res) => {
  // Logic to retrieve users from database
  let { id } = req.params;
  let { name, dob, contact, email, desc } = req.body;
  // dob = new Date(dob);
  console.log(id);
  console.log(name, dob, contact, email, desc);

  try {
    const foundUser = await User.findOneAndUpdate(
      { email: id },
      { name, dob, contact, email, desc }
    );
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(foundUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating user data" });
  }
});

app.delete("/deleteuser/:email", async (req, res) => {
  let { email } = req.params;
  await User.findOneAndDelete({ email });
  res.redirect("/userlist");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
