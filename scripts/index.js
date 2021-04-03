const openModal = document.querySelector('.profile__edit-button');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close-button');
var activeLike = document.querySelector('.element__button_active');


openModal.addEventListener('click', function (event) {
    modal.style.display = 'flex';
    overlay.style.display = 'block';
});

closeModal.addEventListener('click', function (event){
    modal.style.display = 'none';
    overlay.style.display = 'none';
});


activeLike.addEventListener('click', function (event) {
    if (activeLike.style.fill === 'none') {
        activeLike.style.fill = 'black';
    } else if (activeLike.style.fill ='black') {
        activeLike.style.fill = 'none';
    }
});
