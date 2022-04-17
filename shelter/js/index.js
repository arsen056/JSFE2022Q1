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