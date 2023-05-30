const token = localStorage.getItem("token");
console.log(token);

if (token) {
  document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();

    const header = document.querySelector('header');
    header.style.marginTop = '100px';
    const headerHtml = `
            <div class="header__edit">
                <a href="#modal" class="header__link__edit edit__style modal-js">
                    <i class="fa-regular fa-pen-to-square"></i>Mode édition</a>
                <button id="header__btn__publish__changes">publier les changements</button>
            </div>
        `;

    header.innerHTML = headerHtml + header.innerHTML;

    const figure = document.querySelector('section#introduction figure');
    const sectionHtml = `
            <a href="#modal" class="section__link__edit edit__style modal-js">
                <i class="fa-regular fa-pen-to-square"></i>modifier</a>
        `;
    figure.innerHTML += sectionHtml;

    const h2 = document.querySelector('section#portfolio h2');

    const h2Html = `
        <a href="#modal" class="section__title__edit edit__style modal-js">
            <i class="fa-regular fa-pen-to-square"></i>modifier</a>
    `;
    h2.insertAdjacentHTML('beforeend', h2Html);


    const modalContent = `
    <aside id="modal" class="modal__style" aria-hidden="true" role="dialog" aria-labelledby="title__modal"
      style="display: flex;">
      <div id="modal__gallery1" style="display: flex;">
        <h3 class="title__modal">Galerie photo</h3>
        <button class="js-modal-close"><i class="fa-solid fa-xmark"></i></button>
        <div id="modal__container__edit">
        </div>
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
  console.log(modalContent)
    const main = document.querySelector('main');
    main.insertAdjacentHTML('beforeend', modalContent);


    const logout = document.getElementById('btn__login')
    logout.textContent = "logout";
  });
}



