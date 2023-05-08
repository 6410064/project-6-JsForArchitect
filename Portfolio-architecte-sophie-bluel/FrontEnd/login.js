document.querySelector('#log__form input[type="submit"]').addEventListener("click", function () {
    let valid = true;

    for (let input of document.querySelectorAll(".form input, .form label")) {
        valid = valid && input.reportValidity();

        if (!valid) {
            break;
        }
    }

    if (valid) {
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;

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
                if (result.success) {
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
