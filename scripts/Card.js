// Imports
import {isEscEvent, handleEscUp, openModalWindow, closeModalWindow,} from "./utils.js";

const previewImage = document.querySelector('.modal__image');
const imageTitle = document.querySelector('.modal__image-caption');
const previewModal = document.querySelector('.modal_type_preview');


// Class
class Card {
    constructor({data, handleCardClick}, template) {
        this._text = data.name;
        this._link = data.link;

        this._template = template;

        this._handleCardClick = handleCardClick;
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
        previewImage.alt = this._text;
        openModalWindow(previewModal);
    }

    _setEventListeners() {
        this._element.querySelector('.element__button').addEventListener('click', () => this._toggleLikeButton());
        this._element.querySelector('.element__delete-button').addEventListener('click', () => this._onDeleteButtonClick());
        this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this._text, this._link));
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__text').textContent = this._text;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._text;

        return this._element;
    }
}

// Exports
export default Card;

// const imageModal = new PopupWithImage('.modal_type_preview');
// imageModal.setEventListeners();

// new Card(
//     {
//         data: cardValues,
//         handleCardClick: (text, link) => {
//             imageModal.open(text, link)
//         }}, template);
