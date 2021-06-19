class Section {
    constructor({ renderer }, container) {
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    renderer(cards) {
        cards.forEach((item) => this._renderer(item));
    }
    addItem(cardElement) {
        this._container.prepend(cardElement);
    }
}


export default Section;