const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const router = express.Router();

// add user api
router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    state,
    district,
    village,
    panCard,
    aadhaarNumber,
  } = req.body;

  try {
    const userData = await User.create({
      firstName: firstName,
      lastName: lastName,
      state: state,
      district: district,
      village: village,
      panCard: panCard,
      aadhaarNumber: aadhaarNumber,
    });
    res.status(201).json(userData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//get single user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const showUser = await User.findById({ _id: id });
    res.status(200).json(showUser);
  } catch (error) {
    res.send(500).json({ error: error.message });
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const showUsers = await User.find();
    res.status(200).json(showUsers);
  } catch (error) {
    res.send(500).json({ error: error.message });
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteUser);
  } catch (error) {
    res.send(500).json({ error: error.message });
  }
});

//update user
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const {firstName,lastName,state,district,village,panCard,aadhaarNumber} = req.body
  try {
    const updateUser = await User.findByIdAndUpdate(id , req.body,{new: true});
    res.status(200).json(updateUser);
  } catch (error) {
    res.send(500).json({ error: error.message });
  }
});

module.exports = router;
