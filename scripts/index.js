// Imports
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";


// Declarations
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

const openModal = document.querySelector('.profile__edit-button');
const openAddModal = document.querySelector('.profile__add-button');
const modal = document.querySelector('.modal_type_profile');
const addModal = document.querySelector('.modal_type_add-card');

const closeModal = document.querySelector('.modal__close-button_profile');
const closeAddModal = document.querySelector('.modal__close-button_add-card');
const closePreviewModal = document.querySelector('.modal__close-button_preview');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const ESC_KEYCODE = 27;
const elementsBlock = document.querySelector('.elements');

const profileForm = document.forms.profile;
const cardForm = document.forms.card;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

const validationForm = {
  formSelector: ".modal__profile",
  inputSelector: ".modal__text-input",
  submitButtonSelector: ".modal__form-submit",
  inactiveButtonClass: "modal__form-submit_disabled",
  inputErrorClass: ".modal__text-input_type_error",
  errorClass: "modal__input-error_active"
};

const editFormValidator = new FormValidator(validationForm, modal);
const cardFormValidator = new FormValidator(validationForm, addModal);


editFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Functions



function profileValues() {
  profileFormNameInput.value = profileName.textContent;
  profileFormOccupationInput.value = profileOccupation.textContent;
}

function submitInfo(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileOccupation.textContent = profileFormOccupationInput.value;
  closeModalWindow(modal);
}

function renderCard(data) {
  const newCard = new Card(data, "#card-template");
  return newCard.generateCard();
}
initialCards.forEach((item) => {
  const cardElement = renderCard(item);
  elementsBlock.append(cardElement);
});

function handleAddCardSubmit(e) {
  e.preventDefault();

  const cardData = {
    name: newCardTitle.value,
    link: newCardURL.value
  }

  const cardElement = renderCard(cardData);
  elementsBlock.prepend(cardElement);

  closeModalWindow(addModal);
};

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


// Event Handlers

openModal.addEventListener('click', () => openModalWindow(modal), profileValues());

openAddModal.addEventListener('click', () => openModalWindow(addModal));

closeModal.addEventListener('click', () => closeModalWindow(modal));

closeAddModal.addEventListener('click', () => closeModalWindow(addModal));

closePreviewModal.addEventListener('click', () => closeModalWindow(previewModal));

profileForm.addEventListener('submit', submitInfo);

cardForm.addEventListener('submit', handleAddCardSubmit);


// Exports

export { isEscEvent, handleEscUp, openModalWindow, closeModalWindow, };