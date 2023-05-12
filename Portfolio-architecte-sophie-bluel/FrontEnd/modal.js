let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = 'block';
    modal = target;
    const buttonClose = modal.querySelector('#js-modal-close');
    buttonClose.addEventListener('click', closeModal);
};

const closeModal = function (e) {
    e.preventDefault();
    modal.style.display = 'none';
    modal.removeEventListener('click', closeModal);
    modal = null;
};

document.querySelectorAll('.modal-js').forEach(a => {
    a.addEventListener('click', openModal);
});