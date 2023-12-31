let form = document.querySelector("form");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let submitBtn = document.querySelector("#submit");
let loginBtn = document.querySelector("#login");
let signupBtn = document.querySelector("#signup");

let loginPage = document.querySelector(".login-page");
let accountPage = document.querySelector(".account-page");
let welcomeMessage = document.querySelector("#welcome-message");
let backToLoginPage = document.querySelector("#back-to-login");

backToLoginPage.addEventListener("click", () => {
  loginPage.classList.toggle("hide");
  accountPage.classList.toggle("hide");
});

function showExisting(obj) {
  alert(`Logged in as ${obj.username}`);
}

login.addEventListener("click", (e) => {
  let userNameVal = username.value;
  let passwordVal = password.value;
  if (!(userNameVal && passwordVal)) {
    alert("Fill all the fields");
    return;
  }

  e.preventDefault();

  if (checkUserAlreadyExists(userNameVal) == true) {
    if (checkPassword(userNameVal, passwordVal) == true) {
      redirectToHomePage("login", userNameVal);
      form.reset();
    } else {
      alert("Wrong Password Please Try again");
      password.value = "";
    }
  } else {
    alert("This user does not exist , please sign up and create account");
  }
});

signup.addEventListener("click", (e) => {
  e.preventDefault();

  if (!(username.value && password.value)) {
    alert("Fill all the fields");
    return;
  }

  if (checkUserAlreadyExists(username.value) == true) {
    alert("This username already exists . Please try a different username");
    form.reset();
    return;
  } else if (checkUserAlreadyExists(username.value) == false) {
    createAccount({ username: username.value, password: password.value });
  }
});

function checkUserAlreadyExists(username) {
  if (localStorage.getItem(username)) {
    return true;
  } else {
    return false;
  }
}

function checkPassword(passedUsername, passedPassword) {
  let userObj = JSON.parse(localStorage.getItem(passedUsername));

  if (userObj.password === passedPassword) {
    return true;
  } else {
    return false;
  }
}

function createAccount(obj) {
  localStorage.setItem(obj.username, JSON.stringify(obj));
  alert(`welcome ${obj.username} your account has been created `);
  form.reset();
  redirectToHomePage("signup", obj.username);
}

function redirectToHomePage(text, userNameVal) {
  loginPage.classList.toggle("hide");
  accountPage.classList.toggle("hide");

  if (text == "signup") {
    welcomeMessage.textContent = `Hello ${userNameVal} 👋 , Welcome to the page , thanks for using our service `;
  } else if (text == "login") {
    welcomeMessage.textContent = `Welcome back ${userNameVal}`;
  }
}
