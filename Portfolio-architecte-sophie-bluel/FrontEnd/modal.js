let modal = null;
const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = 'flex';
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

/*display articles in modal*/

const displayImagesInModal = async () => {
    const allImages = await getImagesList();

    const modalContainer = document.querySelector("#modal__container__edit");
    modalContainer.innerHTML = "";

    allImages.forEach((image) => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        const deleteIcon = document.createElement('i');

        img.src = image.imageUrl;
        img.alt = image.title;

        deleteIcon.classList.add('fa-regular', 'fa-trash-can');

        figcaption.textContent = 'éditer';

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(deleteIcon);

        modalContainer.appendChild(figure);
    });
};

displayImagesInModal();
