

let filterSelected = document.querySelector(".filter__selected");
let filters = Array.from(document.querySelectorAll(".filter"));
let uniqueFilters = new Set(filters);
let index = 0;

uniqueFilters.forEach((filter) => {
  filter.addEventListener("click", function () {
    uniqueFilters.forEach((filter) => {
      filter.classList.remove("filter__selected");
    });
    this.classList.add("filter__selected");
  });
});

// function: displayImages
const displayImages = async (categoryId) => {
  // get images
  const allImages = await getImagesList()

  let filteredImages = [];

  // if all images, set filteredImages to allImages
  if (!categoryId) {
    filteredImages = allImages
  } else {  // else filter it

    allImages.forEach((image) => {
      if (image.categoryId === categoryId) {
        filteredImages.push(image)
      }
    })
  }
  console.log(filteredImages);

  // display images
  
  
}

displayImages()


// uniqueFilters[1].addEventListener('click', () => {
   
//   });
