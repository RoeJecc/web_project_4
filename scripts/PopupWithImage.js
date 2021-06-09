import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, caption) {
        this._popupElement.querySelector('.modal__image').src = link;
        this._popupElement.querySelector('.modal__image-caption').src = caption;
        super.open();
    }
}

export default PopupWithImage;