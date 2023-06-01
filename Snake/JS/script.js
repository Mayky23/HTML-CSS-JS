const lienzo = document.getElementById("gameCanvas"); // Obtener el elemento del lienzo del juego
const ctx = lienzo.getContext("2d"); // Obtener el contexto 2D del lienzo
const caja = 20; // Tamaño de cada caja en el lienzo
const tamanoLienzo = 20; // Tamaño del lienzo en número de cajas

let serpiente = []; // Arreglo para almacenar los segmentos de la serpiente

serpiente[0] = { x: 10 * caja, y: 10 * caja }; // Posición inicial de la cabeza de la serpiente

let comida = { // Posición inicial de la comida
  x: Math.floor(Math.random() * tamanoLienzo) * caja,
  y: Math.floor(Math.random() * tamanoLienzo) * caja
};

let puntaje = 0; // Puntuación inicial
let direccion = "DERECHA"; // Dirección inicial de la serpiente

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
  ctx.fillStyle = "#000"; // Establecer el color de fondo del lienzo
  ctx.fillRect(0, 0, lienzo.width, lienzo.height); // Dibujar un rectángulo para llenar todo el lienzo

  for (let i = 0; i < serpiente.length; i++) { // Dibujar cada segmento de la serpiente
    ctx.fillStyle = "#00ff"; // Establecer el color de la serpiente
    ctx.fillRect(serpiente[i].x, serpiente[i].y, caja, caja); // Dibujar un rectángulo para representar cada segmento
  }

  ctx.fillStyle = "#ff0000"; // Establecer el color de la comida
  ctx.fillRect(comida.x, comida.y, caja, caja); // Dibujar un rectángulo para representar la comida

  ctx.fillStyle = "#fff"; // Establecer el color del texto
  ctx.font = "20px Arial"; // Establecer el tamaño y la fuente del texto
  ctx.fillText("Puntaje: " + puntaje, caja, caja); // Dibujar el puntaje en el lienzo

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
    cabezaX < 0 || // Verificar si la serpiente ha colisionado con los bordes del lienzo
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
    comida = { // Generar una nueva posición para la comida de forma aleatoria
      x: Math.floor(Math.random() * tamanoLienzo) * caja,
      y: Math.floor(Math.random() * tamanoLienzo) * caja
    };
  } else {
    serpiente.pop(); // Si no se alcanzó la comida, eliminar el último segmento de la serpiente para simular el movimiento
  }

}

let juego = setInterval(dibujar, 150); // Ejecutar la función dibujar cada 150 milisegundos para actualizar el juego
