import { escKey } from "./utils";

export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('modal_open');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('modal_open');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(e) {
        if(e.which == escKey) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', (e) => {
            if(e.target.classList.contains('modal__close-button') || e.target.classList.contains('modal_open')){
                this.close();
            }
        })     
    }
};



