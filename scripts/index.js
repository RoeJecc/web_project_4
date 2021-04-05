// Modal 
const openModal = document.querySelector('.profile__edit-button');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close-button');

// Modal Inputs
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

openModal.addEventListener('click', function (event) {
    modal.style.display = 'flex';
    overlay.style.display = 'block';
    profileFormNameInput.value = profileName.textContent;
    profileFormOccupationInput.value = profileOccupation.textContent;
});

closeModal.addEventListener('click', function (event){
    modal.style.display = 'none';
    overlay.style.display = 'none';
});




profileForm.addEventListener('submit', function (event) {
    profileName.textContent = profileFormNameInput.value;
    profileOccupation.textContent = profileFormOccupationInput.value;
    modal.style.display = 'none';
    overlay.style.display = 'none';
    event.preventDefault();
});













// Hearts
var activeLike = document.querySelector('.element__button_active');

activeLike.addEventListener('click', function (event) {
    if (activeLike.style.fill === 'none') {
        activeLike.style.fill = 'black';
    } else if (activeLike.style.fill ='black') {
        activeLike.style.fill = 'none';
    } return;
});
