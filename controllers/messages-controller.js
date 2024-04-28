const getMessages = async (chatroomCollection, messageCollection, req, res) => {
  try {
    const chatroomName = req.params.chatroomName;
    const chatroom = await chatroomCollection.findOne({ roomName: chatroomName });
    if (!chatroom) {
      return res.json({ status: "error", message: "Chatroom not found" });
    }
    const messages = await messageCollection.find({ room: chatroom.roomName });
    const room = await chatroomCollection.find({ roomName: chatroomName });
    res.json({ status: "success", messages: messages, room: room });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", message: "Internal server error" });
  }
}

module.exports = getMessages