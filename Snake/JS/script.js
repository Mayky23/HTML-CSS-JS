const contenedorJuego = document.getElementById("gameContainer");
const caja = 20; // Tamaño de cada caja en el juego
const tamanoLienzo = 20; // Tamaño del juego en número de cajas

let serpiente = []; // Arreglo para almacenar los segmentos de la serpiente
let comida = { // Posición inicial de la comida
  x: Math.floor(Math.random() * tamanoLienzo) * caja,
  y: Math.floor(Math.random() * tamanoLienzo) * caja
};

let puntaje = 0; // Puntuación inicial
let direccion = "DERECHA"; // Dirección inicial de la serpiente
let juego; // Variable para almacenar el intervalo del juego

document.addEventListener("keydown", cambiarDireccion); // Agregar un evento para cambiar la dirección de la serpiente al presionar una tecla

function cambiarDireccion(evento) {
  const tecla = evento.keyCode; // Obtener el código de la tecla presionada
  if (tecla === 37 && direccion !== "DERECHA") direccion = "IZQUIERDA"; // Si se presiona la flecha izquierda y la serpiente no se está moviendo hacia la derecha, cambiar la dirección a la izquierda
  else if (tecla === 38 && direccion !== "ABAJO") direccion = "ARRIBA"; // Si se presiona la flecha arriba y la serpiente no se está moviendo hacia abajo, cambiar la dirección hacia arriba
  else if (tecla === 39 && direccion !== "IZQUIERDA") direccion = "DERECHA"; // Si se presiona la flecha derecha y la serpiente no se está moviendo hacia la izquierda, cambiar la dirección hacia la derecha
  else if (tecla === 40 && direccion !== "ARRIBA") direccion = "ABAJO"; // Si se presiona la flecha abajo y la serpiente no se está moviendo hacia arriba, cambiar la dirección hacia abajo
}

function colision(nuevaCabeza, serpiente) {
  for (let i = 0; i < serpiente.length; i++) { // Verificar si la nueva cabeza de la serpiente colisiona con cualquiera de sus segmentos
    if (nuevaCabeza.x === serpiente[i].x && nuevaCabeza.y === serpiente[i].y) {
      return true; // Si hay colisión, devolver true
    }
  }
  return false; // Si no hay colisión, devolver false
}

function dibujar() {
  contenedorJuego.innerHTML = ""; // Limpiar el contenedor del juego

  for (let i = 0; i < serpiente.length; i++) { // Dibujar cada segmento de la serpiente
    const segmento = document.createElement("div");
    segmento.style.width = caja + "px";
    segmento.style.height = caja + "px";
    segmento.style.backgroundColor = "#00ff";
    segmento.style.position = "absolute";
    segmento.style.left = serpiente[i].x + "px";
    segmento.style.top = serpiente[i].y + "px";
    contenedorJuego.appendChild(segmento);
  }

  const comidaElemento = document.createElement("div"); // Crear un elemento para representar la comida
  comidaElemento.style.width = caja + "px";
  comidaElemento.style.height = caja + "px";
  comidaElemento.style.backgroundColor = "#ff0000";
  comidaElemento.style.position = "absolute";
  comidaElemento.style.left = comida.x + "px";
  comidaElemento.style.top = comida.y + "px";
  contenedorJuego.appendChild(comidaElemento);

  const puntajeElemento = document.getElementById("puntaje"); // Obtener el elemento del puntaje
  puntajeElemento.textContent = "Puntos: " + puntaje; // Actualizar el puntaje en el elemento

  let cabezaX = serpiente[0].x; // Obtener la coordenada X de la cabeza de la serpiente
  let cabezaY = serpiente[0].y; // Obtener la coordenada Y de la cabeza de la serpiente

  if (direccion === "IZQUIERDA") cabezaX -= caja; // Actualizar la coordenada X de la cabeza de la serpiente según la dirección
  if (direccion === "ARRIBA") cabezaY -= caja; // Actualizar la coordenada Y de la cabeza de la serpiente según la dirección
  if (direccion === "DERECHA") cabezaX += caja; // Actualizar la coordenada X de la cabeza de la serpiente según la dirección
  if (direccion === "ABAJO") cabezaY += caja; // Actualizar la coordenada Y de la cabeza de la serpiente según la dirección

  const nuevaCabeza = { // Crear una nueva cabeza para la serpiente en la nueva posición
    x: cabezaX,
    y: cabezaY
  };

  if (
    cabezaX < 0 || // Verificar si la serpiente ha colisionado con los bordes del juego
    cabezaY < 0 ||
    cabezaX >= tamanoLienzo * caja ||
    cabezaY >= tamanoLienzo * caja ||
    colision(nuevaCabeza, serpiente) // Verificar si la serpiente ha colisionado consigo misma
  ) {
    clearInterval(juego); // Detener el juego
  }

  serpiente.unshift(nuevaCabeza); // Agregar la nueva cabeza a la serpiente

  if (cabezaX === comida.x && cabezaY === comida.y) { // Verificar si la serpiente ha alcanzado la comida
    puntaje++; // Incrementar el puntaje
    comida = { // Generar nueva posición aleatoria para la comida
      x: Math.floor(Math.random() * tamanoLienzo) * caja,
      y: Math.floor(Math.random() * tamanoLienzo) * caja
    };
  } else {
    serpiente.pop(); // Eliminar el último segmento de la serpiente si no ha alcanzado la comida
  }
}

function iniciarJuego() {
  serpiente = []; // Reiniciar la serpiente
  serpiente[0] = { x: 10 * caja, y: 10 * caja }; // Posición inicial de la cabeza de la serpiente
  puntaje = 0; // Reiniciar el puntaje
  direccion = "DERECHA"; // Dirección inicial de la serpiente
  juego = setInterval(dibujar, 150); // Iniciar el juego con un intervalo de 150 milisegundos
}

function reiniciarJuego() {
  clearInterval(juego); // Detener el juego actual
  iniciarJuego(); // Iniciar un nuevo juego
}

// Obtener los elementos de los botones
const botonJugar = document.getElementById("botonJugar");
const botonReiniciar = document.getElementById("botonReiniciar");

// Agregar eventos a los botones
botonJugar.addEventListener("click", iniciarJuego);
botonReiniciar.addEventListener("click", reiniciarJuego);

// Iniciar el juego al cargar la página
window.onload = function () {
  iniciarJuego();
};
