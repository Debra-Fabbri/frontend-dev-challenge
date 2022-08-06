/* example function name
const openAndCloseAccordion = () => {
  alert ('do something')
} */


/* -------------------------------------------------------------------------------------------------------- */
/* Hamburger Menu */
const iconMenu = document.querySelector(".header__navbar__hamburger-menu");
const navBar = document.querySelector('.header__navbar');

/* Listening for a click on the iconMenu element and then it is toggling the class "change" on the
navBar element. */
iconMenu.addEventListener('click', () => {
  navBar.classList.toggle("change");
})


/* -------------------------------------------------------------------------------------------------------- */
/* SLIDER TESTIMONIAL */

let slider = document.querySelector('.slider-contenedor');
let sliderInd = document.querySelectorAll('.slider-test');
let contador = 1;
let tamWidth = sliderInd[0].clientWidth;
let intervalo = 10000;

/* Listening for the window to be resized and then it is setting the tamWidth variable to the width of
the first sliderInd element. */
window.addEventListener("resize", function(){
  tamWidth = sliderInd[0].clientWidth;
});

/* Calling the function `slides()` every 10 seconds. */
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


/* -------------------------------------------------------------------------------------------------------- */
/*   FAQ   */

/* A function that is being called when the accordion is clicked. */
const accordionBtns = document.querySelectorAll('.accordion');

accordionBtns.forEach((accordion) => {
  accordion.onclick = function(){
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    console.log(content);

    if(content.style.maxHeight){
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});
