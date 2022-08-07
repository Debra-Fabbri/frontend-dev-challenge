/* -------------------------------------------------------------------------------------------------------- */
/* Welcome! In this .js file you will find (separated by comments) 
the necessary functions for the interaction with the html like:
submit the form with 'alert', a scroll listener to show/hide some button, 
FAQ/Accordion click, open and close a modal. among others. 

Greetings!*/

/* -------------------------------------------------------------------------------------------------------- */
//Let's start!
/* -------------------------------------------------------------------------------------------------------- */

/**
 * When the page loads, add the class 'fades' to the element with the class 'wrapper'.
 */
const fadeOut = () => {
  const loaderWrapper = document.querySelector('.wrapper');
  loaderWrapper.classList.add('fades');
}

window.addEventListener('load', fadeOut);

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


/* -------------------------------------------------------------------------------------------------------- */
/*   Contact-us   
    form validation
*/

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  lastName:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	name: false,
	lastName: false,
	email: false,
	phone: false
}

const formValidation = (e) => {
	switch (e.target.name) {
		case "name":
			validarCampo(expresiones.name, e.target, 'name');
		break;
		case "lastName":
			validarCampo(expresiones.lastName, e.target, 'lastName');
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "phone":
			validarCampo(expresiones.phone, e.target, 'phone');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', formValidation);
	input.addEventListener('blur', formValidation);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.name && campos.lastName && campos.email && campos.phone && terminos.checked ){
		formulario.reset();
		
		Swal.fire(
      'Muchas Gracias por contactarnos!',
      'El formulario fue enviado exitosamente!',
      'success'
    )

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});
