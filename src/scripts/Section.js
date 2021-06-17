class Section {
    constructor({ items, renderer }, container) {
        this._initialCards = items;
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    renderer() {
        this._initialCards.forEach((item) => this._renderer(item));
    }
    addItem(cardElement) {
        this._container.prepend(cardElement);
    }
    prepend(cardElement) {
        this._container.prepend(cardElement);
    }
}


export default Section;