const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  members: [
    {
      type: String,
      ref: "User",
    },
  ],
  roomId: {
    type: String,
  },
});

module.exports = mongoose.model("Chatroom", chatroomSchema);
