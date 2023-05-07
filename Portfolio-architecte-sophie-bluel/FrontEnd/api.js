class Article {
  constructor(jsonArticle) {
    jsonArticle && Object.assign(this, jsonArticle);
  }
}

const getImagesList = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((jsonListArticle) => {
    for (let jsonArticle of jsonListArticle) {
      let article = new Article(jsonArticle);
      document.querySelector(".gallery").innerHTML += `
        <figure>
          <img src="${article.imageUrl}" alt="${article.title}">
          <figcaption>${article.title}</figcaption>
        </figure>`;
    }
  });

let filters = Array.from(document.querySelectorAll(".filter"));
let uniqueFilters = new Set(filters);

uniqueFilters.forEach((filter) => {
  filter.addEventListener("click", async function () {
    uniqueFilters.forEach((f) => {
      f.classList.remove("filter__selected");
    });
    this.classList.add("filter__selected");

    let displayImages = parseInt(this.getAttribute("data-category-id"));

    const allImages = await getImagesList();

    let filteredImages = [];

    if (displayImages === 0) {
      filteredImages = allImages;
    } else {
      filteredImages = allImages.filter((image) => image.categoryId === displayImages);
    }

    document.querySelector(".gallery").innerHTML = "";

    filteredImages.forEach((image) => {
      let article = new Article(image);
      document.querySelector(".gallery").innerHTML += `
        <figure>
          <img src="${article.imageUrl}" alt="${article.title}">
          <figcaption>${article.title}</figcaption>
        </figure>`;
    });
  });
});