
document.addEventListener('DOMContentLoaded', function () {
    const btnLog = document.querySelector('#btn__login'); 

    function btnLogout() {
        localStorage.removeItem(token); // Supprime le token du localStorage

        const headerEdit = document.querySelector('.header__edit');
        headerEdit.style.display = 'none';

        const header = document.querySelector('header');
        header.style.marginTop = '50px';

        const sectionModifyButton = document.getElementById('section-modify-button');
        sectionModifyButton.style.display = 'none';

        const titleModifyButton = document.getElementById('title-modify-button');
        titleModifyButton.style.display = 'none';

        btnLog.textContent = 'login';
        btnLog.removeEventListener('click', btnLogout);
        btnLog.addEventListener('click', btnLogin);
    }

    function btnLogin() {
        window.location.href = 'login.html';
    }

    if (btnLog.textContent.trim() === 'logout') {
        btnLog.addEventListener('click', btnLogout);
    } else {
        btnLog.addEventListener('click', btnLogin);
    }
});
