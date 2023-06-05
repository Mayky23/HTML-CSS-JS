const contenedorJuego = document.getElementById("container_game");
const botonJugar = document.getElementById("botonJugar");
const botonReiniciar = document.getElementById("botonReiniciar");
const caja = 20; // Tamaño de cada caja en el juego
const tamanoLienzo = 20; // Tamaño del juego en número de cajas

let serpiente = []; // Arreglo para almacenar los segmentos de la serpiente
let comida = { // Posición inicial de la comida
  x: Math.floor(Math.random() * tamanoLienzo) * caja,
  y: Math.floor(Math.random() * tamanoLienzo) * caja
};

let puntaje = 0; // Puntuación inicial
let direccion = "ARRIBA"; // Dirección inicial de la serpiente
let juego; // Variable para almacenar el intervalo del juego

botonJugar.addEventListener("click", iniciarJuego);
botonReiniciar.addEventListener("click", reiniciarJuego);
document.addEventListener("keydown", cambiarDireccion);

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
    segmento.style.borderRadius = "5px";
    segmento.style.position = "absolute";
    segmento.style.left = serpiente[i].x + "px";
    segmento.style.top = serpiente[i].y + "px";
    contenedorJuego.appendChild(segmento);
  }

  const comidaElemento = document.createElement("div"); // Crear un elemento para representar la comida
  comidaElemento.style.width = caja + "px";
  comidaElemento.style.height = caja + "px";
  comidaElemento.style.backgroundColor = "#ff0000";
  comidaElemento.style.borderRadius = "20px";
  comidaElemento.style.position = "absolute";
  comidaElemento.style.left = comida.x + "px";
  comidaElemento.style.top = comida.y + "px";
  contenedorJuego.appendChild(comidaElemento);

  const puntajeElemento = document.getElementById("puntaje"); // Obtener el elemento del puntaje
  puntajeElemento.textContent = "POINTS: " + puntaje; // Actualizar el puntaje en el elemento

  let cabezaX = serpiente[0].x; // Obtener la coordenada X de la cabeza de la serpiente
  let cabezaY = serpiente[0].y; // Obtener la coordenada Y de la cabeza de la serpiente

  if (direccion === "IZQUIERDA") cabezaX -= caja; // Actualizar la coordenada X de la cabeza de la serpiente según la dirección
  if (direccion === "ARRIBA") cabezaY -= caja; // Actualizar la coordenada Y de la cabeza de la serpiente según la dirección
  if (direccion === "DERECHA") cabezaX += caja; // Actualizar la coordenada X de la cabeza de la serpiente según la dirección
  if (direccion === "ABAJO") cabezaY += caja; // Actualizar la coordenada Y de la cabeza de la serpiente según la dirección

  // Verificar si la serpiente ha colisionado con los bordes del juego
  if (
    cabezaX < 0 ||
    cabezaY < 0 ||
    cabezaX >= tamanoLienzo * caja ||
    cabezaY >= tamanoLienzo * caja ||
    colision({ x: cabezaX, y: cabezaY }, serpiente)
  ) {
    clearInterval(juego); // Detener el juego
    const recordGuardado = localStorage.getItem("record");
    const recordActual = parseInt(recordGuardado) || 0;
    if (puntaje > recordActual) {
      localStorage.setItem("record", puntaje.toString()); // Guardar el nuevo récord en el localStorage
      const recordElemento = document.getElementById("record");
      recordElemento.textContent = puntaje.toString(); // Actualizar el récord en la página
    }
    return;
  }

  const nuevaCabeza = { // Crear una nueva cabeza para la serpiente en la nueva posición
    x: cabezaX,
    y: cabezaY
  };

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
  serpiente = [{ x: 200, y: 200 }]; // Posición inicial de la serpiente
  puntaje = 0; // Reiniciar el puntaje
  direccion = "ARRIBA"; // Reiniciar la dirección
  juego = setInterval(dibujar, 220); // Llamar a la función dibujar cada 200 milisegundos
}

function reiniciarJuego() {
  clearInterval(juego); // Detener el juego
  const recordElemento = document.getElementById("record");
  recordElemento.textContent = localStorage.getItem("record") || "0"; // Mostrar el récord actual almacenado en el localStorage
  iniciarJuego(); // Iniciar el juego nuevamente
}

iniciarJuego(); // Iniciar el juego
