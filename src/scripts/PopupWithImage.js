import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupElement.querySelector(".modal__image");
        this._name = this._popupElement.querySelector(".modal__image-caption");
    }

    open({name, link}) {
        this._image.src = link
        this._image.alt = name
        this._name.textContent = name
        super.open();
    }
}