// Class
export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._element = formElement;

    this._inputs = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );
    this._button = this._element.querySelector(this._submitButtonSelector);
  }

  _showErrorMessage(input) {
    const error = this._element.querySelector("#" + input.id + "-error");

    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideErrorMessage(input) {
    const error = this._element.querySelector("#" + input.id + "-error");

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

  _toggleButtonState() {
    const isValid = this._inputs.every((input) => !input.validity.valid);

    if (isValid) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  disableButton(){
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  _setEventListeners = () => {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input, this._inputErrorClass);
        this._toggleButtonState(this._element, this._inputSelector);
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
