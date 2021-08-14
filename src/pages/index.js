// Imports

import "../styles/index.css"; // add import of the main stylesheets file
import {
  deleteModal,
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
  avatarModal,
  avatarForm,
  loadingModal
} from "../components/utils.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

// Visual Components
import vectorImg from "../images/Vector.svg";

const vectorImage = document.getElementById("vector-image");
vectorImage.src = vectorImg;

// Declare API
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


// Form Validation
const editFormValidator = new FormValidator(validationForm, editProfileModal);
const cardFormValidator = new FormValidator(validationForm, addModalPopup);
const avatarFormValidator = new FormValidator(validationForm, avatarForm);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
  name: ".profile__name",
  link: ".profile__occupation",
  avatar: ".profile__avatar",
});



// Edit Profile Popup

function handleEditButton({name, link}){
  loadingModal(true, editPopup)
  api.setUserInfo({ name: name, about: link })
  .then(res => {
    profileName.textContent = res.name;
    profileOccupation.textContent = res.about;
    
    editPopup.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    loadingModal(false, editPopup);
  })
}

const editPopup = new PopupWithForm({
  popupSelector: ".modal_type_profile",
  popupSubmit: ({ name , link }) => {
    handleEditButton({ name , link });
  },
});

editPopup.setEventListeners();

openEditProfileModal.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileFormNameInput.value = userData[0];
  profileFormOccupationInput.value = userData[1];
  editPopup.open();
});



// Preview Image Popup
const imagePopup = new PopupWithImage(".modal_type_preview");
imagePopup.setEventListeners();

function renderCard(data) {
  const card = new Card(
    {
      data,
      handleCardClick: ({ name, link }) => {
        imagePopup.open({ name, link });
      },
      handleDeleteClick: (cardInfo) => {
        deletePopup.open(cardInfo);
      },
      likeHandler: (cardElement, cardID) => {
        cardLikeCounter(cardElement, cardID);
      },
    },
    userId,
    "#card-template"
  );
  return card.generateCard();
}


// Card Likes
function cardLikeCounter(cardElement, cardID) {
  if (cardElement.isLiked()) {
    api
      .removeLike(cardID)
      .then((res) => {
        cardElement.updateLikes(res.likes);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(cardID)
      .then((res) => {
        cardElement.updateLikes(res.likes);
      })
      .catch((err) => console.log(err));
  }
}


// Set User Info
api.getAppInfo().then(([userData, cardListDetail]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
  cardSection.renderer(cardListDetail);

  
  
});


//Add Card Popup
const addCardPopup = new PopupWithForm({
  popupSelector: ".modal_type_add-card",
  popupSubmit: (data) => {
    api.addCard(data)
    .then((res) => {
      const newCard = renderCard(res);
      cardSection.addItem(newCard);
    }) .catch(err => console.log(err));
  },
});
addCardPopup.setEventListeners();
addModal.addEventListener("click", () => {
  cardFormValidator.disableButton();
  addCardPopup.open();
});


//Avatar Popup
const avatarPopup = new PopupWithForm({
  popupSelector: ".modal_type_avatar",
  popupSubmit: ({ name: avatar }) => {
    handleAvatar(avatar)
  },
});
avatarPopup.setEventListeners();

avatarModal.addEventListener("click", () => {
  avatarFormValidator.disableButton();
  avatarPopup.open();
  
});


let userId;


// Avatar Popup Handler
function handleAvatar(avatar){
  event.preventDefault();
  loadingModal(true, profileAvatar);

  api.setUserAvatar(avatar)
  .then(res => {
    profileAvatar.src = res.avatar;
    avatarPopup.close();
  })
  .finally(() => {
    loadingModal(false, profileAvatar);
  })
}


// Delete Card Popup
const deletePopup = new PopupWithConfirm({
  popupSelector: ".modal_type_delete-card",
  popupSubmit: ([ cardID , element ]) => {
    event.preventDefault();
    loadingModal(true, deleteModal);
    
    api.removeCard(cardID).then(() => {
      deletePopup.close();
      element.remove();
    })
    .catch(err => console.log(err))
    .finally(() => {
      loadingModal(false, deleteModal);
    })
  }
})
deletePopup.setEventListeners();

