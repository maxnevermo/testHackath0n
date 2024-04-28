const Chatroom = require('../models/chatroom')

const newChatroom = async (req, res) => {
  try {
    const { name, members, roomName } = req.body;
    const chatroom = new Chatroom({ name, members, roomName });
    await chatroom.save();
    res.json({
      status: "success",
      message: "Chatroom created successfully",
      chatroom,
    });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", message: "Internal server error" });
  }
}
const addUserToChatroom = async (chatroomCollection, userCollection, req, res) => {
  try {
    const { userName, chatroomName } = req.body;

    const curRoom = await chatroomCollection.findOne({ roomName: chatroomName });
    const existingMembers = curRoom.members.map((member) => member);
    const allMembers = [...existingMembers, userName];
    const existingChatroom = await chatroomCollection.findOne({
      members: { $all: allMembers },
    });

    if (existingChatroom) {
      return res.json({
        status: "success",
        message: "Chatroom found",
        chatroom: existingChatroom,
      });
    } else {
      let room = await chatroomCollection.findOne({ name: chatroomName });
      let user = await userCollection.findOne({ name: userName });
      room.members.push(user.name);
      await room.save();
      res.json({
        status: "success",
        message: "User added to chatroom successfully",
        chatroom: null,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

const chatroomByUsername = async (chatroomCollection, req, res) => {
  try {
    const userName = req.params.userName;
    console.log(userName);
    const chatrooms = await chatroomCollection.find({ members: { $in: [userName] } });
    if (!chatrooms) {
      return res.json({ status: "error", message: "Chatrooms not found" });
    }
    res.json({ status: "success", chatrooms: chatrooms });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", message: "Internal server error" });
  }
}
const chatroomData = async (chatroomCollection, req, res) => {
  try {
    const chatroomName = req.params.chatroomName;
    const chatroom = await chatroomCollection.findOne({ roomName: chatroomName });
    if (!chatroom) {
      return res.json({ status: "error", message: "Chatroom not found" });
    }
    res.json({ status: "success", chatroom: chatroom });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", message: "Internal server error" });
  }
}

const findRoom = async (chatroomCollection, req, res) => {
  try {
    const { members } = req.body;

    const chatroom = await chatroomCollection.findOne({ members: { $all: members } });

    if (chatroom) {
      return res.json({
        status: "success",
        message: "Chatroom found",
        chatroom: chatroom,
      });
    } else {
      return res.json({
        status: "success",
        message: "No chatroom found with the specified members",
        chatroom: null,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

const randomChatRoomName = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}


module.exports = {
  newChatroom,
  addUserToChatroom,
  chatroomByUsername,
  chatroomData,
  findRoom,
  randomChatRoomName
}
