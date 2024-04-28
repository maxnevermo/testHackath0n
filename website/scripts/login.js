const customerChoiceButton = document.getElementById("customerButton");
const performerChoiceButton = document.getElementById("performerButton");

const firstRec = document.querySelector(".first-rec");
const secondRec = document.querySelector(".sec-rec");

const form = document.getElementById("loginForm");

customerChoiceButton.addEventListener("click", function () {
  form.action = "/customer/login";
  customerChoiceButton.classList.add("active-button");
  performerChoiceButton.classList.remove("active-button");

  customerChoiceButton.classList.remove("inactive-button");
  performerChoiceButton.classList.add("inactive-button");

  console.log(firstRec);

  secondRec.classList.add("sec-rec");
  firstRec.classList.add("first-rec");
  secondRec.classList.remove("first-rec");
  firstRec.classList.remove("sec-rec");

  form.style.borderTopRightRadius = "25px";
});

performerChoiceButton.addEventListener("click", function () {
  form.action = "/performer/login";

  customerChoiceButton.classList.remove("active-button");
  performerChoiceButton.classList.add("active-button");

  customerChoiceButton.classList.add("inactive-button");
  performerChoiceButton.classList.remove("inactive-button");

  secondRec.classList.add("first-rec");
  secondRec.classList.remove("sec-rec");
  firstRec.classList.add("sec-rec");

  form.style.borderTopRightRadius = 0;
  firstRec.style.borderRadius = 0;
});
