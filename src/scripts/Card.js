export default class Card {
    constructor({data, handleCardClick, handleDeleteClick},userId, template) {
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._userId = userId;

        this._template = template;
        this._id = data._id;
        
        this._handleDeleteClick = handleDeleteClick

        this._handleCardClick = handleCardClick;
    }

    id() {
        return this._id;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    _toggleLikeButton() {
        this._element.querySelector(".element__button").classList.toggle('element__button_active');
    }

    _showDeleteIcon(){ 
        if(this._owner._id === this._userId){ 
            this._cardTrash.classList.add('element__delete-button_active'); 
        } 
    }

    _handleDeleteClick() {
        e.preventDefault();
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.element__button').addEventListener('click', () => this._toggleLikeButton());
        this._element.querySelector('.element__delete-button').addEventListener('click', () => this._handleDeleteClick(this.id()));
        this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._cardTrash = this._element.querySelector('.element__delete-button');

        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.id = this._id;

        this._showDeleteIcon();

        return this._element;
    }
}