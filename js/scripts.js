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
/* SLIDER */
/* Getting the elements from the DOM. */
const upBtn = document.querySelector('.up-button'),
	downBtn = document.querySelector('.down-button'),
	sideBar = document.querySelector('.sidebar'),
	mainSlide = document.querySelector('.main-slide'),
	slidesCnt = sideBar.querySelectorAll('div');
let activeIdx = 0;

/* Setting the top property of the sideBar element to the value of the expression. */
sideBar.style.top = `-${(slidesCnt.length - 1) * 100}vh`

/**
 * If the direction is up, increase the activeIdx by 1, if it's greater than or equal to the length of
 * the slidesCnt array, set it to 0, then set the mainSlide and sideBar's transform to the activeIdx
 * times 100vh, otherwise, if the direction is down, decrease the activeIdx by 1, if it's less than 0,
 * set it to the length of the slidesCnt array minus 1, then set the mainSlide and sideBar's transform
 * to the activeIdx times 100vh.
 * @param direction - up or down
 */
const changeSlide = (direction) => {
	switch (direction) {
		case 'up': {
			activeIdx++
			if (activeIdx >= slidesCnt.length) activeIdx = 0
			mainSlide.style.transform = `translateY(-${activeIdx * 100}vh)`
			sideBar.style.transform = `translateY(${activeIdx * 100}vh)`
			break
		}
		case 'down': {
			console.log(activeIdx)
			activeIdx--
			if (activeIdx < 0) activeIdx = slidesCnt.length - 1
			mainSlide.style.transform = `translateY(-${activeIdx * 100}vh)`
			sideBar.style.transform = `translateY(${activeIdx * 100}vh)`
			break
		}
	}
};

/* Listening for a click event on the upBtn and downBtn elements and then it is calling the
function `changeSlide()` with the parameter 'up' and 'down' respectively. */
upBtn.addEventListener('click', () => changeSlide('up'));
downBtn.addEventListener('click', () => changeSlide('down'));

/* Calling the function `changeSlide()` every 10 seconds. */
const myTimer = setInterval(() => changeSlide('up'), 10000);


/* -------------------------------------------------------------------------------------------------------- */
/* modal*/
/* Getting the elements from the DOM. */
const openModal = document.querySelector('.hero__cta');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

/* Listening for a click event on the openModal element and then it is adding the class
'modal--show' to the modal element. */
openModal.addEventListener('click', (e) => {
	e.preventDefault();
	modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e) => {
	e.preventDefault();
	modal.classList.remove('modal--show');
});


/* modal2 */
const openModal2 = document.querySelector('.hero__cta2');
const modal2 = document.querySelector('.modal2');
const closeModal2 = document.querySelector('.modal__close2');

openModal2.addEventListener('click', (e) => {
	e.preventDefault();
	modal2.classList.add('modal2--show');
});

closeModal2.addEventListener('click', (e) => {
	e.preventDefault();
	modal2.classList.remove('modal2--show');
});


/* -------------------------------------------------------------------------------------------------------- */
/* SLIDER TESTIMONIAL */

let slider = document.querySelector('.slider-contenedor');
let sliderInd = document.querySelectorAll('.slider-test');
let contador = 1;
let tamWidth = sliderInd[0].clientWidth;
let intervalo = 10000;

/* Listening for the window to be resized and then it is setting the tamWidth variable to the width of
the first sliderInd element. */
window.addEventListener("resize", function () {
	tamWidth = sliderInd[0].clientWidth;
});

/* Calling the function `slides()` every 10 seconds. */
setInterval(function tiempo() {
	slides();
}, intervalo);


function slides() {
	slider.style.transform = 'translate(' + (- tamWidth * contador) + 'px)';
	slider.style.transition = 'transform 1s';
	contador++;

	if (contador == sliderInd.length) {
		contador = 0;
	}
}


/* -------------------------------------------------------------------------------------------------------- */
/*   FAQ   */

/* A function that is being called when the accordion is clicked. */
const accordionBtns = document.querySelectorAll('.accordion');

accordionBtns.forEach((accordion) => {
	accordion.onclick = function () {
		this.classList.toggle("is-open");

		let content = this.nextElementSibling;
		console.log(content);

		if (content.style.maxHeight) {
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
/*   Contact-us   form validation   */

/* Getting the form and the inputs. */
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

/* Creating a regular expression for each of the fields. */
const expresiones = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

/* An object that contains the names of the fields of the form and the value false. */
const campos = {
	name: false,
	lastName: false,
	email: false,
	phone: false
}

/**
 * It takes an event object and a switch statement that checks the name of the input field and then
 * calls a function that takes a regular expression, the event object and the name of the input field.
 * @param e - is the event object
 */
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

/**
 * It validates the input field and changes the class of the input field and the icon.
 * @param expresion - the regular expression
 * @param input - the input element
 * @param campo - the name of the input field
 */
const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
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

/* Adding an event listener to each input element. */

inputs.forEach((input) => {
	input.addEventListener('keyup', formValidation);
	input.addEventListener('blur', formValidation);
});

/* Listening for a submit event on the form and then it is checking if all the fields are valid and if
the checkbox is checked. If it is true, then it is resetting the form and showing a message. If it
is false, then it is showing an error message. */

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if (campos.name && campos.lastName && campos.email && campos.phone && terminos.checked) {
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
