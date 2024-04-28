document.addEventListener("DOMContentLoaded", function () {
  getTaskDetails("662c0d45971ba3f055305ba4").then((taskData) => {
    populateTask(taskData);
  });
});
const host = 3000;
let RoomName = "";
let Members = [];
var CurrentUserName;
var CurrentId = sessionStorage.getItem("CurrentId");
function getTaskDetails(taskId) {
  return fetch(`/task/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Incorrect data");
        throw new Error("Incorrect data");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getPerformerData(performerId) {
  return fetch(`/performer/${performerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Incorrect data");
        throw new Error("Incorrect data");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function populateTask(taskData) {
  const orderTitleElement = document.getElementById("orderTitle");
  const orderCategoryElement = document.getElementById("orderCategory");
  const orderPriceElement = document.getElementById("orderPrice");
  const orderDescriptionElement = document.getElementById("orderDescription");
  const chatCompanionNameElement = document.getElementById("chatCompanionName");
  const companionRatingElement = document.querySelector(".companion-rating p");
  const companionLocationElement = document.getElementById("companionLocation");

  orderTitleElement.textContent = taskData.name || "Order title";
  orderCategoryElement.textContent =
    (taskData.category && taskData.category[0]) || "Order category";
  orderPriceElement.textContent = taskData.price || "Order price";
  orderDescriptionElement.textContent =
    taskData.description || "Order description";

  companionRatingElement.textContent = taskData.rating || "4.99";
  companionLocationElement.textContent =
    taskData.location || "Companion location";

  getPerformerData(taskData.performer).then((performerData) => {
    console.log(performerData);
    chatCompanionNameElement.textContent =
      performerData.firstname + " " + performerData.surname ||
      "Chat companion name";
  });
}

function getPerformerData(performerId) {
  return fetch(`/performer/${performerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Incorrect data");
        throw new Error("Incorrect data");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const chatSocket = io("http://localhost:3001");
let currentRoom;
chatSocket.on("connect", () => {
  console.log("You connected to socket");
});

function sendMessage() {
  let message = document.getElementById("messageToSend").value;
  console.log(message);
  chatSocket.emit("send-message", message, currentRoom, CurrentId);

  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message");

  messageContainer.classList.add("my-message");

  const senderElement = document.createElement("p");
  senderElement.classList.add("Sender");
  senderElement.textContent = CurrentId;

  const textElement = document.createElement("p");
  textElement.classList.add("text");
  textElement.textContent = message;

  messageContainer.appendChild(senderElement);
  messageContainer.appendChild(textElement);

  document.getElementById("currentChat").appendChild(messageContainer);
  const chatWindow = document.getElementById("currentChat");
  chatWindow.scrollTop = chatWindow.scrollHeight;
  document.getElementById("messageToSend").value = "";
}

function joinRoom(room) {
  chatSocket.emit("join-room", room, () => {
    console.log("Joined room");
    currentRoom = room;
    console.log(room);
  });
}

chatSocket.on("recive-message", (message, sender, room) => {
  console.log(message);
  console.log(currentRoom);
  console.log(room);
  if (currentRoom === room) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");

    messageContainer.classList.add("notMessage");

    const senderElement = document.createElement("p");
    senderElement.classList.add("Sender");
    senderElement.textContent = sender;

    const textElement = document.createElement("p");
    textElement.classList.add("text");
    textElement.textContent = message;

    messageContainer.appendChild(senderElement);
    messageContainer.appendChild(textElement);

    document.getElementById("currentChat").appendChild(messageContainer);
    const chatWindow = document.getElementById("currentChat");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});

chatSocket.on("message-sent", () => {
  setTimeout(() => {
  }, 1000);
});
chatSocket.on("created-room", () => {
  populateChats();
  populateChats();
  setTimeout(() => {
    populateChats();
  }, 100);
});


function createRoom() {
  if (RoomName === "") {
    // const addUserName = document.getElementById("addUser");
    // if (addUserName.value != CurrentId) {
    //   RoomName += addUserName.value;
    //   RoomName += CurrentId;
    //   Members.push(addUserName.value);
    //   Members.push(CurrentId);
    //
    //   getUserData(addUserName.value, function (user) {
    //     if (user) {
    //       // Handle user data
    //       console.log("User data:", user);
    //       addChatRoom(user.firstname + " " + user.secondname);
    //       chatSocket.emit("create-room", RoomName, CurrentId);
    //
    //       hideNewChatWindow();
    //     } else {
    //       // Handle error
    //       console.error("Failed to retrieve user data");
    //     }
    //   });
    // }
  } else {
    // const chatRoomName = document.getElementById("groupName");
    // Members.push(CurrentId);
    // RoomName += CurrentId;
    //
    // joinRoom(RoomName);
    // addChatRoom(chatRoomName.value);
    // hideNewChatWindow();
    // chatSocket.emit("create-room", RoomName, CurrentId);
  }
}
function addUsersToGroup() {
  // const addUserName = document.getElementById("addUser");
  // RoomName += addUserName.value.trim();
  // Members.push(addUserName.value);
  // document.getElementById("addUser").value = "";
}

function showNewChatWindow() {
  // newChatWindow.style.display = "block";
  // RoomName = "";
  // Members = [];
}

function hideNewChatWindow() {
  // newChatWindow.style.display = "none";
}
function addChatRoom(chatname) {
  findExistingChatroom(Members, function (existingChatroom) {
    if (existingChatroom) {
      console.log(
        "Chat room already exists with all members:",
        existingChatroom
      );
      currentRoom = existingChatroom.roomName;
      //populateMembers();
      displayChatMessages(currentRoom);
    } else {
      const data = {
        name: chatname,
        members: Members,
        roomName: RoomName,
      };

      var requestBody = JSON.stringify(data);

      let xhr = new XMLHttpRequest();

      xhr.open("POST", "http://" + host + ":3000/chat/chatrooms", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log("Response from server:", response);
            if (response.status === "success") {
              const newChatItem = document.createElement("div");

              newChatItem.textContent = chatname;

              newChatItem.classList.add("chatroom-item");
              newChatItem.dataset.roomname = RoomName;
              newChatItem.addEventListener("click", displayChat);
              chatsList.appendChild(newChatItem);
            } else {
              console.log(response.message);
            }
          } else {
            console.error("There was a problem with the request.");
          }
        }
      };

      xhr.send(requestBody);
    }
  });
}
function displayChat(event) {
  var currentChar = document.getElementById("currentChat");
  while (currentChar.firstChild) {
    currentChar.removeChild(currentChar.firstChild);
  }
  currentRoom = event.target.dataset.roomname;
  joinRoom(currentRoom);
  // populateMembers();
  displayChatMessages(currentRoom);
}

function displayChatMessages(chatroomId) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://${host}:3000/chat/messages/${chatroomId}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log("Response from server:", response);
        if (response.status === "success") {
          document.getElementById("currentChatName").innerText =
            response.room[0].name;
          closeAddMember();
          populateMembers();
          const messages = response.messages; // Assuming messages is an array of message objects

          // Iterate over the messages and display them in the UI
          messages.forEach((message) => {
            const messageContainer = document.createElement("div");
            messageContainer.classList.add("message");

            // Determine if the message is from the current user or not
            const isMyMessage = message.sender === CurrentId;

            // Set alignment based on whether it's the current user's message or not
            if (isMyMessage) {
              messageContainer.classList.add("myMessage");
            } else {
              messageContainer.classList.add("notMessage");
            }

            // Create sender element
            const senderElement = document.createElement("p");
            senderElement.classList.add("Sender");
            senderElement.textContent = message.sender;

            // Create text element
            const textElement = document.createElement("p");
            textElement.classList.add("text");
            textElement.textContent = message.message;

            // Append sender and text elements to message container
            messageContainer.appendChild(senderElement);
            messageContainer.appendChild(textElement);

            // Append message container to the chat window
            document
              .getElementById("currentChat")
              .appendChild(messageContainer);
          });
          const chatWindow = document.getElementById("currentChat");
          chatWindow.scrollTop = chatWindow.scrollHeight;
        } else {
          console.log(response.message);
        }
      } else {
        console.error("There was a problem with the request.");
      }
    }
  };

  xhr.send();
}
function populateChats() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", `http://${host}:3000/chat/chatrooms/${CurrentId}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log("Response from server:", response);
        if (response.status === "success") {
          console.log(response.message);
          const chatsList = document.getElementById("chatsList");

          while (chatsList.firstChild) {
            chatsList.removeChild(chatsList.firstChild);
          }
          response.chatrooms.forEach((chatroom) => {
            const newChatItem = document.createElement("div");

            if (
              chatroom.members[0] === CurrentId &&
              chatroom.members.length === 2
            ) {
              getUserData(chatroom.members[1], function (user) {
                if (user) {
                  newChatItem.textContent =
                    user.firstname + " " + user.secondname;
                } else {
                  console.error("Failed to retrieve user data");
                }
              });
            } else {
              newChatItem.textContent = chatroom.name;
            }

            newChatItem.classList.add("chatroom-item");
            newChatItem.dataset.roomname = chatroom.roomName;
            newChatItem.addEventListener("click", displayChat);
            chatsList.appendChild(newChatItem);
          });
        } else {
          console.log(response.message);
        }
      } else {
        console.error("There was a problem with the request.");
      }
    }
  };
  xhr.send();
}
function getLastThreeMessagesForUser() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `http://${host}:3000/chat/chatrooms/${CurrentId}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log("Response from server:", response);
        if (response.status === "success") {
          console.log(response.message);
          const chatrooms = response.chatrooms;
          const allMessages = [];
          for (const chatroom of chatrooms) {
            fetchMessagesForChatroom(chatroom.roomName, allMessages);
          }
          console.log(allMessages);

          setTimeout(() => {
            allMessages.sort(
              (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
            );
            const latestMessages = [];
            for (let i = 0; i < Math.min(3, allMessages.length); i++) {
              latestMessages.push(allMessages[i]);
            }
            console.log("Three latest messages:", latestMessages);
            addMessages(latestMessages);
          }, 100);
        } else {
          console.log(response.message);
        }
      } else {
        console.error("There was a problem with the request.");
      }
    }
  };
  xhr.send();
}
function fetchMessagesForChatroom(chatroomName, allMessages) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", `http://${host}:3000/chat/messages/${chatroomName}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(`Messages for chatroom ${chatroomName}:`, response);
        const filteredMessages = response.messages.filter(
          (message) => message.sender !== CurrentId
        );
        console.log(filteredMessages);

        // Push the filtered messages into the allMessages array
        allMessages.push(...filteredMessages);
      } else {
        console.error(
          `Error fetching messages for chatroom ${chatroomName}:`,
          xhr.statusText
        );
      }
    }
  };
  xhr.send();
}
function addMessages(latestMessages) {
  // const messageList = document.querySelector(".message-list");
  // while (messageList.firstChild) {
  //   messageList.removeChild(messageList.firstChild);
  // }
  // latestMessages.forEach((message) => {
  //   const listItem = document.createElement("li");
  //
  //   const messageImage = document.createElement("div");
  //   messageImage.classList.add("message-image");
  //
  //   const image = document.createElement("img");
  //   image.src = "/resources/img/avatarplaceholder1.png"; // Set the image source
  //   image.alt = "avatar";
  //   image.classList.add("avatar-image");
  //
  //   const name = document.createElement("p");
  //   name.classList.add("message-name");
  //   name.textContent = message.sender; // Set the sender's name
  //
  //   messageImage.appendChild(image);
  //   messageImage.appendChild(name);
  //
  //   const messageBackground = document.createElement("div");
  //   messageBackground.classList.add("message-background");
  //
  //   const messageText = document.createElement("p");
  //   messageText.textContent = message.message; // Set the message text
  //
  //   messageBackground.appendChild(messageText);
  //   messageBackground.tag = message.room;
  //
  //   listItem.appendChild(messageImage);
  //   listItem.appendChild(messageBackground);
  //   listItem.addEventListener("click", () => {
  //     displayChatMessages(message.room);
  //   });
  //   messageList.appendChild(listItem);
  // });
}
function populateMembers() {
  let members = document.getElementById("roomMembers");
  while (members.firstChild) {
    members.removeChild(members.firstChild);
  }
  let xhr = new XMLHttpRequest();

  xhr.open("GET", `http://${host}:3000/chat/chatroomData/${currentRoom}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response.chatroom.members);
        response.chatroom.members.forEach((member) => {
          getUserData(member, function (user) {
            if (user) {
              setTimeout(() => {
                var div = document.createElement("div");
                div.textContent = user.name[0];
                div.classList.add("members");
                members.appendChild(div);
              }, 5);
            } else {
              console.error("Failed to retrieve user data");
            }
          });
        });
        if (response.chatroom.members.length > 2) {
          var div = document.createElement("div");
          div.textContent = "+";
          div.classList.add("members");
          div.addEventListener("click", openAddMember);
          div.style.userSelect = "none";
          members.appendChild(div);
        }
      } else {
        console.error(
          `Error fetching chatroom data${chatroomName}:`,
          xhr.statusText
        );
      }
    }
  };

  xhr.send();
}

function openAddMember() {
  var div = document.getElementById("addNewMember");
  var button = document.getElementById("submitNewUser");
  button.addEventListener("click", addNewUser);

  div.style.display = "block";
}
function closeAddMember() {
  var div = document.getElementById("addNewMember");
  div.style.display = "none";
}
function addNewUser() {
  var name = document.getElementById("inputUserNewName").value;
  const data = {
    userName: name,
    chatroomName: currentRoom,
  };
  console.log(data);
  var requestBody = JSON.stringify(data);

  let xhr = new XMLHttpRequest();

  // chose based on user type
  xhr.open("POST", "http://" + host + ":3000/customer/add-to-chatroom", true);
  xhr.open("POST", "http://" + host + ":3000/performer/add-to-chatroom", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log("Response from server:", response);
        if (response.chatroom == null) {
          populateMembers();
          closeAddMember();
        } else {
          currentRoom = response.chatroom.roomName;
          displayChatMessages(currentRoom);
        }
      } else {
        console.error("There was a problem with the request.");
      }
    }
  };

  xhr.send(requestBody);
}
function findExistingChatroom(members, callback) {
  //resolve name
  //var name = document.getElementById("inputUserNewName").value;
  const data = {
    members: members,
  };
  var requestBody = JSON.stringify(data);

  let xhr = new XMLHttpRequest();

  xhr.open("POST", "http://" + host + ":3000/chat/find-room", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log("Response from server:", response);
        callback(response.chatroom);
      } else {
        console.error("There was a problem with the request.");
        callback(null);
      }
    }
  };

  xhr.send(requestBody);
}