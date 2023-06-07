

const btnLogin = document.getElementById('btn__login');

btnLogin.addEventListener('click', function () {
    localStorage.removeItem(token);

});