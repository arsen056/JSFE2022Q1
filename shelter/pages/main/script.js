let btnLeft = document.querySelector('.button__arrow-left');
let btnRight = document.querySelector('.button__arrow-right');
let petsItems = document.getElementsByClassName('pets__item');
let sliderItems = document.querySelector('.slider__items');
let countMove = (petsItems.length / 3) - 1;
let movePx = 0;
let moveMax = 2160;

// pets.innerHTML = `
//     <div class="pets__item">
//         <img class="pets__img" src="../../assets/images/pets-woody.png" alt="Woody">
//         <h3 class="pets__name">Woody</h3>
//         <div class="button button__pets">Learn more</div>
//     </div>`;



btnRight.addEventListener('click', () => {
    movePx -= 1080;
    sliderItems.style.transform = `translateX(${movePx}px)`;
});

btnLeft.addEventListener('click', () => {
    movePx += 1080;
    sliderItems.style.transform = `translateX(${movePx}px)`;
});