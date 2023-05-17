/*open-close modal*/
let modal = null;
const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = 'flex';
    modal = target;
    const buttonClose = modal.querySelectorAll('.js-modal-close');
    buttonClose.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    // j'ai ciblé la gallery car l'opacité ne sappliquait pas sur images

    document.body.classList.add('modal-open')

};

const closeModal = function (e) {
    e.preventDefault();
    modal.style.display = 'none';
    modal.removeEventListener('click', closeModal);
    modal = null;

    document.body.classList.remove('modal-open');
};
const outsideClick = function (e) {
    if (!modal.contains(e.target)) {
        closeModal(e);
    }
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
        figure.dataset.articleId = image.id;
        modalContainer.appendChild(figure);
    });
};

displayImagesInModal();

/*function for delete articles */

const deleteArticleIcon = document.getElementsByClassName('fa-trash-can')
console.log(deleteArticleIcon)
const deleteArticleButton = document.getElementById('modal__btn__delete__picture')
const modalContainer = document.querySelector("#modal__container__edit");
const deleteArticleFromServer = async (articleId) => {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${articleId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Article deleted from server');
        } else {
            console.error('Failed to delete article from server');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
modalContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-trash-can')) {
        const articleElement = event.target.parentNode;
        const articleId = articleElement.dataset.articleId;

        deleteArticleFromServer(articleId); // Supprimer l'article du serveur

        articleElement.remove(); // Supprimer l'article de l'interface utilisateur
    }
});


deleteArticleButton.addEventListener('click', function () {
    while (modalContainer.firstChild) {
        modalContainer.removeChild(modalContainer.firstChild);
    }
});
/*arrow ,preview, modal*/
const arrow = document.querySelector('.arrow__left');
const modalGallery1 = document.getElementById('modal__gallery1');
const modalGallery2 = document.getElementById('modal__gallery2');

arrow.addEventListener('click', function () {
    modalGallery1.style.display = 'flex';
    modalGallery2.style.display = 'none';
});
/*add pictures */
const btnOpenModal2 = document.getElementById('modal__btn__add__picture')
btnOpenModal2.addEventListener('click', function () {
    modalGallery1.style.display = 'none';
    modalGallery2.style.display = 'flex';
});

const buttonSendWork = document.getElementById('modal__btn__valid__picture')
buttonSendWork.addEventListener('click', async function (s) {
    s.preventDefault();

    // Récupérer les données du formulaire
    const titleInput = document.getElementById('title');
    const categoryInput = document.getElementById('category');
    const addWork = document.getElementById('js-form-add-picture');

    const title = titleInput.value;
    const category = categoryInput.value;
   

    // Effectuer une requête API pour ajouter les photos
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);

    // Ajouter chaque fichier image au formData
  

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            // Les photos ont été ajoutées avec succès
            // Réinitialiser le formulaire ou fermer la modale si nécessaire
            titleInput.value = '';
            categoryInput.value = '';
            addWork.value = '';
            closeModal(); // Fermer la modale après l'ajout des photos
        } else {
            // Gérer les erreurs de la requête
            const errorData = await response.json();
            console.error('Erreur lors de l\'ajout des photos:', errorData);
        }
    } catch (error) {
        console.error('Erreur lors de la requête d\'ajout des photos:', error);
    }
});