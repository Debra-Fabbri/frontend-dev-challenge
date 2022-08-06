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

/* SLIDER TESTIMONIAL */
let slider = document.querySelector('.slider-contenedor');
let sliderInd = document.querySelectorAll('.slider-test');
let contador = 1;
let tamWidth = sliderInd[0].clientWidth;
let intervalo = 10000;

window.addEventListener("resize", function(){
  tamWidth = sliderInd[0].clientWidth;
});

setInterval(function tiempo(){
  slides();
}, intervalo);


function slides(){
  slider.style.transform = 'translate(' + ( - tamWidth * contador) + 'px)';
  slider.style.transition = 'transform 1s';
  contador++;

  if(contador == sliderInd.length){
    contador = 0;
  }
}