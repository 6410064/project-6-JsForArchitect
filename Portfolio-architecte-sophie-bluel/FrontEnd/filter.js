
let filters = Array.from(document.querySelectorAll(".filter"));
// pour eviter les doublons dans le filtrage :
let uniqueFilters = new Set(filters);

// pour afficher les images en fonction de l'id
uniqueFilters.forEach((filter) => {
  filter.addEventListener("click", async function () {
    let imagesId = parseInt(this.getAttribute("data-category-id"));
    displayImages(imagesId);
  });
});

// pour que la catégorie sur laquelle je clique devienne verte 
const displayImages = async (categoryId) => {
  uniqueFilters.forEach((filterElement) => {
    const filterElementId = parseInt(filterElement.getAttribute("data-category-id"));
    if (categoryId === filterElementId) {
      filterElement.classList.add("filter__selected");
    } else {
      filterElement.classList.remove("filter__selected");
    }
  });

  const allImages = await getImagesList();

  let filteredImages = [];

  if (categoryId === 0) {
    filteredImages = allImages;
  } else {
    filteredImages = allImages.filter((image) => image.categoryId === categoryId);
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
// appelle par défault toutes les images
displayImages(0);
