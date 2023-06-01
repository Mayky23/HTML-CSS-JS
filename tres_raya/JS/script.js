var squares = document.querySelectorAll(".square"); // Selección de todos los cuadrados del tablero
            var message = document.getElementById("message"); // Selección del elemento donde se mostrará el mensaje del juego
            var restartButton = document.getElementById("restart"); // Selección del botón para reiniciar el juego

            var currentPlayer = "X"; // Inicialización del jugador actual
            var board = ["", "", "", "", "", "", "", "", ""]; // Inicialización del tablero

            // Función que se ejecuta al hacer clic en un cuadrado
            function handleClick(event) {
                var square = event.target; // Selección del cuadrado en el que se hizo clic
                var index = parseInt(square.getAttribute("data-index")); // Obtención del índice del cuadrado

                if (board[index]) { // Si el cuadrado ya está marcado, no hacer nada
                    return;
                }

                placeMark(square, index); // Marcar el cuadrado con la marca del jugador actual

                var winner = checkWin(); // Verificar si hay un ganador

                if (winner) { // Si hay un ganador, mostrar el mensaje correspondiente
                    endGame(winner);
                } else if (board.every(function(square) { return square })) { // Si no hay ganador y todos los cuadrados están marcados, mostrar empate
                    endGame(null);
                } else { // Si no hay ganador ni empate, cambiar al siguiente jugador
                    swapTurn();
                }
            }

            // Función que marca el cuadrado con la marca del jugador actual
            function placeMark(square, index) {
                square.classList.add(currentPlayer.toLowerCase()); // Agregar la clase correspondiente al cuadrado
                square.textContent = currentPlayer; // Agregar la marca del jugador al cuadrado
                board[index] = currentPlayer; // Actualizar el tablero con la marca del jugador
            }

            // Función que cambia al siguiente jugador
            function swapTurn() {
                currentPlayer = currentPlayer === "X" ? "O" : "X"; // Cambiar al siguiente jugador
            }

            // Función que verifica si hay un ganador
            function checkWin() {
                var winConditions = [        
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ];

                for (var i = 0; i < winConditions.length; i++) {
                    var a = winConditions[i][0];
                    var b = winConditions[i][1];
                    var c = winConditions[i][2];

                    if (board[a] && board[a] === board[b] && board[a] === board[c]) { // Si hay una coincidencia entre las marcas en las posiciones del tablero, hay un ganador
                        return board[a];
                    }
                }

                return null; // Si no hay ganador, retornar null
            }

            // Función que muestra el mensaje de ganador o empate y muestra el botón de reinicio
            function endGame(winner) {
                message.textContent = winner ? winner + " ha ganado!" : "Empate!";
                restartButton.style.display = "block";
            }

            // Función que reinicia el juego
            function restartGame() {
                // Eliminar las clases "X" y "O" de cada cuadrado, limpiar su contenido y eliminar el listener de click actual.
                squares.forEach(function(square) {
                    square.classList.remove("X", "O");
                    square.textContent = "";
                    square.removeEventListener("click", handleClick);
                    square.addEventListener("click", handleClick);
                });
                // Ocultar el botón de reinicio
                restartButton.style.display = "none";
                // Limpiar el mensaje de estado del juego
                message.textContent = "";
                // Establecer el jugador actual como "X"
                currentPlayer = "X";
                // Reiniciar el tablero
                board = ["", "", "", "", "", "", "", "", ""];
            }

            // Agregar evento click a cada cuadrado
            squares.forEach(function(square) {
            square.addEventListener("click", handleClick);
            });

            // Agregar evento click al botón de reinicio
            restartButton.addEventListener("click", restartGame);
