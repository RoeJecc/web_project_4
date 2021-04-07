// Modal 
const openModal = document.querySelector('.profile__edit-button');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close-button');


// Modal Inputs
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

function openPopup() {
    console.log(modal);
    modal.classList.add('modal_display_open');
    profileFormNameInput.value = profileName.textContent;
    profileFormOccupationInput.value = profileOccupation.textContent;
    return;
}

openModal.addEventListener('click',openPopup);

function closePopup() {
    modal.classList.remove('modal_display_open');
    return;
}

closeModal.addEventListener('click',closePopup);

function submitInfo(event) {
    profileName.textContent = profileFormNameInput.value;
    profileOccupation.textContent = profileFormOccupationInput.value;
    closePopup();
    event.preventDefault();
    return;
}

profileForm.addEventListener('submit',submitInfo);