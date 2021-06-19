export default class Card {
    constructor({data, handleCardClick}, template) {
        this._name = data.name;
        this._link = data.link;

        this._template = template;

        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    _toggleLikeButton() {
        this._element.querySelector(".element__button").classList.toggle('element__button_active');
    }

    _onDeleteButtonClick() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.element__button').addEventListener('click', () => this._toggleLikeButton());
        this._element.querySelector('.element__delete-button').addEventListener('click', () => this._onDeleteButtonClick());
        this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;

        return this._element;
    }
}