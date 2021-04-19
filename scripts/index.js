
// Cards

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


// Declarations
const openModal = document.querySelector('.profile__edit-button');
const openAddModal = document.querySelector('.profile__add-button');
const modal = document.querySelector('.modal_type_profile');
const addModal = document.querySelector('.modal_type_add-card');
const previewModal = document.querySelector('.modal_type_preview');
const closeModal = document.querySelector('.modal__close-button_profile');
const closeAddModal = document.querySelector('.modal__close-button_add-card');
const closePreviewModal = document.querySelector('.modal__close-button_preview');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const imageTitle = document.querySelector('.modal__image-caption');
const elementsBlock = document.querySelector('.elements');
const createCard = document.querySelector('.modal__form-submit_create');

const addCardPopupForm = document.querySelector('.modal__profile');

const profileForm = document.forms.profile;
const cardForm = document.forms.card;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

// Functions

function togglePopup(Popup) {
  if (!Popup.classList.contains('modal_open')){
    profileFormNameInput.value = profileName.textContent;
    profileFormOccupationInput.value = profileOccupation.textContent;
}
    Popup.classList.toggle('modal_open');
    return;
}

function submitInfo(event) {
    event.preventDefault(modal);
    profileName.textContent = profileFormNameInput.value;
    profileOccupation.textContent = profileFormOccupationInput.value;
    togglePopup(modal);
}

function createCardElement(card) {
    const cardTemplate = document.querySelector("#card-template").content.querySelector('.element');
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__text');
    const deleteButton = cardElement.querySelector('.element__delete-button');
    const likeButton = cardElement.querySelector('.element__button');

    cardImage.style.backgroundImage = `url(${card.link})`;
    cardTitle.textContent = card.name;

    cardImage.addEventListener('click', () => onImagePreview(card));

    deleteButton.addEventListener('click', () => onDeleteButtonClick(cardElement));

    return cardElement;
}

function renderCard(card, wrapper) {
    wrapper.append(createCardElement(card));
}

const onImagePreview = card => {
    const previewImage = previewModal.querySelector('.modal__image');
    previewImage.src = card.link;
    imageTitle.textContent = card.name;
    togglePopup(previewModal);
}

const onDeleteButtonClick = cardElement => {
    elementsBlock.removeChild(cardElement);
}

function addCardBeginning(card, wrapper) {
  wrapper.prepend(createCardElement(card));
}

// Hearts
function toggleClass( element ) {
  const classe = 'element__button element__button_inactive';
  if ( element.className == classe ){
      element.className = classe.replace('element__button_inactive', 'element__button_active');
  } else {
      element.className = classe;
  }
};

const cardTitleSubmitted = document.querySelector(".modal__text-input_type_title");
const cardURLSubmitted = document.querySelector(".modal__text-input_type_url");


function handleAddCardSubmit(e) { 
  e.preventDefault();

  const newCardTitle = e.target[0].value;
  const newCardURL = e.target[1].value;
  const newCardObject = {
    name: newCardTitle,
    link: newCardURL
  };
  addCardBeginning(newCardObject, elementsBlock);
  togglePopup(addModal);
}

// Event Handlers

openModal.addEventListener('click', () => togglePopup(modal));

openAddModal.addEventListener('click', () => togglePopup(addModal));

closeModal.addEventListener('click', () => togglePopup(modal));

closeAddModal.addEventListener('click', () => togglePopup(addModal));

closePreviewModal.addEventListener('click', () => togglePopup(previewModal));

profileForm.addEventListener('submit',submitInfo);

cardForm.addEventListener('submit', handleAddCardSubmit);

initialCards.forEach(card => renderCard(card, elementsBlock));