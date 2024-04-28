document.addEventListener("DOMContentLoaded", (event) => {
  const xhr = new XMLHttpRequest();
  const userName = document.getElementById("userName");
  var userDataString = sessionStorage.getItem("userData");
  var userData = JSON.parse(userDataString);
  console.log(userData);
  userName.textContent = userData.firstname + " " + userData.surname;
  getTasks().then((taskData) => {
    console.log(taskData);
    taskData.forEach((element) => {
      var advertisementListItem = document.createElement("li");
      advertisementListItem.className = "advertisement-list-item";

      var link = document.createElement("a");
      link.href = "#";

      var adInfo = document.createElement("div");
      adInfo.className = "ad-info";

      var title = document.createElement("h2");
      title.textContent = element.name;
      adInfo.appendChild(title);

      var category = document.createElement("p");
      category.textContent = "";
      element.category.forEach((cat) => {
        category.textContent += cat + " ";
      });
      adInfo.appendChild(category);

      var dataPlace = document.createElement("div");
      dataPlace.className = "data-place";

      var place = document.createElement("p");
      place.className = "place";

      if (element.format === "online") {
        place.textContent = "Online | ";
      } else {
        place.textContent = element.location + " |";
      }
      dataPlace.appendChild(place);

      var date = document.createElement("p");
      date.className = "date";

      var dateString = element.posted;
      var dateObject = new Date(dateString);
      var year = dateObject.getFullYear();
      var month = dateObject.getMonth() + 1;
      var day = dateObject.getDate();

      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;

      var formattedDate = year + "-" + month + "-" + day;
      date.textContent = "| " + formattedDate;
      dataPlace.appendChild(date);

      adInfo.appendChild(dataPlace);

      link.appendChild(adInfo);

      var description = document.createElement("p");
      description.textContent = element.description;
      link.appendChild(description);

      var price = document.createElement("p");
      price.textContent = element.price + " ₴";
      link.appendChild(price);

      advertisementListItem.appendChild(link);

      var advertisementList = document.querySelector(".advertisement-list");
      advertisementList.appendChild(advertisementListItem);
    });
  });

  const filterSelector = document.getElementById("categoryFilterSelect");
  filterSelector.addEventListener("change", () => {
    var advertisementList = document.querySelector(".advertisement-list");
    advertisementList.innerHTML = "";

    var selectedIndex = filterSelector.value;
    console.log(selectedIndex);
    getTasks().then((taskData) => {
      for (let i = 0; i < taskData.length; i++) {
        const element = taskData[i];
        if (
          selectedIndex !== element.category &&
          selectedIndex !== "Будь-яка категорія"
        ) {
          continue;
        }
        var advertisementListItem = document.createElement("li");
        advertisementListItem.className = "advertisement-list-item";

        var link = document.createElement("a");
        link.href = "#";

        var adInfo = document.createElement("div");
        adInfo.className = "ad-info";

        var title = document.createElement("h2");
        title.textContent = element.name;
        adInfo.appendChild(title);

        var category = document.createElement("p");
        category.textContent = "";
        for (let j = 0; j < element.category.length; j++) {
          category.textContent += element.category[j] + " ";
        }
        adInfo.appendChild(category);

        var dataPlace = document.createElement("div");
        dataPlace.className = "data-place";

        var place = document.createElement("p");
        place.className = "place";

        if (element.format === "online") {
          place.textContent = "Online | ";
        } else {
          place.textContent = element.location + " |";
        }
        dataPlace.appendChild(place);

        var date = document.createElement("p");
        date.className = "date";

        var dateString = element.posted;
        var dateObject = new Date(dateString);
        var year = dateObject.getFullYear();
        var month = dateObject.getMonth() + 1;
        var day = dateObject.getDate();

        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;

        var formattedDate = year + "-" + month + "-" + day;
        date.textContent = "| " + formattedDate;
        dataPlace.appendChild(date);

        adInfo.appendChild(dataPlace);

        link.appendChild(adInfo);

        var description = document.createElement("p");
        description.textContent = element.description;
        link.appendChild(description);

        var price = document.createElement("p");
        price.textContent = element.price + " ₴";
        link.appendChild(price);

        advertisementListItem.appendChild(link);

        var advertisementList = document.querySelector(".advertisement-list");
        advertisementList.appendChild(advertisementListItem);
      }
    });
  });
});

function getTasks() {
  return fetch(`/task`, {
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
