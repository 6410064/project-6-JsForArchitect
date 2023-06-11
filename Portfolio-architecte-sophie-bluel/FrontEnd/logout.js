console.log(token)


const loginButton = document.querySelector('#btn__login');
console.log(loginButton)
loginButton.addEventListener('click', function() {
    localStorage.removeItem("token"); // Supprime le token du localStorage
    localStorage.clear(); // Vide tout le localStorage
  
   const headerEdit = document.getElementsByClassName('header__edit')[0];
   headerEdit.style.display = 'none';

   const header = document.querySelector('header');
    header.style.marginTop = '50px';
   
   const sectionModifyButton = document.getElementById('section-modify-button')
   sectionModifyButton.style.display = 'none';

   const titleModifyButton = document.getElementById('title-modify-button')
   titleModifyButton.style.display = 'none' ;
   
  });