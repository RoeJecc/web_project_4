import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, popupSubmit}) {
        super(popupSelector);
        this._popupSubmit = popupSubmit;
        this._formElement = this._popupElement.querySelector(".modal__profile");
        this._submitEventHandler = this._submitEventHandler.bind(this);
    }

    _getInputValues() {
        if(!this._popupElement.querySelector('.modal__text-input')) {
            return null
        } else {
            return [...this._popupElement.querySelectorAll('.modal__text-input')].map(input => input.value);
        }
    }

    _submitEventHandler(){
        
        const inputSubmitValue = this._getInputValues() || this._info;
        this._popupSubmit(inputSubmitValue);
        this.close();
    }

    setEventListeners() {
        this._popupElement.addEventListener('submit', this._submitEventHandler);
        super.setEventListeners();
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    
}