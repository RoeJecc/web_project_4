// Imports
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {openModalWindow, closeModalWindow, initialCards, validationForm} from "./utils.js";


// Declarations

const openEditProfileModal = document.querySelector('.profile__edit-button');
const openAddModal = document.querySelector('.profile__add-button');
const editProfileModal = document.querySelector('.modal_type_profile');
const addModal = document.querySelector('.modal_type_add-card');

const closeEditProfileModal = document.querySelector('.modal__close-button_profile');
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


const editFormValidator = new FormValidator(validationForm, editProfileModal);
const cardFormValidator = new FormValidator(validationForm, addModal);


editFormValidator.enableValidation();
cardFormValidator.enableValidation();


// Functions

function fillEditProfileInputs() {
  profileFormNameInput.value = profileName.textContent;
  profileFormOccupationInput.value = profileOccupation.textContent;
}

function submitInfo(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileOccupation.textContent = profileFormOccupationInput.value;
  closeModalWindow(editProfileModal);
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


// Event Handlers

openEditProfileModal.addEventListener('click', () => openModalWindow(editProfileModal), fillEditProfileInputs());

openAddModal.addEventListener('click', () => openModalWindow(addModal));

closeEditProfileModal.addEventListener('click', () => closeModalWindow(editProfileModal));

closeAddModal.addEventListener('click', () => closeModalWindow(addModal));

closePreviewModal.addEventListener('click', () => closeModalWindow(previewModal));

profileForm.addEventListener('submit', submitInfo);

cardForm.addEventListener('submit', handleAddCardSubmit);