const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn && window.location.pathname !== "/charts.html") {
  window.location.href = "/charts.html";
}

if (!isLoggedIn && window.location.pathname === "/charts.html") {
  window.location.href = "/login.html";
}
