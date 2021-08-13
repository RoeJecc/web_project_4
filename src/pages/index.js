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
  avatarForm
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
    loadingModal(false, editPopup);
    editPopup.close();
  })
  .catch(err => console.log(err))
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
  let ourCard = new Card(
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
  return ourCard.generateCard();
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


// Add Card and Avatar Popup
api.getAppInfo().then(([userData, cardListDetail]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
  cardSection.renderer(cardListDetail);

  const addCardPopup = new PopupWithForm({
    popupSelector: ".modal_type_add-card",
    popupSubmit: (data) => {
      api.addCard(data).then((res) => {
        const newCard = renderCard(res);
        cardSection.addItem(newCard);
      });
    },
  });
  addCardPopup.setEventListeners();
  addModal.addEventListener("click", () => {
    cardFormValidator.disableButton();
    addCardPopup.open();
  });

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
  
});




let userId;


// Avatar Popup Handler
function handleAvatar(avatar){
  event.preventDefault();
  loadingModal(true, profileAvatar);

  api.setUserAvatar(avatar)
  .then(res => {
    profileAvatar.src = res.avatar;
    loadingModal(false, profileAvatar);
    avatarPopup.close();
  })
  .catch(err => console.log(err));
}


// Delete Card Popup
const deletePopup = new PopupWithForm({
  popupSelector: ".modal_type_delete-card",
  popupSubmit: ([ cardID , element ]) => {
    event.preventDefault();
    loadingModal(true, deleteModal);
    
    api.removeCard(cardID).then(() => {
      
      loadingModal(false, deleteModal);
      deletePopup.close();
      element.remove();
      
    })
    .catch(err => console.log(err));
  }
})
deletePopup.setEventListeners();

// Loading UI
function loadingModal(isLoading, modal){
  if(isLoading) {
    document.querySelector('.modal__form-submit').textContent = "Saving...";
  } else {
    document.querySelector('.modal__form-submit').textContent = "Save";
  }
}