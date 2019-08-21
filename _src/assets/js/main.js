"use strict";

//Almacenar constantes
const start = document.querySelector(".js-startGame");

//Escuchar click sobre el botón comenzar ¿qué hace la función llamada por el listener?

// 1º Lee información de la selección de radio buttons
// 2º Conecta con el servidor
// 3º Formatea los datos - Selecciona los datos del JSON que vamos a usar (image)
// 4º Guarda los datos en una constante global que usaremos como dato principal
// 5º Guarda la información en localStorage y la recupera (set&get)
// 6º Pinta el número de cartas correspondientes sólo se ve la trasera (la delantera data.image está oculta por default)

const getDataFromServer = event => {
  event.preventDefault();
  const url = `https://raw.githubusercontent.com/Adalab/cards-data/master/${
    input.value
  }.json`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      data = formatServerData(data);
      saveData(data);
      setInLocalStorage();
      getFromLocalStorage();
      paintCards();
    });
};

start.addEventListener("click", getDataFromServer); //Listener

//////////////////////////////////////

//Escuchar click sobre carta (trasera)
// 1er click sobre una carta: Oculta la trasera y muestra la pokeCard (delantera)
// 2º click sobre la misma carta: Oculta la pokeCard (delantera) y muestra la trasera.

const showOrHideCardsOnClick = () => {};

/////////////////////////////////////

//IMPLEMENTACIÓN DEL JUEGO

// Randomizar el orden de las cartas en cada partida

//Escucha click sobre carta n1 + Escucha click sobre carta n2
// ¿SON PAREJA?
// SÍ: Las pokeCards quedan visibles (permanente) + se muestra mensaje: '¡Bien hecho!'
// NO: Las pokeCards se muestran un par de segundos (temporizador-2000ms) y se ocultan y vuelven a mostrar la trasera + mensaje: 'Prueba de nuevo'.

////////////////////////////////////

//RESET BUTTON
//Al pulsar el botón de reset se borra la información guardada en el localStorage y se puede volver a escoger un nivel de juego y/o empezar de nuevo.
