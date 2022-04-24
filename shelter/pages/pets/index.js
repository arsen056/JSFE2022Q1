const url = '../../assets/pets.json';

// Burger
const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__nav');
const logo = document.querySelector('.logo');
const bgBurger = document.querySelector('.background-burger');
const bodyShadow = document.querySelector('#body-shadow'); 

function toggleBurger() {
    if (window.matchMedia("(max-width: 767px)").matches) {
        document.body.classList.toggle('lock');
        document.body.classList.toggle('background-burger');
        burger.classList.toggle('burger-active');    
        nav.classList.toggle('nav-active');
        logo.classList.toggle('logo-active');
        bodyShadow.classList.toggle('body-shadow');
        document.querySelector('.header-pets').classList.toggle('header-bg');     
    }
}

function closeBurger(event) {    target = event.target;
    if (target.classList.contains('nav__link')) {
        toggleBurger();
    }    
}

document.addEventListener('click', e => {
    let target = e.target;
    let itsNav = target == nav || nav.contains(target);
    let itsBurger = target.closest('.burger') == burger;
    let isActive = nav.classList.contains('nav-active');
    let itsLogo = target.closest('.logo') == logo;
    if (!itsNav && !itsBurger && isActive && !itsLogo) {
        toggleBurger();
    }    
})

burger.addEventListener('click', toggleBurger);
nav.addEventListener('click', closeBurger);

// Pagination

const petsContainer = document.querySelector('.our-pets__container');
const pageNumber = document.querySelector('.button__pagination-number');
const NEXT_PAGE = document.querySelector('.next-page');
const LAST_PAGE = document.querySelector('.last-page');
const PREV_PAGE = document.querySelector('.prev-page');
const FIRST_PAGE = document.querySelector('.first-page');


let notesOnPage = 8;
let start = 0;
let end = 8;
let step = 8;
let pageCount = 6;
let pageNum = +pageNumber.innerHTML;
adaptiveCountCards();
const petsNumber = addPetsNumber(pageCount);

async function showPetsCard(start, end) {
    const url = '../../assets/pets.json';
    const res = await fetch(url);
    const data = await res.json();  

    let cards = petsNumber.slice(start, end)

    petsContainer.innerHTML = ``;
    pageNumber.innerHTML = pageNum;

    for (let i = 0; i < cards.length; i++) {
        petsContainer.innerHTML += `
                    <div class="pets__item" data-item="${data[cards[i]].name}">
                        <img class="pets__img" src="${data[cards[i]].img}" alt="${data[cards[i]].name}">
                        <h3 class="pets__name">${data[cards[i]].name}</h3>
                        <div class="button button__pets">Learn more</div>
                    </div>`
    }
}

showPetsCard(start, end);

NEXT_PAGE.addEventListener('click', forwardPage);
LAST_PAGE.addEventListener('click', moveLastPage);
FIRST_PAGE.addEventListener('click', moveFirstPage);

function forwardPage() { 
    start += step;
    end += step;
    pageNum++;
    showPetsCard(start, end);
    if (pageNum === pageCount) {
        NEXT_PAGE.classList.add('button__pagination_inactive');
        LAST_PAGE.classList.add('button__pagination_inactive');
        NEXT_PAGE.removeEventListener('click', forwardPage);
        LAST_PAGE.removeEventListener('click', moveLastPage);
    } else if (pageNum > 1) {
        PREV_PAGE.classList.remove('button__pagination_inactive');
        FIRST_PAGE.classList.remove('button__pagination_inactive');
        PREV_PAGE.addEventListener('click', backPage);
    }
}

function backPage() {
    start -= step;
    end -= step;
    pageNum--;
    
    showPetsCard(start, end);

    if (pageNum === 1) {
        PREV_PAGE.classList.add('button__pagination_inactive');
        FIRST_PAGE.classList.add('button__pagination_inactive');
        PREV_PAGE.removeEventListener('click', backPage);

        NEXT_PAGE.classList.remove('button__pagination_inactive');
        LAST_PAGE.classList.remove('button__pagination_inactive');
        NEXT_PAGE.addEventListener('click', forwardPage);
    } else if (pageNum < pageCount) {
        NEXT_PAGE.addEventListener('click', forwardPage); 
        NEXT_PAGE.classList.remove('button__pagination_inactive');
        LAST_PAGE.classList.remove('button__pagination_inactive');  
        LAST_PAGE.addEventListener('click', moveLastPage);
    }
}

function moveLastPage() {
    start = petsNumber.length - notesOnPage;    
    end = petsNumber.length ;
    pageNum = pageCount;
    showPetsCard(start, end);
    PREV_PAGE.classList.remove('button__pagination_inactive');
    FIRST_PAGE.classList.remove('button__pagination_inactive');
    PREV_PAGE.addEventListener('click', backPage);

    NEXT_PAGE.classList.add('button__pagination_inactive');
    LAST_PAGE.classList.add('button__pagination_inactive');
    NEXT_PAGE.removeEventListener('click', forwardPage);
}

function moveFirstPage() {
    start = 0;
    end = notesOnPage;
    pageNum = 1;
    showPetsCard(start, end);
    PREV_PAGE.classList.add('button__pagination_inactive');
    FIRST_PAGE.classList.add('button__pagination_inactive');
    PREV_PAGE.removeEventListener('click', backPage);

    NEXT_PAGE.classList.remove('button__pagination_inactive');
    LAST_PAGE.classList.remove('button__pagination_inactive');
    NEXT_PAGE.addEventListener('click', forwardPage);
}

function randomPets(slides) {    
    const numbers = [];
    let rand = 0;
    while (numbers.length < slides) {
        rand = Math.floor(Math.random() * 8);
        if (!numbers.includes(rand)) numbers.push(rand);
    }
    return numbers;
}

function addPetsNumber(pages) {
    const petsNumber = [];
    while (petsNumber.length < pages) {
        petsNumber.push(randomPets(notesOnPage));
    }
    return petsNumber.join(',').split(',');
}

function adaptiveCountCards() {
    if (window.matchMedia("(max-width: 991px)").matches) {
        start = 0;
        step = 6;
        end = 6;
        pageNum = 1;
        pageCount = 8;
        notesOnPage = 6;
    } 

    if (window.matchMedia("(max-width: 767px)").matches) {
        step = 3;
        end = 3;
        pageNum = 1;
        pageCount = 16;
        notesOnPage = 3;
    }
}

// Popup

const PETS_CONTAINER = document.querySelector('.our-pets__container');
const CLOSE_MODAL = document.querySelector('.close-modal');
const MODAL = document.querySelector('.modal');
const MODAL_WINDOW = document.querySelector('.modal__content');
const PET_NAME = document.querySelector('.pets__name');

PETS_CONTAINER.addEventListener('click', (event) => {
    let target = event.target.closest('.pets__item');
    MODAL.classList.add('modal-open');
    document.body.classList.add('lock');
    MODAL_WINDOW.classList.add('modal-transition');
    getDataModal(url, target.dataset.item);
})

CLOSE_MODAL.addEventListener('click', closeModal)
function closeModal() {
    MODAL.classList.remove('modal-open');
    document.body.classList.remove('lock');
}

async function getDataModal(url, name) {
    const res = await fetch(url);
    const data = await res.json();    

    const names = data.map(e => e.name);
    const modalImg = document.querySelector('.modal__img');
    const modalTitle = document.querySelector('.modal__title');
    const modalSubtitle = document.querySelector('.modal__subtitle');
    const modalDesc = document.querySelector('.modal__description');
    const modalOther = document.querySelector('.modal__other-information');

    petIndex = names.findIndex(e => e === name);
    modalImg.src = data[petIndex].img;
    modalTitle.textContent = data[petIndex].name;
    modalSubtitle.textContent = `${data[petIndex].type} - ${data[petIndex].breed}`;
    modalDesc.textContent = data[petIndex].description;
    modalOther.innerHTML = `<li><span>Age:</span>${data[petIndex].age}</li>
                            <li><span>Inoculations: </span>${data[petIndex].inoculations}</li>
                            <li><span>Diseases: </span>${data[petIndex].diseases}</li>
                            <li><span>Parasites: </span>${data[petIndex].parasites}</li>`

}

window.onclick = function(event) {
    if (event.target == MODAL) {
        MODAL.classList.remove('modal-open');
        document.body.classList.remove('lock');
    }
}