
let filters = Array.from(document.querySelectorAll(".filter"));
let uniqueFilters = new Set(filters);

uniqueFilters.forEach((filter) => {
  filter.addEventListener("click", async function () {
    let imagesId = parseInt(this.getAttribute("data-category-id"));
    displayImages(imagesId);
  });
});

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
    filteredImages = allImages.filter((image) => image.categoryId);
  }

  document.querySelector(".gallery").innerHTML = "";

  filteredImages.forEach((image) => {
    // let article = new Article(image);
    document.querySelector(".gallery").innerHTML += `
        <figure>
          <img src="${image.imageUrl}" alt="${image.title}">
          <figcaption>${image.title}</figcaption>
        </figure>`;
  });
}

displayImages(0)