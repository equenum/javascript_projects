'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', ShowModal);
}

btnCloseModal.addEventListener('click', HideModal);
overlay.addEventListener('click', HideModal);
document.addEventListener('keydown', CloseModalEsc);

function CloseModalEsc(event) {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        HideModal();
    }
}

function ShowModal() {
    ClassListRemove(modal, 'hidden');
    ClassListRemove(overlay, 'hidden');
}

function HideModal() {
    ClassListAdd(modal, 'hidden');
    ClassListAdd(overlay, 'hidden');
}

function ClassListRemove(htmlElement, targetClassOrClasses) {
    htmlElement.classList.remove(targetClassOrClasses);
}

function ClassListAdd(htmlElement, targetClassOrClasses) {
    htmlElement.classList.add(targetClassOrClasses);
}