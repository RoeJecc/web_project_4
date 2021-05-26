const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

const validationForm = {
    formSelector: ".modal__profile",
    inputSelector: ".modal__text-input",
    submitButtonSelector: ".modal__form-submit",
    inactiveButtonClass: "modal__form-submit_disabled",
    inputErrorClass: ".modal__text-input_type_error",
    errorClass: "modal__input-error_active"
};

// Functions

const isEscEvent = (evt, action) => {
    const activePopup = document.querySelector('.modal_open');

    if (evt.which === ESC_KEYCODE) {
        action(activePopup);
    }
};

const handleEscUp = evt => {
    evt.preventDefault();
    isEscEvent(evt, closeModalWindow);
};

const openModalWindow = popup => {
    popup.classList.add('modal_open');
    document.addEventListener('keyup', handleEscUp);
    document.addEventListener('click', clickOut);
};

const closeModalWindow = popup => {
    popup.classList.remove('modal_open');
    document.removeEventListener('keyup', handleEscUp);
    document.removeEventListener('click', clickOut);
};

function clickOut(e) {
    if (e.target.classList.contains("modal_open")) {
      closeModalWindow(e.target);
    }
  }

// Exports

export { clickOut, isEscEvent, handleEscUp, openModalWindow, closeModalWindow, initialCards, validationForm };