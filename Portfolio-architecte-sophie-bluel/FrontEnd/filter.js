const initiateFilters = async () => {
  const categoriesList = await getCategories();

  const categoriesElement = document.querySelector(".article__filter");

  categoriesElement.innerHTML += `
    <li class="filter filter__selected" data-category-id="0">
      Tous
    </li>
  `;

  categoriesList.forEach((category) => {
    categoriesElement.innerHTML += `
      <li class="filter" data-category-id="${category.id}">${category.name}</li>
    `;
  });

  let filters = Array.from(document.querySelectorAll(".filter"));

  // pour eviter les doublons dans le filtrage :
  let uniqueFilters = new Set(filters);

  // pour afficher les filtres en fonction de l'id
  uniqueFilters.forEach((filter) => {
    filter.addEventListener("click", async function () {
      let imagesId = parseInt(this.getAttribute("data-category-id"));
      displayImages(imagesId);
    });
  });
};

initiateFilters();

// pour que la catégorie sur laquelle je clique devienne verte
const displayImages = async (categoryId) => {
  let filters = Array.from(document.querySelectorAll(".filter"));

  // pour eviter les doublons dans le filtrage :
  let uniqueFilters = new Set(filters);

  uniqueFilters.forEach((filterElement) => {
    const filterElementId = parseInt(
      filterElement.getAttribute("data-category-id")
    );

    if (categoryId === filterElementId) {
      filterElement.classList.add("filter__selected");
    } else {
      filterElement.classList.remove("filter__selected");
    }
  });
  /* filtre img en fonction de l'id*/
  const allImages = await getImagesList();

  let filteredImages = [];

  if (categoryId === 0) {
    filteredImages = allImages;
  } else {
    filteredImages = allImages.filter(
      (image) => image.categoryId === categoryId
    );
  }

  document.querySelector(".gallery").innerHTML = "";

  filteredImages.forEach((image) => {
    document.querySelector(".gallery").innerHTML += `
      <figure class='displayed-image'>
        <img src="${image.imageUrl}" alt="${image.title}">
        <figcaption>${image.title}</figcaption>
      </figure>`;
  });
};

displayImages(0);