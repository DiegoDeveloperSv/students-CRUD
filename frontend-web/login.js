
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const errorMessage = document.getElementById("error-message");

const users = [
  {
    username: "admin",
    password: "admin123",
  },
  {
    username: "user1",
    password: "password1",
  }
];

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const user = users.find(
    (user) => user.username === username.value && user.password === password.value
  );

  if (user) {
    window.location.href = "inicio.html";
  } else {
    errorMessage.textContent = "Invalid username or password";
    username.value = "";
    password.value = "";
  }
});