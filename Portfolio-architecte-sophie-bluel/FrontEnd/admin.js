const token = localStorage.getItem("token");
console.log(token);

if (token) {
  document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();

    const header = document.querySelector('header');
    header.style.marginTop = '100px';
    const headerHtml = `
            <a class="header__edit">
                <div class="header__link__edit edit__style modal-js" id="header-modify-button">
                    <i class="fa-regular fa-pen-to-square"></i>
                    Mode édition
                </div>
                <button id="header__btn__publish__changes">publier les changements</button>
            </a>
        `;

    header.innerHTML = headerHtml + header.innerHTML;




    const figure = document.querySelector('section#introduction figure');
    const sectionHtml = `
            <a class="section__link__edit edit__style modal-js" id="section-modify-button">
                <i class="fa-regular fa-pen-to-square"></i>modifier</a>
        `;
    figure.innerHTML += sectionHtml;

    const h2 = document.querySelector('section#portfolio h2');

    const h2Html = `
        <a class="section__title__edit edit__style modal-js id="title-modify-button">
            <i class="fa-regular fa-pen-to-square"></i>modifier</a>
    `;
    h2.insertAdjacentHTML('beforeend', h2Html);


    const modalContent = `
    <aside id="modal" class="modal__style" aria-hidden="true" role="dialog" aria-labelledby="title__modal"
      style="display: none;">
      <div id="modal__gallery1" style="display: flex;">
        <h3 class="title__modal">Galerie photo</h3>
        <button class="js-modal-close"><i class="fa-solid fa-xmark"></i></button>
        <div id="modal__container__edit"></div>
        <div id="modal__container__buttons">
          <input id="modal__btn__add__picture" class="size__btn" type="submit" value="Ajouter une photo">
          <button id="modal__btn__delete__picture">Supprimer la galerie</button>
        </div>
      </div>
      <div id="modal__gallery2" style="display: none;">
        <button class="arrow__left"><i class="fa-solid fa-arrow-left"></i></button>
        <h3 class="title__modal">Ajout photo</h3>
        <button class="js-modal-close"><i class="fa-solid fa-xmark"></i></button>
        <div id="modal__container__form">
          <form action="#" method="post" id="modal__form">
            <div id="modal__form__add__pictures__style">
              <i class="fa-sharp fa-regular fa-image"></i>
              <label id="js-form-add-picture" for="add-picture" class="custom-file-upload">
                <i class="fas fa-plus"></i> Ajouter une photo
              </label>
              <input type="file" name="add-picture" id="add-picture" accept=".png, .jpg"
                style="display: none;" />
              <p id="format__picture">jpg, png : 4mo max</p>
            </div>
            <label for="title">Titre</label>
            <input type="text" name="title" id="title" />
            <label for="category">Catégorie</label>
            <select name="category" id="category">
              <option value=""></option>
              <option value="Objets">Objets</option>
              <option value="Appartements">Appartements</option>
              <option value="Hôtels & restaurants">Hôtels & restaurants</option>
            </select>
            <div class="modal__btn__form__valid">
              <input id="modal__btn__valid__picture" class="size__btn" type="submit" value="Valider" />
            </div>
          </form>
        </div>
      </div>
    </aside>
  `;
  
  const main = document.querySelector('main');
  main.insertAdjacentHTML('beforeend', modalContent);
  
  const logout = document.getElementById('btn__login');
  logout.textContent = "logout";
  
  /* modal */
  /*open close */
  
  const openModal = function (e) {
    e.preventDefault();
    const target = document.getElementById("modal");
    target.style.display = "flex";
    modal = target;
    const buttonClose = modal.querySelectorAll(".js-modal-close");
    buttonClose.forEach((button) => {
      button.addEventListener("click", closeModal);
    });
  
    document.body.classList.add("modal-open");
  };
  

  const btnOpenModalHeader = document.getElementById("header-modify-button");
  btnOpenModalHeader.addEventListener("click", openModal);
  
  const btnOpenModalImage = document.getElementById("section-modify-button");
  btnOpenModalImage.addEventListener("click", openModal);

  // const btnOpenModalTitle = document.getElementById("title-modify-button");
  // btnOpenModalTitle.addEventListener("click", openModal);


const closeModal = function (e) {
    e.preventDefault();
    modal.style.display = "none";
    modal.removeEventListener("click", closeModal);
    modal = null;

    document.body.classList.remove("modal-open");
};


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

  });
}