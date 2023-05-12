document.querySelector('#log__form').addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire

    let valid = true;

    for (let input of document.querySelectorAll(".section__log input")) {
        valid = valid && input.reportValidity();

        if (!valid) {
            break;
        }
    }

    if (valid) {
        let email = document.querySelector('#log__email').value;
        let password = document.querySelector('#log__password').value;

        // Préparation des données à envoyer dans la requête
        let data = {
            email: email,
            password: password
        };

        // Envoi de la requête POST à l'API
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.success) {
                    console.log("Redirection vers index.html");
                    // Redirection vers le site après la validation des identifiants
                    window.location.href = "index.html";
                } else {
                    alert("Identifiants incorrects");
                }
            })
            .catch(error => {
                console.error('Erreur lors de la requête:', error);
            });
    }
});