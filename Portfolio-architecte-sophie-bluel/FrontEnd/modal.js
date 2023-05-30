/*open-close modal*/

let modal = null;
const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = "flex";
    modal = target;
    const buttonClose = modal.querySelectorAll(".js-modal-close");
    buttonClose.forEach((button) => {
        button.addEventListener("click", closeModal);
    });

    document.body.classList.add("modal-open");
};

const closeModal = function (e) {
    e.preventDefault();
    modal.style.display = "none";
    modal.removeEventListener("click", closeModal);
    modal = null;

    document.body.classList.remove("modal-open");
};
const outsideClick = function (e) {
    if (!modal.contains(e.target)) {
        closeModal(e);
    }
};

document.querySelectorAll(".modal-js").forEach((a) => {
    a.addEventListener("click", openModal);
});

/*display articles in modal*/

const displayImagesInModal = async () => {
    const allImages = await getImagesList();

    const modalContainer = document.querySelector("#modal__container__edit");
    modalContainer.innerHTML = "";

    allImages.forEach((image) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        const deleteIcon = document.createElement("i");

        img.src = image.imageUrl;
        img.alt = image.title;

        deleteIcon.classList.add("fa-regular", "fa-trash-can");

        figcaption.textContent = "éditer";

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(deleteIcon);
        figure.dataset.articleId = image.id;
        modalContainer.appendChild(figure);
    });
};

displayImagesInModal();

/*function for delete articles */

const deleteArticleIcon = document.getElementsByClassName("fa-trash-can");
console.log(deleteArticleIcon);
const deleteArticleButton = document.getElementById(
    "modal__btn__delete__picture"
);
const modalContainer = document.querySelector("#modal__container__edit");
// const token = localStorage.getItem("token");

const deleteArticleFromServer = async (articleId) => {

    try {
        const response = await fetch(
            `http://localhost:5678/api/works/${articleId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Token " + token,
                    Accept: "application/json",
                },
            }
        );
        console.log(response);
        if (response.ok) {
            console.log("Article deleted from server");
        } else {
            console.error("Failed to delete article from server");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

modalContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-trash-can")) {
        const articleElement = event.target.parentNode;
        const articleId = articleElement.dataset.articleId;

        deleteArticleFromServer(articleId); // Supprimer l'article du serveur

        articleElement.remove(); // Supprimer l'article de l'interface utilisateur
    }
});

deleteArticleButton.addEventListener("click", function () {
    while (modalContainer.firstChild) {
        modalContainer.removeChild(modalContainer.firstChild);
    }
});
/*arrow modal preview */
const arrow = document.querySelector(".arrow__left");
const modalGallery1 = document.getElementById("modal__gallery1");
const modalGallery2 = document.getElementById("modal__gallery2");

arrow.addEventListener("click", function () {
    modalGallery1.style.display = "flex";
    modalGallery2.style.display = "none";
});

const btnOpenModal2 = document.getElementById("modal__btn__add__picture");
btnOpenModal2.addEventListener("click", function () {
    modalGallery1.style.display = "none";
    modalGallery2.style.display = "flex";
});


/*display image in modal before update */

const imagePreviewContainer = document.getElementById("modal__form__add__pictures__style");
const fileInput = document.querySelector('#add-picture');
fileInput.addEventListener("change", function () {
    const reader = new FileReader();

    reader.onload = function (e) {
        // Supprimez le contenu précédent de la div de prévisualisation de l'image
        imagePreviewContainer.innerHTML = "";

        ////check if file selected
        if (fileInput.files && fileInput.files[0]) {
            // create new <img> with URL of image
            const imagePreview = document.createElement("img");
            imagePreview.src = e.target.result;
            imagePreview.alt = "Aperçu de l'image";
            imagePreview.style.objectFit = "cover";
            imagePreview.style.width = "100%";
            imagePreview.style.height = "100%";
            imagePreviewContainer.appendChild(imagePreview);
        }
    };

    reader.readAsDataURL(fileInput.files[0]);
});

/*add pictures with modal form */
const formModal = document.getElementById('modal__form')
const buttonSendWork = document.getElementById("modal__btn__valid__picture");

formModal.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();

    const titleInput = document.getElementById("title");
    const categoryInput = document.getElementById("category");

    let categoryId = 0; // Valeur par défaut
    const selectedCategory = categoryInput.value;
    if (selectedCategory === "Objets") {
        categoryId = 1;
    } else if (selectedCategory === "Appartements") {
        categoryId = 2;
    } else if (selectedCategory === "Hôtels & restaurants") {
        categoryId = 3;
    }

    formData.append("category", categoryId);
    formData.append("image", fileInput.files[0]);
    formData.append('title', titleInput.value);
    for (const value of formData.values()) {
        console.log(value);
    }
const createdElement = formData.values()
createdElement.style.height = '132px' ;
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: "Token " + token,
                Accept: "application/json",
                
            },
        });
        
        if (response.ok) {
            titleInput.value = ""; // Réinitialiser le champ de titre
            categoryId.value = ""; // Réinitialiser le champ de catégorie
            fileInput.value = ""; // Réinitialiser le champ de fichier
            console.log("La requête a été traitée avec succès.");
        } else {
            // Gérer les erreurs de la requête
            const errorData = await response.json();
            console.error("Erreur lors de l'ajout des photos:", errorData);
        }
        console.log("Réponse du serveur:", response);
    }
    catch (error) {
        // Autres erreurs
        console.error("Erreur lors de la requête d'ajout des photos:", error);
    }

});
