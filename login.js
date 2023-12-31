let container = document.querySelector(".container");
let loginPage = document.querySelector(".login-page");
let singnupPage = document.querySelector(".signup-page");
let homePage = document.querySelector(".home-page");
let pages = document.querySelectorAll(".page");

let tabsContainer = document.querySelector(".tabs-container");
let loginTab = document.querySelector("#loginTab");
let signupTab = document.querySelector("#signupTab");

let signupForm = document.querySelector("#signup-form");
let loginForm = document.querySelector("#login-form");

let signupSubmit = document.querySelector("#signup-submit");
let loginSubmit = document.querySelector("#login-submit");

let welcomeMessage = document.querySelector("#welcome-message");
let backToLoginPage = document.querySelector("#back-to-login");
let links = document.querySelectorAll(`[data-anchor-id]`);

//initial render
renderForm("1");

//tab switching
links.forEach((link) => {
  link.addEventListener("click", () => {
    renderForm(link.getAttribute("data-anchor-id"));
  });
});

tabsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab")) {
    let selectedTabId = e.target.getAttribute("data-tab-id");
    renderForm(selectedTabId);
  }
});

//signup submit
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let userObj = {
    fullname: signupForm["fullname"].value,
    email: signupForm["email"].value,
    password: signupForm["password"].value,
  };

  console.log(userObj);

  if (checkUserAlreadyExists(userObj) == true) {
    alert("This email already in use . Please try a different one");
    signupForm.reset();
    return;
  } else if (checkUserAlreadyExists(userObj) == false) {
    createAccount(userObj);
  }
});

//login submit
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let userObj = {
    email: loginForm["email"].value,
    password: loginForm["password"].value,
  };

  console.log(userObj);
  checkUserAlreadyExists(userObj);
  if (checkUserAlreadyExists(userObj) == true) {
    if (checkPassword(userObj) == true) {
      console.log("MATCHEDDDD");
      redirectToHomePage(
        "login",
        JSON.parse(localStorage.getItem(userObj.email)).fullname
      );
    } else {
      alert("Wrong Password Please Try again");
    }
  } else {
    alert(
      "The user with this email does not exist , please sign up and create account"
    );
  }
});

function checkUserAlreadyExists(userObj) {
  if (localStorage.getItem(userObj.email)) {
    return true;
  } else {
    return false;
  }
}

function checkPassword(passedObj) {
  console.log(passedObj);
  let userObjLocal = JSON.parse(localStorage.getItem(passedObj.email));

  if (userObjLocal.password === passedObj.password) {
    return true;
  } else {
    return false;
  }
}

function createAccount(obj) {
  localStorage.setItem(obj.email, JSON.stringify(obj));
  alert(`welcome ${obj.fullname} your account has been created `);
  signupForm.reset();
  redirectToHomePage("signup", obj.fullname);
}

function renderForm(tabId) {
  pages.forEach((page) => {
    if (page.getAttribute("data-page-id") !== tabId) {
      page.classList.add("hide");
    } else {
      page.classList.remove("hide");
    }
  });
}

function redirectToHomePage(text, userNameVal) {
  container.classList.toggle("hide");
  homePage.classList.toggle("hide");

  if (text == "signup") {
    welcomeMessage.textContent = `Hello ${userNameVal} 👋 , Welcome to the Udemy `;
  } else if (text == "login") {
    welcomeMessage.textContent = `Welcome back ${userNameVal} , Let's Code`;
  }
}

backToLoginPage.addEventListener("click", () => {
  container.classList.toggle("hide");
  homePage.classList.toggle("hide");
});
