export default class Card {
    constructor({data, handleCardClick, handleDeleteClick, likeHandler},userId, template) {
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._userId = userId;
        this._likes = data.likes;

        this._template = template;
        this._id = data._id;
        
        this._handleDeleteClick = handleDeleteClick

        this._handleCardClick = handleCardClick;

        this._likeHandler = likeHandler
    }

    id() {
        return this._id;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    isLiked(){
        return this._likes.some(item => item._id === this._userId);
    }

    showLikes(){
        this._cardLikes.textContent = this._likes.length;
        if (this.isLiked()) {
            this._likeButton.classList.add('element__button_active');
        } else {
            this._likeButton.classList.remove('element__button_active');
        }
    }

    updateLikes(likes) {
        this._likes = likes;
        this.showLikes();
    }

    _showDeleteIcon(){ 
        if(this._owner._id === this._userId){ 
            this._cardTrash.classList.add('element__delete-button_active'); 
        } 
    }

    _setEventListeners() {
        this._element.querySelector('.element__button').addEventListener('click', () => this._likeHandler(this, this._id));
        this._element.querySelector('.element__delete-button').addEventListener('click', () => this._handleDeleteClick([this._id, this._element]));
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

        this._cardLikes = this._element.querySelector('.element__likes');
        this._likeButton = this._element.querySelector('.element__button');

        this._showDeleteIcon();
        this.showLikes();


        return this._element;
    }
}