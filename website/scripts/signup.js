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
