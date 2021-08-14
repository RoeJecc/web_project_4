import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirm extends PopupWithForm {
    constructor({popupSelector, popupSubmit}){
        super({popupSelector, popupSubmit});
        
    }

    open(cardInfo){
        super.open();
        this._info = cardInfo;
    }

}