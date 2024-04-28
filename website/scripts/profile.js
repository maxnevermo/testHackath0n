async function asyncpopulateProfile() {
  const profileContainer = document.querySelector(".profile-container");

  profileContainer.querySelector(".firstname p").innerText = userData.firstname;
  profileContainer.querySelector(".surname p").textContent = userData.surname;

  profileContainer.querySelector(".email p").textContent = userData.email;

  profileContainer.querySelector(".phone p").textContent = userData.phone;

  if (
    userData.userType === "performer" &&
    userData.categories &&
    Array.isArray(userData.categories)
  ) {
    profileContainer.querySelector(".categories p").textContent =
      userData.categories.join("\t");
  } else {
    profileContainer.querySelector(".categories").style.display = "none";
  }

  profileContainer.querySelector(
    ".rating-reviews p"
  ).textContent = `${userData.rating} stars ${userData.reviews} reviews`;

  profileContainer.querySelector(".location p").textContent = userData.location;

  const tasksContainer = profileContainer.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";

  for (const task of userData.tasks) {
    try {
      const response = await fetch(`/task/${task}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch task details for task ID: ${task}`);
      }

      let performer = null;
      const taskRes = await response.json();
      const performerResponse = await fetch(`/performer/${taskRes.performer}`);
      if (performerResponse.ok) {
        performer = await performerResponse.json();
      }

      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      taskElement.dataset.setTaskId = taskRes._id;
      taskElement.innerHTML = `
        <h3>${taskRes.name}</h3>
        <p>${taskRes.price}</p>
        <p>Categories: ${taskRes.category.join(", ")}</p>
        <p>${taskRes.deadline}</p>
        <p>${
          performer != null
            ? performer.firstname + " " + performer.surname
            : "Not assigned"
        }</p>
        <input type="button" value="View Task" class="task-btn" />
      `;
      tasksContainer.appendChild(taskElement);
    } catch (error) {
      console.error(error);
    }
  }
}
async function deleteAccount() {
  if (userData.userType == "performer") {
    const response = await fetch(`/performer/${userData._id}`, {
      method: "DELETE",
    });
  } else if (userData.userType == "customer") {
    const response = await fetch(`/customer/${userData._id}`, {
      method: "DELETE",
    });
  }
}
