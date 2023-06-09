

const loginButton = document.getElementById('btn__login');

loginButton.addEventListener('click', function() {
    localStorage.removeItem("token"); // Supprime le token du localStorage
    localStorage.clear(); // Vide tout le localStorage
    window.location.href = 'login.html'; // Redirection vers login.html
  });