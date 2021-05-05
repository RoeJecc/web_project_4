// Declarations
const ESC_KEYCODE = 27;
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
const previewImage = previewModal.querySelector('.modal__image');
const imageTitle = document.querySelector('.modal__image-caption');
const elementsBlock = document.querySelector('.elements');
const createCard = document.querySelector('.modal__form-submit_create');
const addCardPopupForm = document.querySelector('.modal__profile');
const cardTitleSubmitted = document.querySelector('.modal__text-input_type_title');
const cardURLSubmitted = document.querySelector('.modal__text-input_type_url');


const profileForm = document.forms.profile;
const cardForm = document.forms.card;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

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

  likeButton.addEventListener('click', () => toggleLikeButton(likeButton));

  return cardElement;
}

function renderCard(card, wrapper) {
  wrapper.append(createCardElement(card));
}

const onImagePreview = card => {
  previewImage.src = card.link;
  imageTitle.textContent = card.name;
  openModalWindow(previewModal);
}

const onDeleteButtonClick = cardElement => {
  elementsBlock.removeChild(cardElement);
}

function addCardBeginning(card, wrapper) {
  wrapper.prepend(createCardElement(card));
}

function toggleLikeButton(cardElement) {
  cardElement.classList.toggle('element__button_active');
};

function handleAddCardSubmit(e) {
  e.preventDefault();

  const newCardTitle = e.target[0].value;
  const newCardURL = e.target[1].value;
  const newCardObject = {
    name: newCardTitle,
    link: newCardURL
  };
  addCardBeginning(newCardObject, elementsBlock);
  closeModalWindow(addModal);
}

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

initialCards.forEach(card => renderCard(card, elementsBlock));