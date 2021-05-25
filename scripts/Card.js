import {isEscEvent, handleEscUp, openModalWindow, closeModalWindow,} from "./index.js";

const previewImage = document.querySelector('.modal__image');
const imageTitle = document.querySelector('.modal__image-caption');
const previewModal = document.querySelector('.modal_type_preview');
const ESC_KEYCODE = 27;

class Card {
    constructor(data, template) {
        this._text = data.name;
        this._link = data.link;

        this._template = template;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);

        return cardElement;
    };

    _toggleLikeButton() {
        const likeButton = this._element.querySelector(".element__button")
        likeButton.classList.toggle('element__button_active');
    };

    _onDeleteButtonClick() {
        const deleteButton = this._element.querySelector(".element__delete-button");
        deleteButton.closest(".element").remove();
    }

    _onImagePreview() {
        previewImage.src = this._link;
        imageTitle.textContent = this._text;
        openModalWindow(previewModal);
    }

    _setEventListeners() {
        this._element.querySelector('.element__button').addEventListener('click', () => this._toggleLikeButton());
        this._element.querySelector('.element__delete-button').addEventListener('click', () => this._onDeleteButtonClick());
        this._element.querySelector('.element__image').addEventListener('click', () => this._onImagePreview());
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__text').textContent = this._text;
        this._element.querySelector('.element__image').src = this._link;

        return this._element;
    }
}

export default Card;