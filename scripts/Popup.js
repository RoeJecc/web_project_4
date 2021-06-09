class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('.modal_open');
        document.addEventListener('keyup', this._handleEscUp);
    }

    close() {
        this._popupElement.classList.remove('.modal_open');
        document.removeEventListener('keyup', this._handleEscUp);
    }

    _handleEscClose(e) {
        if(e.which == 27) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', (e) =>{
            if(e.target.classList.contains('.modal__close-button') || !e.target.closest('.modal__container')){
                this.close();
            }
        })     
    }

}

export default Popup;

// const editPopup = new PopupWithForm('.modal_type_profile');
// editPopup.setEventListeners()
// const addCardPopup = new PopupWithForm('.modal_type_add-card');
// addCardPopup.setEventListeners()
// const imagePopup = new PopupWithImage('.modal_type_preview');
// imagePopup.setEventListeners()

