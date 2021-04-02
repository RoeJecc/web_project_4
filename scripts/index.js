const openModal = document.querySelector('.profile__edit-button');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close-button');
const activeLike = document.querySelector('.element__button');


openModal.addEventListener('click', function (event) {
    modal.style.display = 'flex';
    overlay.style.display = 'block';
});

closeModal.addEventListener('click', function (event){
    modal.style.display = 'none';
    overlay.style.display = 'none';
})


activeLike.addEventListener('click', function (event) {
    activeLike.style.fill = 'black';
})