// Class
class FormValidator {
    constructor(config, formElement) {

        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._element = formElement;

    }

    _showErrorMessage(input) {
        const error = this._element.querySelector('#' + input.id + '-error');

        error.textContent = input.validationMessage;
        error.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);

    }

    _hideErrorMessage(input) {
        const error = this._element.querySelector('#' + input.id + '-error');

        error.textContent = "";
        error.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showErrorMessage(input, input.validationMessage);
        } else {
            this._hideErrorMessage(input);
        }
    }

    _hasInvalidInput = (inputs) => {
        return inputs.some((input) => {
            return !input.validity.valid;
        });
    };

    _toggleButtonState(inputs, button) {
        if (this._hasInvalidInput(inputs)) {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        } else {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        }
    }

    _setEventListeners = () => {
        const inputs = Array.from(this._element.querySelectorAll(this._inputSelector));
        const button = this._element.querySelector(this._submitButtonSelector);

        this._toggleButtonState(inputs, button);

        this._element.addEventListener("reset", () => {
            inputs.forEach((input) => {
                this._hideErrorMessage(input);
            });
            button.disabled = true;
            button.classList.add(this._inactiveButtonClass);
        })

        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState(inputs, button);
            });
        });
    };

    enableValidation() {
        this._element.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        this._setEventListeners();
    }
}

// Exports
export default FormValidator;