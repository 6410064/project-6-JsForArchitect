
let logForm = document.getElementById('log__form')
logForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire

    let valid = true;

    for (let input of document.querySelectorAll("#log__form input")) {
        valid = valid && input.reportValidity();

        if (!valid) {
            break;
        }
    }
    let data = {};
    if (valid) {
        let email = document.querySelector('#log__email').value;
        let password = document.querySelector('#log__password').value;
        // Préparation des données à envoyer dans la requête
        data = {
            email: email,
            password: password
        };
    }
    console.log(data);
    // Envoi de la requête POST à l'API
    handleLogin(data)

});

const handleLogin = async (identification) => {
    try {
        const response = await login(identification);
        const result = await response.json(); // Ajout de cette ligne pour extraire les données JSON de la réponse

        if (response.ok && result.token) { // Vérifier si la réponse est réussie et si le token existe
            const token = result.token;
            const userId = result.userId; // Correction de la variable userId

            window.localStorage.setItem('token', token);
            window.localStorage.setItem('userId', userId);
            window.location.href = "index.html";
        } else {
            alert("Erreur dans l'identifiant ou le mot de passe"); // Correction de l'apostrophe dans l'alerte
        }
    } catch (error) {
        console.error('Erreur lors de la requête:', error);
    }
}
