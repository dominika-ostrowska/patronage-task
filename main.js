const registerForm = document.querySelector(".form-register");
const loginForm = document.querySelector(".form-login");
const logoutButton = document.querySelector(".btn-logout");
const navUsername = document.querySelector(".main-nav-username");

const getUser = (registeredUsers, user) => {
  return registeredUsers.find((registeredUser) => {
    return (
      registeredUser.login === user.login || registeredUser.email === user.email
    );
  });
};

const getRegisteredUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

const handleRegisterSubmit = (event) => {
  event.preventDefault();

  const login = registerForm.querySelector("input[name=login]").value;
  const password = registerForm.querySelector("input[name=password]").value;
  const email = registerForm.querySelector("input[name=email]").value;
  const confirmEmail = registerForm.querySelector(
    "input[name=confirm-email]"
  ).value;
  const formError = registerForm.querySelector(".form-error");

  const user = {
    login,
    password,
    email,
  };

  const registeredUsers = getRegisteredUsers();
  const existingUser = getUser(registeredUsers, user);

  if (existingUser) {
    formError.textContent = "Ten użytkownik już istnieje";
  } else if (email !== confirmEmail) {
    formError.textContent = "Adresy email muszą być takie same";
  } else {
    const newRegisteredUsers = [...registeredUsers, user];

    const registeredUsersString = JSON.stringify(newRegisteredUsers);
    localStorage.setItem("users", registeredUsersString);
    localStorage.setItem("isLoggedIn", user.login);
    window.location.href = "charts.html";
  }
};

const handleLoginSubmit = (event) => {
  event.preventDefault();

  const login = loginForm.querySelector("input[name=login]").value;
  const password = loginForm.querySelector("input[name=password]").value;
  const formError = loginForm.querySelector(".form-error");
  const user = { login, password };
  const registeredUsers = getRegisteredUsers();
  const existingUser = getUser(registeredUsers, user);

  if (existingUser) {
    if (user.password === existingUser.password) {
      localStorage.setItem("isLoggedIn", user.login);
      window.location.href = "charts.html";
    } else {
      formError.textContent = "Nieprawidłowe hasło";
    }
  } else {
    formError.textContent = "Użytkownik nie istnieje";
  }
};

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "/login.html";
};

if (registerForm) registerForm.addEventListener("submit", handleRegisterSubmit);
if (loginForm) loginForm.addEventListener("submit", handleLoginSubmit);
if (logoutButton) logoutButton.addEventListener("click", handleLogout);
if (navUsername) navUsername.textContent = localStorage.getItem("isLoggedIn");
