function togglePerformerRadio() {
  var performerRadio = document.getElementById("performerRadio");
  var performerContainer = document.getElementById("performerContainer");
  var customerRadio = document.getElementById("customerRadio");
  var customerContainer = document.getElementById("customerContainer");
  var button = document.querySelector(".signup-button");
  const performerSvg = document.getElementById("performerSVG");
  const performerPaths = performerSvg.querySelectorAll("path");
  const customerSvg = document.getElementById("customerSVG");
  const customerPaths = customerSvg.querySelectorAll("path");

  performerRadio.checked = true;
  customerRadio.checked = false;
  performerContainer.classList.add("selected");
  customerContainer.classList.remove("selected");
  button.value = "Зареєструватись як виконавець";

  document.getElementById("customerText").style.color = "black";
  document.getElementById("performerText").style.color = "white";

  performerPaths.forEach((path) => {
    path.setAttribute("stroke", "white");
  });

  customerPaths.forEach((path) => {
    path.setAttribute("stroke", "black");
  });
}

function toggleCustomerRadio() {
  var performerRadio = document.getElementById("performerRadio");
  var performerContainer = document.getElementById("performerContainer");
  var customerRadio = document.getElementById("customerRadio");
  var customerContainer = document.getElementById("customerContainer");
  var button = document.querySelector(".signup-button");
  const performerSvg = document.getElementById("performerSVG");
  const performerPaths = performerSvg.querySelectorAll("path");
  const customerSvg = document.getElementById("customerSVG");
  const customerPaths = customerSvg.querySelectorAll("path");

  customerRadio.checked = true;
  performerRadio.checked = false;
  customerContainer.classList.add("selected");
  performerContainer.classList.remove("selected");
  button.value = "Зареєструватись як замовник";

  document.getElementById("customerText").style.color = "white";
  document.getElementById("performerText").style.color = "black";

  performerPaths.forEach((path) => {
    path.setAttribute("stroke", "black");
  });

  customerPaths.forEach((path) => {
    path.setAttribute("stroke", "white");
  });
}

function openSignupForm() {
  var container = document.querySelector(".main-selection-container");
  var performerContainer = document.querySelector(
    ".performer-signup-container"
  );

  var customerContainer = document.querySelector(".customer-signup-container");

  var performerRadio = document.getElementById("performerRadio");
  var customerRadio = document.getElementById("customerRadio");

  if (performerRadio.checked) {
    container.style.display = "none";
    performerContainer.style.display = "block";
  } else if (customerRadio.checked) {
    container.style.display = "none";
    customerContainer.style.display = "block";
  } else {
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let selectedCategories = [];

  function addCategory(categoryName) {
    const categoriesDiv = document.getElementById("categories");
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    categoryDiv.innerHTML = `
            <span>${categoryName}</span>
            <button class="delete-btn">x</button>
          `;
    categoriesDiv.appendChild(categoryDiv);

    selectedCategories.push(categoryName);
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      const categoryName = event.target.parentNode.children[0].innerText;
      selectedCategories = selectedCategories.filter(
        (item) => item !== categoryName
      );
      event.target.parentNode.remove();
    }
  });

  const categoriesData = [
    {
      name: "Category 1",
      subcategories: [
        "Subcategory 1",
        "Subcategory 2",
        "Subcategory 3",
        "Subcategory 4",
        "Subcategory 5",
        "Subcategory 6",
        "Subcategory 7",
        "Subcategory 8",
        "Subcategory 9",
        "Subcategory 10",
        "Subcategory 11",
        "Subcategory 12",
        "Subcategory 13",
        "Subcategory 14",
        "Subcategory 15",
        "Subcategory 16",
        "Subcategory 17",
        "Subcategory 18",
        "Subcategory 19",
        "Subcategory 20",
        "Subcategory 21",
        "Subcategory 22",
        "Subcategory 23",
        "Subcategory 24",
        "Subcategory 25",
        "Subcategory 26",
      ],
    },
    { name: "Category 2", subcategories: ["Subcategory 5", "Subcategory 6"] },
  ];

  const mainCategorySelect = document.getElementById("mainCategorySelect");
  categoriesData.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    mainCategorySelect.appendChild(option);
  });

  function populateSubcategories() {
    const selectedCategory = mainCategorySelect.value;
    const subcategoriesDiv = document.getElementById("subcategoriesDiv");
    subcategoriesDiv.innerHTML = "";

    if (selectedCategory) {
      const category = categoriesData.find(
        (cat) => cat.name === selectedCategory
      );
      if (category) {
        const subcategoriesWrapper = document.createElement("div");
        subcategoriesWrapper.classList.add("subcategories-wrapper");

        category.subcategories.forEach((subcategory) => {
          const div = document.createElement("div");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.name = "subcategory";
          checkbox.value = subcategory;
          checkbox.id = subcategory;
          const label = document.createElement("label");
          label.style.width = "120px";
          label.htmlFor = checkbox.id;
          label.textContent = subcategory;

          checkbox.style.margin = "0";
          checkbox.style.accentColor = "#748efe";
          checkbox.style.color = "#fff";
          label.style.margin = "0";
          label.style.marginLeft = "10px";
          div.style.marginBottom = "10px";

          div.appendChild(checkbox);
          div.appendChild(label);

          div.classList.add("categoryItem");
          subcategoriesWrapper.appendChild(div);

          console.log(selectedCategories);
          // Check if subcategory is in selectedCategories and set checkbox accordingly
          if (selectedCategories.includes(subcategory)) {
            checkbox.checked = true;
          }

          checkbox.addEventListener("change", function (event) {
            const subcategory = event.target.value;
            const categoryDiv = document.getElementById("categories");

            if (!event.target.checked) {
              const divs = categoryDiv.children;
              for (let i = 0; i < divs.length; i++) {
                const span = divs[i].querySelector("span");
                if (span && span.innerText === subcategory) {
                  divs[i].remove();
                  const index = selectedCategories.indexOf(subcategory);
                  if (index !== -1) {
                    selectedCategories.splice(index, 1);
                  }
                  break;
                }
              }
            } else {
              addCategory(subcategory);
            }
          });
        });

        subcategoriesDiv.appendChild(subcategoriesWrapper);
      }
    }
  }

  mainCategorySelect.addEventListener("change", populateSubcategories);

  document
    .getElementById("addCategoriesBtn")
    .addEventListener("click", exitCategories);

  document
    .getElementById("openCategoriesBtn")
    .addEventListener("click", function () {
      const categoriesDropdown = document.getElementById("categoriesDropdown");
      populateSubcategories();

      categoriesDropdown.style.display = "block";

      setTimeout(() => {
        categoriesDropdown.style.opacity = "1";
      }, 100);
    });
});
function exitCategories() {
  const categoriesDropdown = document.getElementById("categoriesDropdown");
  categoriesDropdown.style.opacity = "0";
  setTimeout(() => {
    categoriesDropdown.style.display = "none";
  }, 300);
  const mainCategorySelect = document.getElementById("mainCategorySelect");
  mainCategorySelect.selectedIndex = 0;
  subcategoriesDiv.innerHTML = "";
}
function closeExistingAccount() {
  var div = document.getElementById("account-exists-container");
  div.style.opacity = "0";
  setTimeout(() => {
    div.style.display = "none";
  }, 300);
}

function openExistingAccount() {
  var div = document.getElementById("account-exists-container");
  div.style.display = "block";

  setTimeout(() => {
    div.style.opacity = "1";
  }, 100);
}
