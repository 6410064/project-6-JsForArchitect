const token = localStorage.getItem("token");

if (token) {
  document.addEventListener("DOMContentLoaded", async function async(event) {
    event.preventDefault();

    const header = document.querySelector("header");
    header.style.marginTop = "100px";
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

    const figure = document.querySelector("section#introduction figure");
    const sectionHtml = `
            <a class="section__link__edit edit__style modal-js" id="section-modify-button">
                <i class="fa-regular fa-pen-to-square"></i>modifier</a>
        `;
    figure.innerHTML += sectionHtml;

    const h2 = document.querySelector("section#portfolio h2");

    const h2Html = `
    <a class="section__title__edit edit__style modal-js" id="title-modify-button">
        <i class="fa-regular fa-pen-to-square"></i>modifier</a>
`;
    h2.insertAdjacentHTML("beforeend", h2Html);

    const categoriesList = await getCategories();
    console.log(
      "🚀 ~ file: admin.js:5 ~ createModalContent ~ categoriesList:",
      categoriesList
    );

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
            ${categoriesList.map((category) => {
      return `<option value="${category.id}">${category.name}</option>`;
    })}
            </select>
            <div class="modal__btn__form__valid">
              <input id="modal__btn__valid__picture" class="size__btn" type="submit" value="Valider" />
            </div>
          </form>
        </div>
      </div>
    </aside>
  `;

    const main = document.querySelector("main");
    main.insertAdjacentHTML("beforeend", modalContent);

    const logout = document.getElementById("btn__login");
    logout.textContent = "logout";

    /* modal 1 */
    /*open close */

    const openModal = function (e) {
      e.preventDefault();
      e.stopPropagation();

      modal.style.display = "flex";
      const buttonClose = modal.querySelectorAll(".js-modal-close");
      buttonClose.forEach((button) => {
        button.addEventListener("click", closeModal);
      });
      // modal open sert a appliquer l'opacity sur le body
      document.body.classList.add("modal-open");
      /*opacity sur les images(qui ne s'appliquait pas) quand modale s'ouvre*/
      const displayedImages =
        document.getElementsByClassName("displayed-image");
      for (i = 0; i < displayedImages.length; i++) {
        displayedImages[i].style.opacity = 0.3;
      }
    };

    const closeModal = function (e) {
      e.preventDefault();
      e.stopPropagation();

      modal.style.display = "none";

      const buttonClose = modal.querySelectorAll(".js-modal-close");
      buttonClose.forEach((button) => {
        button.removeEventListener("click", closeModal);
      });
      const displayedImages =
        document.getElementsByClassName("displayed-image");
      for (i = 0; i < displayedImages.length; i++) {
        displayedImages[i].style.opacity = 1;
      }
      document.body.classList.remove("modal-open");
    };

    const modal = document.getElementById("modal");
    // fermer modale si je clik a l'extérieur
    window.addEventListener("click", function (event) {
      if (event.target !== modal && !modal.contains(event.target)) {
        closeModal(event);
      }
    });
    const btnOpenModalHeader = document.getElementById("header-modify-button");
    btnOpenModalHeader.addEventListener("click", openModal);

    const btnOpenModalImage = document.getElementById("section-modify-button");
    btnOpenModalImage.addEventListener("click", openModal);

    const btnOpenModalTitle = document.getElementById("title-modify-button");
    btnOpenModalTitle.addEventListener("click", openModal);

    /*display articles in modal*/

    const displayImagesInModal = async () => {
      const allImages = await getImagesList();

      const modalContainer = document.querySelector("#modal__container__edit");
      modalContainer.innerHTML = "";

      allImages.forEach((image) => {
        const figure = document.createElement("div");

        const img = document.createElement("img");
        img.src = image.imageUrl;

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = "éditer";

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-regular", "fa-trash-can");

        // img.alt = image.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(deleteIcon);
        figure.dataset.articleId = image.id;

        modalContainer.appendChild(figure);
      });
    };
    displayImagesInModal();

    /*function for delete articles */

    // pour supprimer toute la galerie
    const deleteArticleButton = document.getElementById(
      "modal__btn__delete__picture"
    );
    deleteArticleButton.addEventListener("click", function () {
      while (modalContainer.firstChild) {
        modalContainer.removeChild(modalContainer.firstChild);
      }
    });

    // pour supprimer 1 article avec l'icone suppr
    const modalContainer = document.querySelector("#modal__container__edit");

    const handleDeleteImage = async (articleId) => {
      try {
        const response = await deleteImage(articleId);
        if (response.ok) {
          console.log("Article deleted from server");
          window.location.reload();
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

        handleDeleteImage(articleId); // Supprimer l'article du serveur

        articleElement.remove(); // Supprimer l'article de l'interface utilisateur
      }
    });

    // modal 2
    /*arrow modal preview */

    const arrow = document.querySelector(".arrow__left");
    const modalGallery1 = document.getElementById("modal__gallery1");
    const modalGallery2 = document.getElementById("modal__gallery2");

    arrow.addEventListener("click", function () {
      modalGallery1.style.display = "flex";
      modalGallery2.style.display = "none";
    });

    // boutton ajouter une photo
    const btnOpenModal2 = document.getElementById("modal__btn__add__picture");
    btnOpenModal2.addEventListener("click", function () {
      modalGallery1.style.display = "none";
      modalGallery2.style.display = "flex";
    });

    /*afficher image dans modal 2 */
    const btnValidUpdate = document.getElementById(
      "modal__btn__valid__picture"
    );
    btnValidUpdate.style.backgroundColor = "#A7A7A7";

    const imagePreviewContainer = document.getElementById(
      "modal__form__add__pictures__style"
    );
    // btn add photo
    const fileInput = document.querySelector("#add-picture");

    fileInput.addEventListener("change", function () {
      btnValidUpdate.style.backgroundColor = "#1D6154";
      // FileReader sert a lire le fichier en async
      const reader = new FileReader();

      // vide le contenaire avant d'afficher l'image
      reader.onload = function (e) {
        imagePreviewContainer.innerHTML = "";

        if (fileInput.files && fileInput.files[0]) {
          const imagePreview = document.createElement("img");

          imagePreview.src = e.target.result;
          imagePreview.alt = "Aperçu de l'image";
          imagePreview.style.objectFit = "cover";
          imagePreview.style.width = "100%";
          imagePreview.style.height = "100%";
          imagePreviewContainer.appendChild(imagePreview);
        }
      };
      // lis et convertis le fichier en une url de données
      reader.readAsDataURL(fileInput.files[0]);
    });

    /*add pictures form */
    const formModal = document.getElementById("modal__form");

    formModal.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData();
      const titleInput = document.getElementById("title");
      const categoryInput = document.getElementById("category");

      const selectedCategory = categoryInput.value;

      formData.append("category", selectedCategory);
      formData.append("image", fileInput.files[0]);
      formData.append("title", titleInput.value);

      try {
        const response = await addImage(formData);
        closeModal(event);

        if (response.ok) {
          titleInput.value = "";
          categoryInput.value = "";
          fileInput.value = "";
          console.log("La requête a été traitée avec succès.");

          const newImg = document.createElement("img");
          const newFigcaption = document.createElement("figcaption");

          newImg.src = fileInput.value;
          newImg.alt = titleInput.value;
          newFigcaption.textContent = titleInput.value;

          window.location.reload();
        } else {
          // Gérer les erreurs de la requête
          const errorData = await response.json();
          console.error("Erreur lors de l'ajout des photos:", errorData);
        }
        console.log("Réponse du serveur:", response);
      } catch (error) {
        console.error("Erreur lors de la requête d'ajout des photos:", error);
      }
    });
  });
}