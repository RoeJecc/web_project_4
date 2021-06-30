const validationForm = {
  formSelector: ".modal__profile",
  inputSelector: ".modal__text-input",
  submitButtonSelector: ".modal__form-submit",
  inactiveButtonClass: "modal__form-submit_disabled",
  inputErrorClass: ".modal__text-input_type_error",
  errorClass: "modal__input-error_active",
};

// Declarations
const openEditProfileModal = document.querySelector(".profile__edit-button");
const addModal = document.querySelector(".profile__add-button");
const editProfileModal = document.querySelector(".modal_type_profile");
const addModalPopup = document.querySelector(".modal_type_add-card");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;
const escKey = 27;
const previewModal = document.querySelector(".modal_type_preview");
const previewImage = document.querySelector(".modal__image");
const profileAvatar = document.querySelector(".profile__avatar");

// Exports

export {
  profileAvatar,
  openEditProfileModal,
  addModal,
  editProfileModal,
  addModalPopup,
  profileName,
  profileOccupation,
  profileForm,
  profileFormNameInput,
  profileFormOccupationInput,
  validationForm,
  previewModal,
  previewImage,
  escKey
}