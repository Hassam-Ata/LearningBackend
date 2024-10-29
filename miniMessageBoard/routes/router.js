const express = require("express");
const {
  displayMessage,
  addNewMessage,
  postNewMessage,
  showMessageDetails,
} = require("../controllers/messageController");
const router = express.Router();

// Display the message board
router.get("/", displayMessage);

// Show form to add new messages
router.get("/new", addNewMessage);

// Post new messages
router.post("/new", postNewMessage);

// Show messages of a specific user
router.get("/user/:user", showMessageDetails);

module.exports = router;
