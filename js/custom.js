function validateForm(e) {
    let userNameInputValid = false;
    let userNameInput = document.querySelector("[name='userNameInput']")
    const numberRegex = /^([^0-9]*)$/;
    const lettersRegex = /^[A-Za-z]+$/;

    let emailInputValid = false;
    let emailInput = document.querySelector("[name='emailInput']")
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let passwordInputValid = false;
    let passwordInput = document.querySelector("[name='passwordInput']")
    let confirmPasswordInput = document.querySelector("[name='confirmPasswordInput']")

    // user name validation
    if (userNameInput.value != "" && userNameInput.value.length >= 5 && userNameInput.value.length < 15 && userNameInput.value[0].match(lettersRegex) && userNameInput.value.slice(-1).match(lettersRegex)) {
        userNameInputValid = true;
        userNameInput.classList.remove('is-invalid');
    }
    else if (userNameInput.value == "" || userNameInput.value.length < 5 || userNameInput.value.length > 15 || userNameInput.value[0].match(numberRegex) || userNameInput.value.slice(-1).match(numberRegex)) {
        userNameInput.classList.add('is-invalid')
        e.preventDefault();
    }

    // email validation
    if (emailInput.value.match(validEmailRegex)) {
        emailInputValid = true;
        emailInput.classList.remove('is-invalid')

    } else {
        emailInput.classList.add('is-invalid')
        e.preventDefault();
    }

    // password validation
    if (passwordInput.value !== null && passwordInput.value.length >= 8 && confirmPasswordInput.value !== null && confirmPasswordInput.value.length >= 8 && (passwordInput.value === confirmPasswordInput.value)) {
        passwordInputValid = true;
        passwordInput.classList.remove('is-invalid');
        confirmPasswordInput.classList.remove('is-invalid');

    }
    else if (passwordInput.value === null || passwordInput.value.length < 8 || confirmPasswordInput.value === null || confirmPasswordInput.value.length < 8 || (passwordInput.value != confirmPasswordInput.value)) {
        passwordInputValid = false;
        passwordInput.classList.add('is-invalid');
        confirmPasswordInput.classList.add('is-invalid');
        e.preventDefault();
    }


    if (userNameInputValid == true && emailInputValid == true && passwordInputValid == true) {
        e.preventDefault();

        fetch('https://goldblv.com/api/hiring/tasks/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userNameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                password_confirmation: confirmPasswordInput.value
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    document.getElementById('server-error').innerHTML = data.errors.password[0];
                } else if (data.id) {
                    localStorage.setItem("email", data.email);
                    window.location.href = "successfully-logged-in.html";
                }
            }).catch(err => { })
    }
}

window.onload = function getUserEmail() {
    const userEmail = localStorage.getItem('email');
    if (document.getElementById('email-data')) {
        document.getElementById('email-data').innerHTML = userEmail;
    }
}