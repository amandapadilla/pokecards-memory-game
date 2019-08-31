"use strict";

//Almacenar constantes
const start = document.querySelector(".js-startGame");
const inputEasy = document.querySelector(".js-easyGame");
const inputMedium = document.querySelector(".js-mediumGame");
const inputHard = document.querySelector(".js-hardGame");
let level;
let pokeCards = [];

//Escuchar click sobre el botón comenzar ¿qué hace la función llamada por el listener?

// 1º Lee información de la selección de radio buttons

const whichLevelIsChecked = () => {
  if (inputEasy.checked === true) {
    level = "4";
  } else if (inputMedium.checked === true) {
    level = "6";
  } else if (inputHard.checked === true) {
    level = "8";
  }
};

// 2º Conecta con el servidor

// 3º Formatea los datos - Selecciona los datos del JSON que vamos a usar (image)
const formatServerData = data => {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    result.push({
      image: data[i].image
    });
  }
  return result;
};
// 4º Guarda los datos en una constante global que usaremos como dato principal
const saveData = data => {
  pokeCards = data;
};
// 5º Guarda la información en localStorage y la recupera (set&get)
const saveLevelInLocalStorage = () => {
  localStorage.setItem("level", level);
};

const getLevelFromLocalStorage = () => {
  const savedLevel = localStorage.getItem("level");
  return savedLevel;
};

// 6º Pinta el número de cartas correspondientes sólo se ve la trasera (la delantera data.image está oculta por default)
const paintBackCards = () => {
  let backCardsList = document.querySelector(".js-cardsBackList");
  let htmlCode = "";
  for (
    let backCardsIndex = 0;
    backCardsIndex < pokeCards.length;
    backCardsIndex++
  ) {
    htmlCode += `<li class="main__cardItem js-backCardItem" ><img src="assets/images/back-pokeCards.jpg" class="backCardImage js-backCardImg" id="cardImage${backCardsIndex}" data-index="${backCardsIndex}"></li>`;
  }
  backCardsList.innerHTML = htmlCode;
  //Escuchar click sobre carta (trasera)
  let backCardItems = document.querySelectorAll(".js-backCardImg");
  for (let backCardItem of backCardItems) {
    backCardItem.addEventListener("click", getPokeCard);
  }
};

//Función manejadora del evento:

const getDataFromServer = event => {
  if (event !== undefined) {
    event.preventDefault();
  }
  whichLevelIsChecked();
  saveLevelInLocalStorage();
  // const savedLevel = getLevelFromLocalStorage();
  const url = `https://raw.githubusercontent.com/Adalab/cards-data/master/${level}.json`; //no tengo claro que pueda leer el valor desde aquí.
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      data = formatServerData(data);
      saveData(data);
      paintBackCards();
    });
};

start.addEventListener("click", getDataFromServer); //Listener

//////////////////////////////////////

// 1er click sobre una carta: Oculta la trasera y muestra la pokeCard (delantera)
// 2º click sobre la misma carta: Oculta la pokeCard (delantera) y muestra la trasera.
const getPokeCard = event => {
  event.preventDefault();
  const selectedBackCard = event.target.dataset.index;
  const pokeCardsImage = pokeCards[selectedBackCard].image;
  const clickedCard = document.getElementById(`cardImage${selectedBackCard}`);
  // Acceder al elemento que recibe el click
  // Sustituir el valor del src
  if (clickedCard.src === pokeCardsImage) {
    clickedCard.src = "assets/images/back-pokeCards.jpg";
  } else {
    clickedCard.src = pokeCardsImage;
  }
};

//Al iniciar la página por primera vez
const initializePage = () => {
  const savedLevel = getLevelFromLocalStorage();
  if (savedLevel !== undefined) {
    level = savedLevel;
    if (savedLevel === "4") {
      inputEasy.checked = true;
    } else if (savedLevel === "6") {
      inputMedium.checked = true;
    } else if (savedLevel === "8") {
      inputHard.checked = true;
    }
    getDataFromServer();
  }
};
initializePage();

/////////////////////////////////////

//IMPLEMENTACIÓN DEL JUEGO

// Randomizar el orden de las cartas en cada partida

//Escucha click sobre carta n1 + Escucha click sobre carta n2
// ¿SON PAREJA?
// SÍ: Las pokeCards quedan visibles (permanente) + se muestra mensaje: '¡Bien hecho!'
// NO: Las pokeCards se muestran un par de segundos (temporizador-2000ms) y se ocultan y vuelven a mostrar la trasera + mensaje: 'Prueba de nuevo'.

////////////////////////////////////

//RESET BUTTON
const resetButton = document.querySelector(".js-resetButton");

const resetGame = () => {
  localStorage.removeItem("level");
  inputEasy.checked = false;
  inputMedium.checked = false;
  inputHard.checked = false;
  let backCardsList = document.querySelector(".js-cardsBackList");
  backCardsList.innerHTML = "";
};
resetButton.addEventListener("click", resetGame);
//Al pulsar el botón de reset se borra la información guardada en el localStorage y se puede volver a escoger un nivel de juego y/o empezar de nuevo.
