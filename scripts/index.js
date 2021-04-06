// Modal 
const openModal = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close-button');


// Modal Inputs
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

function openPopup(event) {
    console.log(modal);
    modal.className = 'modal__open';
    popup.className = 'popup__open';
    profileFormNameInput.value = profileName.textContent;
    profileFormOccupationInput.value = profileOccupation.textContent;
    return;
}

openModal.addEventListener('click',openPopup);

function closePopup(event) {
    modal.className = 'modal';
    popup.className = 'popup';
    return;
}

closeModal.addEventListener('click',closePopup);

function submitInfo(event) {
    profileName.textContent = profileFormNameInput.value;
    profileOccupation.textContent = profileFormOccupationInput.value;
    modal.className = 'modal';
    popup.className = 'popup';
    event.preventDefault();
    return;
}

profileForm.addEventListener('submit',submitInfo);