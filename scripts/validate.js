function showErrorMessage(input, form, {errorClass, inputErrorClass, ...rest}) {
    const error = document.querySelector('#' + input.id + '-error');
    error.textContent = input.validationMessage;

    error.classList.add(errorClass);
    input.classList.add(inputErrorClass);

}





function checkInputValidity(input, form, rest) {
    if (input.validity.valid) {

    } else {
        showErrorMessage(input, form, rest);

    }

}


function enableValidation( {formSelector, inputSelector, submitButtonSelector, ...rest}) {
    const forms = Array.from(document.querySelectorAll(formSelector));

    forms.forEach((form) => {
        form.addEventListener('submit', ((e) => {
            e.preventDefault()
        }))

        const inputs = Array.from(document.querySelectorAll(inputSelector));
        const button = form.querySelector(submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                checkInputValidity(input, form, rest);
            })
        })
    })
}



// enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation({
    formSelector: ".modal__profile",
    inputSelector: ".modal__text-input",
    submitButtonSelector: ".modal__form-submit",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__text-input_type_error",
    errorClass: "modal__error_visible"
  });


