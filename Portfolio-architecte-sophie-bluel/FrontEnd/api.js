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

