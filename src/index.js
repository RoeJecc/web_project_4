// Imports

import "./styles/index.css"; // add import of the main stylesheets file
import {
  closeModalWindow,
  initialCards,
  validationForm,
} from "./scripts/utils.js";
import Card from "./scripts/Card.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import vectorImg from "./images/Vector.svg";
import cousteauImg from "./images/cousteau.jpg";
import FormValidator from "./scripts/FormValidator.js";

// Declarations
const openEditProfileModal = document.querySelector(".profile__edit-button");
const addModal = document.querySelector(".profile__add-button");
const editProfileModal = document.querySelector(".modal_type_profile");
const addModalPopup = document.querySelector(".modal_type_add-card");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const vectorImage = document.getElementById("vector-image");
vectorImage.src = vectorImg;
const cousteauImage = document.getElementById("cousteau-image");
cousteauImage.src = cousteauImg;
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

// Form Validation
const editFormValidator = new FormValidator(validationForm, editProfileModal);
const cardFormValidator = new FormValidator(validationForm, addModalPopup);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileOccupation,
});

// Submit Forms
function submitInfo(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileOccupation.textContent = profileFormOccupationInput.value;
  closeModalWindow(editProfileModal);
}
profileForm.addEventListener("submit", submitInfo);


// Edit Profile Popup
const editPopup = new PopupWithForm({
  popupSelector: ".modal_type_profile",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

editPopup.setEventListeners();

openEditProfileModal.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileFormNameInput.value = userData[0];
  profileFormOccupationInput.value = userData[1];
  editPopup.open();
});


// Add Card Popup
const addCardPopup = new PopupWithForm({
  popupSelector: ".modal_type_add-card",
  popupSubmit: (data) => {
    const cardElement = renderCard(data);
    cardSection.addItem(cardElement);
  },
});
addCardPopup.setEventListeners();
addModal.addEventListener("click", () => {
  addCardPopup.open();
});

// Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = renderCard(data);
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

cardSection.renderer();

// Preview Image Popup
const imagePopup = new PopupWithImage(".modal_type_preview");
imagePopup.setEventListeners();


// const imageModal = new PopupWithImage('.modal_type_preview');
// imageModal.setEventListeners();

function renderCard(data) {
  const newCard = new Card(
    {
      data,
      handleCardClick: ({ name, link }) => {
        imagePopup.open({ name, link });
      },
    },
    "#card-template"
  );
  return newCard.generateCard();
}