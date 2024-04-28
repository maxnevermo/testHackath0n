document.addEventListener("DOMContentLoaded", function () {
  getTaskDetails("662c0d45971ba3f055305ba4").then((taskData) => {
    populateTask(taskData);
  });
});

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
