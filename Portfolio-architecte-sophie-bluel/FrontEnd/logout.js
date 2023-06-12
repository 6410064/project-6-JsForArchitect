console.log(token)


document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('#btn__login');
    console.log(loginButton);
    if (loginButton.textContent === "logout") {
        loginButton.addEventListener('click', function (l) {
            localStorage.removeItem(token); // Supprime le token du localStorage
            localStorage.clear(); // Vide tout le localStorage

            const headerEdit = document.getElementsByClassName('header__edit')[0];
            headerEdit.style.display = 'none';

            const header = document.querySelector('header');
            header.style.marginTop = '50px';

            const sectionModifyButton = document.getElementById('section-modify-button')
            sectionModifyButton.style.display = 'none';

            const titleModifyButton = document.getElementById('title-modify-button')
            titleModifyButton.style.display = 'none';

            loginButton.textContent = "login";
        });
    } else {
        loginButton.addEventListener('click', function () {
            window.location.href = "login.html";
        });
    }
});

