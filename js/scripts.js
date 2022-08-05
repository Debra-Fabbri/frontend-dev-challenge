/* example function name
const openAndCloseAccordion = () => {
  alert ('do something')
} */

/*Hamburger Menu*/
const iconMenu = document.querySelector(".header__navbar__hamburger-menu");
const navBar = document.querySelector('.header__navbar');

iconMenu.addEventListener('click', () => {
  navBar.classList.toggle("change");
})