const setEventListeners = (form) => {
    const inputs = createInputs(form, validationForm)
    const button = form.querySelector(validationForm.submitButtonSelector);
    
    toggleButtonState(inputs, button);
  
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        checkInputValidity(form, input);
        toggleButtonState(inputs, button);
      });
    });
  };


function showErrorMessage(form, input) {
    const error = form.querySelector('#' + input.id + '-error');

    error.textContent = input.validationMessage;
    error.classList.add(validationForm.errorClass);
    input.classList.add(validationForm.inputErrorClass);

}


function hideErrorMessage(input, form) {
    const error = form.querySelector('#' + input.id + '-error');
    
    error.textContent = "";
    error.classList.remove(validationForm.errorClass);
    input.classList.remove(validationForm.inputErrorClass);
}


function checkInputValidity(form, input) {
    if (!input.validity.valid) {
        showErrorMessage(form, input, input.validationMessage);
    } else {
        hideErrorMessage(input, form);
    }
}


const hasInvalidInput = (inputs) => {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  };


function toggleButtonState(inputs, button) {
    if (hasInvalidInput(inputs)) {
        button.classList.add(validationForm.inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(validationForm.inactiveButtonClass);
        button.disabled = false;
    }
}


function enableValidation(settingsObject) {
    const forms = Array.from(document.querySelectorAll(settingsObject.formSelector));
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      setEventListeners(form);
    });
  }


function createInputs(form, settings) {
    return Array.from(form.querySelectorAll(settings.inputSelector));
}


function resetForm(form) {
    form.reset();
  }


const validationForm = {
    formSelector: ".modal__profile",
    inputSelector: ".modal__text-input",
    submitButtonSelector: ".modal__form-submit",
    inactiveButtonClass: "modal__form-submit_disabled",
    inputErrorClass: ".modal__text-input_type_error",
    errorClass: "modal__input-error_active"
};

enableValidation(validationForm);