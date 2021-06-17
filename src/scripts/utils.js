import vectorImg from "../images/Vector.svg";
import cousteauImg from "../images/cousteau.jpg";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const validationForm = {
  formSelector: ".modal__profile",
  inputSelector: ".modal__text-input",
  submitButtonSelector: ".modal__form-submit",
  inactiveButtonClass: "modal__form-submit_disabled",
  inputErrorClass: ".modal__text-input_type_error",
  errorClass: "modal__input-error_active",
};

const previewModal = document.querySelector(".modal_type_preview");
const previewImage = document.querySelector(".modal__image");

// Functions

const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector(".modal_open");

  if (evt.which === ESC_KEYCODE) {
    action(activePopup);
  }
};

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModalWindow);
};

const openModalWindow = (popup) => {
  popup.classList.add("modal_open");
  document.addEventListener("keyup", handleEscUp);
  document.addEventListener("click", clickOut);
};

const closeModalWindow = (popup) => {
  popup.classList.remove("modal_open");
  document.removeEventListener("keyup", handleEscUp);
  document.removeEventListener("click", clickOut);
};

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

// Exports

export {
  openEditProfileModal,
  addModal,
  editProfileModal,
  addModalPopup,
  profileName,
  profileOccupation,
  profileForm,
  profileFormNameInput,
  profileFormOccupationInput,
  isEscEvent,
  handleEscUp,
  openModalWindow,
  closeModalWindow,
  initialCards,
  validationForm,
  previewModal,
  previewImage,
};
