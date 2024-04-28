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
      category.textContent = element.category[0];
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
          selectedIndex !== element.category[0] &&
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
        category.textContent = element.category[0];
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

  const offlineChoice = document.getElementById("offlineChoice");
  const onlineChoice = document.getElementById("onlineChoice");

  offlineChoice.addEventListener("change", updateAdvertisementList);
  onlineChoice.addEventListener("change", updateAdvertisementList);

  function updateAdvertisementList() {
    var advertisementList = document.querySelector(".advertisement-list");
    advertisementList.innerHTML = "";

    var offlineSelected = offlineChoice.checked;
    var onlineSelected = onlineChoice.checked;

    getTasks().then((taskData) => {
      for (let i = 0; i < taskData.length; i++) {
        const element = taskData[i];
        if (
          (offlineSelected && element.format !== "offline") ||
          (onlineSelected && element.format !== "online")
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
        category.textContent = element.category[0];
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

        advertisementList.appendChild(advertisementListItem);
      }
    });

    const filterSelector = document.getElementById("categoryFilterSelect");
    const regionSelector = document.getElementById("regionFilterSelect");

    filterSelector.addEventListener("change", updateAdvertisementList);
    regionSelector.addEventListener("change", updateAdvertisementList);

    function updateAdvertisementList() {
      var advertisementList = document.querySelector(".advertisement-list");
      advertisementList.innerHTML = "";

      var selectedCategory = filterSelector.value;
      var selectedRegion = regionSelector.value;

      getTasks().then((taskData) => {
        for (let i = 0; i < taskData.length; i++) {
          const element = taskData[i];
          if (
            selectedRegion !== element.region &&
            selectedRegion !== "Уся Україна"
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
          category.textContent = element.category[0];
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

          advertisementList.appendChild(advertisementListItem);
        }
      });
    }

    const fromInput = document.getElementById("fromInput");
    const toInput = document.getElementById("toInput");

    fromInput.addEventListener("change", () => {
      console.log;
    });
  }
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
