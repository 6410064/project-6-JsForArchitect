const login = async (identification) => {
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(identification)
  });
  return response
}

const getImagesList = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

const deleteImage = async (articleId) => {
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
  return response;
}

const addImage = async (image) => {
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: image,
    headers: {
      Authorization: "Token " + token,
      Accept: "application/json",
    },
  });
  return response
}