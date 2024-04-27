function togglePerformerRadio() {
  var performerRadio = document.getElementById("performerRadio");
  var performerContainer = document.getElementById("performerContainer");
  var customerRadio = document.getElementById("customerRadio");
  var customerContainer = document.getElementById("customerContainer");
  var button = document.querySelector(".signup-button");

  performerRadio.checked = true;
  performerContainer.style.border = "2px solid #333333";

  button.value = "Sign up as performer";

  if (performerRadio.checked) {
    customerRadio.checked = false;
    customerContainer.style.border = "2px solid #d9d9d9";
  }
}

function toggleCustomerRadio() {
  var performerRadio = document.getElementById("performerRadio");
  var performerContainer = document.getElementById("performerContainer");
  var customerRadio = document.getElementById("customerRadio");
  var customerContainer = document.getElementById("customerContainer");
  var button = document.querySelector(".signup-button");

  customerRadio.checked = true;
  customerContainer.style.border = "2px solid #333333";

  button.value = "Sign up as customer";

  if (customerRadio.checked) {
    performerRadio.checked = false;
    performerContainer.style.border = "2px solid #d9d9d9";
  }
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
    { name: "Category 1", subcategories: ["Subcategory 1", "Subcategory 2"] },
    { name: "Category 2", subcategories: ["Subcategory 3", "Subcategory 4"] },
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
        category.subcategories.forEach((subcategory) => {
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.name = "subcategory";
          checkbox.value = subcategory;
          checkbox.id = subcategory;
          const label = document.createElement("label");
          label.htmlFor = subcategory;
          label.textContent = subcategory;
          subcategoriesDiv.appendChild(checkbox);
          subcategoriesDiv.appendChild(label);
          subcategoriesDiv.appendChild(document.createElement("br"));

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
      }
    }
  }

  mainCategorySelect.addEventListener("change", populateSubcategories);

  document
    .getElementById("addCategoriesBtn")
    .addEventListener("click", function () {
      document.getElementById("categoriesDropdown").style.display = "none";
      const mainCategorySelect = document.getElementById("mainCategorySelect");
      mainCategorySelect.selectedIndex = 0;
      subcategoriesDiv.innerHTML = "";
    });

  document
    .getElementById("openCategoriesBtn")
    .addEventListener("click", function () {
      document.getElementById("categoriesDropdown").style.display = "block";
    });
});
