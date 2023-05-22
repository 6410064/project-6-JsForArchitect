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
const token = localStorage.getItem("token");

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
/*arrow ,preview, modal*/
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

/*add pictures with modal form */




const fileInput = document.querySelector('#add-picture');
const formData = new FormData();

const buttonSendWork = document.getElementById("modal__btn__valid__picture");
buttonSendWork.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Récupérer les données du formulaire
    const titleInput = document.getElementById("title");
    const categoryInput = document.getElementById("category");
    if (category === "") {
      categoryId = 0;
    if (category === "Objets") {
        categoryId = 1;
    } else if (category === "Appartements") {
        categoryId = 2;
    } else if (category === "Hôtels & restaurants") {
        categoryId = 3;
    }
    const title = titleInput.value;
    const category = categoryInput.value;

    
    let categoryId = category
    
    // Assigner les categoryId en fonction de la catégorie sélectionnée
    
    
    formData.append("title", title);
    formData.append("categoryId", categoryId);
    formData.append("imageUrl", fileInput.files[0]);

    // Ajouter chaque fichier image au formData
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
            categoryInput.value = ""; // Réinitialiser le champ de catégorie
            fileInput.value = ""; // Réinitialiser le champ de fichier
            console.log("La requête a été traitée avec succès.");
        } else {
            // Gérer les erreurs de la requête
            const errorData = await response.json();
            console.error("Erreur lors de l'ajout des photos:", errorData);
        }
        console.log("Réponse du serveur:", response);
    } catch (error) {
        console.error("Erreur lors de la requête d'ajout des photos:", error);
    }}
});
