// Imports

import "../styles/index.css"; // add import of the main stylesheets file
import {
  prifileAvatar,
  openEditProfileModal,
  addModal,
  editProfileModal,
  addModalPopup,
  profileName,
  profileOccupation,
  profileFormNameInput,
  profileFormOccupationInput,
  validationForm,
  profileAvatar,
} from "../scripts/utils.js";
import Card from "../scripts/Card.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import FormValidator from "../scripts/FormValidator.js";
import Api from "../scripts/Api.js";

// Visual Components
import vectorImg from "../images/Vector.svg";
import cousteauImg from "../images/cousteau.jpg";

const vectorImage = document.getElementById("vector-image");
vectorImage.src = vectorImg;

const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "f3cf689f-e903-4b5b-9d77-2b0b4048d455",
    "Content-Type": "application/json",
  },
});

const cardSection = new Section(
  {
    renderer: renderCard,
  },
  ".elements"
);

api.getUserInfo().then((res) => {
  userInfo.setUserInfo({ name: res.name, link: res.about, avatar: res.avatar });

  const cousteauImage = document.getElementById("cousteau-image");
  cousteauImage.src = res.avatar;
});

// Form Validation
const editFormValidator = new FormValidator(validationForm, editProfileModal);
const cardFormValidator = new FormValidator(validationForm, addModalPopup);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileOccupation,
  avatarSelector: profileAvatar,
});

// Submit Forms
// function submitInfo(event) {
//   event.preventDefault();
//   profileName.textContent = profileFormNameInput.value;
//   profileOccupation.textContent = profileFormOccupationInput.value;
//   closeModalWindow(editProfileModal);
// }
// profileForm.addEventListener("submit", submitInfo);

// Edit Profile Popup
const editPopup = new PopupWithForm({
  popupSelector: ".modal_type_profile",
  popupSubmit: (data) => {
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

// Section

// Preview Image Popup
const imagePopup = new PopupWithImage(".modal_type_preview");
imagePopup.setEventListeners();

function renderCard(data) {
  let ourCard = new Card(
    {
      data,
      handleCardClick: ({ name, link }) => {
        imagePopup.open({ name, link });
      },
      handleDeleteClick: (data) => {
        api.removeCard(data).then(() => {
          newCard.onDeleteButtonClick(data);
        });
      },
    },
    userId,
    "#card-template"
  )
  return ourCard.generateCard()
}

api.getAppInfo().then(([userData, cardListDetail]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
  cardSection.renderer(cardListDetail);

  const addCardPopup = new PopupWithForm({
    popupSelector: ".modal_type_add-card",
    popupSubmit: (data) => {
      api.addCard(data).then((res) => {
        const cardElement = renderCard(res);
        cardSection.addItem(cardElement);
      });
    },
  });
  addCardPopup.setEventListeners();
  addModal.addEventListener("click", () => {
    addCardPopup.open();
  });
});

let userId;