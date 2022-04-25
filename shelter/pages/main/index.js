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
        bodyShadow.classList.toggle('body-shadow')        
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


// Slider
const url = '../../assets/pets.json';
const SLIDER = document.querySelector('.pets__wrapper');
const ITEM_LEFT = document.querySelector("#left-slides");
const ITEM_RIGHT = document.querySelector("#right-slides");
const ITEM_ACTIVE = document.querySelector("#active-slides");
let countSlide = 3;

let prevNumbers = randomPets(countSlide);
let slideNumbers = randomPets(countSlide);


async function getData(url, where) {
    const res = await fetch(url);
    const data = await res.json(); 

    changeSlide();
    where.innerHTML = ``;
    for(let i = 0; i < slideNumbers.length; i++) {  
        let pet = data[slideNumbers[i]];
        where.innerHTML += `
        <div class="pets__item" data-item="${pet.name}" data-index="${slideNumbers[i]}">
            <img class="pets__img" src="${pet.img}" alt="${pet.name}">
                <h3 class="pets__name">${pet.name}</h3>
                <div class="button button__pets">Learn more</div>
        </div>`;     
    }
    
}

adaptiveSlider();

getData(url, ITEM_LEFT);
getData(url, ITEM_ACTIVE);
getData(url, ITEM_RIGHT);

function randomPets(slides) {    
    const numbers = [];
    let rand = 0;
    while (numbers.length < slides) {
        rand = Math.floor(Math.random() * 8);
        if (!numbers.includes(rand)) numbers.push(rand);
    }
    return numbers;
}

function adaptiveSlider() {
    if (window.matchMedia("(max-width: 991px)").matches) {
        countSlide = 2;
    } 
    if (window.matchMedia("(max-width: 599px)").matches) {
        countSlide = 1;
    }
}

const btnLeft = document.querySelector('.button__arrow-left');
const btnRight = document.querySelector('.button__arrow-right');

function changeSlide() {
    let isChange = true;        
    while(isChange) {
        const nextNumbers = randomPets(countSlide);        
        if (checkRepeat(slideNumbers, nextNumbers)) {
            isChange = false;
            prevNumbers = slideNumbers;
            slideNumbers = nextNumbers;
        }               
    }  
}

function checkRepeat(old, recent) {
    for (let i = 0; i < old.length; i++) {
        if (old.includes(recent[i])) return false;
    }
    return true;
}

btnRight.addEventListener('click', moveRightSlide);
btnLeft.addEventListener('click', moveLeftSlide);

function moveLeftSlide() {
    SLIDER.classList.add('transition-right');
}

function moveRightSlide() {
    SLIDER.classList.add('transition-left');
}

SLIDER.addEventListener('animationend', (animationEvent) => {
    if (animationEvent.animationName === "move-right") {
        SLIDER.classList.remove("transition-right");       
        document.querySelector('#active-slides').innerHTML = ITEM_LEFT.innerHTML; 
        getData(url, ITEM_LEFT);
        setTimeout(() => {ITEM_RIGHT.innerHTML = ITEM_LEFT.innerHTML }, 300)
    } else {
        SLIDER.classList.remove("transition-left");        
        document.querySelector('#active-slides').innerHTML = ITEM_RIGHT.innerHTML;        
        getData(url, ITEM_RIGHT);         
        setTimeout(() => {ITEM_LEFT.innerHTML = ITEM_RIGHT.innerHTML }, 300)        
    }
})

function getIndexCard(item) {
    const childs = item.children;
    const result = [];
    for (let el of childs) {
        console.log(el.dataset.index)
    }
}

// Popup
const SLIDER_ITEMS = document.querySelector('.slide-item');
const CLOSE_MODAL = document.querySelector('.close-modal');
const MODAL = document.querySelector('.modal');
const MODAL_WINDOW = document.querySelector('.modal__content');
const PET_NAME = document.querySelector('.pets__name');

SLIDER.addEventListener('click', (event) => {
    let target = event.target.closest('.pets__item');
    
    if (target.classList.contains('pets__item')) {
        MODAL.classList.add('modal-open');
        document.body.classList.add('lock');
        
        MODAL_WINDOW.classList.add('modal-transition');
        getDataModal(url, target.dataset.item);
    }
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

    const petIndex = names.findIndex(e => e === name);

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