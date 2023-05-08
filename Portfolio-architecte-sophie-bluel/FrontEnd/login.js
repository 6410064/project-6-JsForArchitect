document.querySelector('#log__form input[type="submit"]').addEventListener("click", function () {
    for (let input of document.querySelectorAll(".form input,.form label")) {
        valid = valid && input.reportValidity();
        if(!valid){
            break;
        }
        else (valid) { 
            alert("Message envoyé")
        }
    }
});