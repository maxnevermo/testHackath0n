const express = require("express");
const router = express.Router();
const Message = require("../models/message.js");
const getMessages = require("../controllers/messages-controller.js");
const Chatroom = require("../models/chatroom.js");
const {
  newChatroom,
  chatroomByUsername,
  chatroomData,
  findRoom,
} = require("../controllers/chat-room-controllers.js");

router.get("/messages/:chatroomName", async (req, res) =>
  getMessages(Chatroom, Message, req, res)
);
router.post("/chatrooms", async (req, res) => newChatroom(req, res));
router.get("/chatrooms/:userName", async (req, res) =>
  chatroomByUsername(Chatroom, req, res)
);
router.get("/chatroomData/:chatroomName", async (req, res) =>
  chatroomData(Chatroom, req, res)
);
router.post("/find-room", async (req, res) => findRoom(Chatroom, req, res));
module.exports = router;
