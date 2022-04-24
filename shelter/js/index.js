// Burger
const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__nav');
const logo = document.querySelector('.logo');

function toggleBurger() {
    if (window.matchMedia("(max-width: 767px)").matches) {
        document.body.classList.toggle('lock');
        burger.classList.toggle('burger-active');    
        nav.classList.toggle('nav-active');
        logo.classList.toggle('logo-active');
    }
}

burger.addEventListener('click', toggleBurger);
nav.addEventListener('click', toggleBurger);

// Slider
const url = '../../js/pets.json';
const sliderItems = document.querySelector('.slider__items');

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();    
    addSlides(data);
}
getData(url);

function addSlides(data) {
    const petItems = document.querySelectorAll('.pets__item');
    const img = document.querySelectorAll('.pets__img');
    const petsNames = document.querySelectorAll('.pets__name');
    for(let i = 0; i < slideNumbers.length; i++) {        
        let pet = data[slideNumbers[i]];
        img[i].src = `${pet.img}`;
        petsNames[i].textContent = `${pet.name}`;
        petItems[i].dataset.item = `${pet.name}`;
    }
}

let slideNumbers = randomPets(3);

function randomPets(slides) {    
    const numbers = [];
    let rand = 0;
    while (numbers.length < slides) {
        rand = Math.floor(Math.random() * 8);
        if (!numbers.includes(rand)) numbers.push(rand);
    }
    return numbers;
}

const btnLeft = document.querySelector('.button__arrow-left');
const btnRight = document.querySelector('.button__arrow-right');

function changeSlide() {
    let isChange = true;        
    while(isChange) {
        const nextNumbers = randomPets(3);
        if (checkRepeat(slideNumbers, nextNumbers)) {
            isChange = false;
            slideNumbers = nextNumbers;
        }               
    }
    getData(url);
}

function checkRepeat(old, recent) {
    for (let i = 0; i < old.length; i++) {
        if (old.includes(recent[i])) return false;
    }
    return true;
}

btnRight.addEventListener('click', changeSlide);
btnLeft.addEventListener('click', changeSlide);

// Popup

const SLIDER_ITEMS = document.querySelector('.slider__items');
const CLOSE_MODAL = document.querySelector('.close-modal');
const MODAL = document.querySelector('.modal');
const MODAL_WINDOW = document.querySelector('.modal__content');
const PET_NAME = document.querySelector('.pets__name');

SLIDER_ITEMS.addEventListener('click', (event) => {
    let target = event.target.closest('.pets__item');
    MODAL.classList.add('modal-open');
    
    MODAL_WINDOW.classList.add('modal-transition');
    getDataModal(url, target.dataset.item);
})

CLOSE_MODAL.addEventListener('click', closeModal)
function closeModal() {
    MODAL.classList.remove('modal-open');
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
    console.log(event.target)
    if (event.target == MODAL) {
        MODAL.classList.remove('modal-open');
    }
}