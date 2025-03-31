var canvas = document.getElementById("tablero");
var ctx = canvas.getContext("2d");
var canvasDat = document.getElementById("datos");
var ctxDat = canvasDat.getContext("2d");

var lado = 32;
var secuencia = [];
var frames = 0;
var framesNv = 48;
var puntaje = 0;
var nivel = 1;
var lineasTotal = 0;
var lineasElim = 0;
var gameOver = false;
var piezaNext = "";
var piezaAct = "";
var matrizAct = [];
var matrizNext = [];
var intervalID = null;
var isInicioJuego = true;
var isPausa = false;
var primPieza = true;

var piezaX = 0;
var piezaY = 0;
var nextX = 0;
var nextY = 0;

var audioGameOver = new Audio("sounds/me_game_gameover.wav");
var audioGameClear = new Audio("sounds/me_game_clear.wav");
var audioAlert1 = new Audio("sounds/me_game_remain_1.wav");
var audioAlert2 = new Audio("sounds/me_game_remain_2.wav");

var audioMenu = new Audio("sounds/me_game_menu.mp3");
var audioInGame = new Audio("sounds/me_game_play.mp3");
var audioInGame2 = new Audio("sounds/me_game_play2.mp3");
var audioInGame3 = new Audio("sounds/me_game_play3.mp3");
var audioResults1 = new Audio("sounds/me_game_results_1.mp3");
var audioResults2 = new Audio("sounds/me_game_results_2.mp3");

// Definir los colores asociados a cada número posible de la matriz
var colores = {
    1: "cyan",
    2: "yellow",
    3: "purple",
    4: "green",
    5: "red",
    6: "blue",
    7: "orange",
    8: "grey"
}

var matrices = 
{
    "I": [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],

    "O": [
        [2,2],
        [2,2]
    ],

    "T": [
        [0,3,0],
        [3,3,3],
        [0,0,0]
    ],

    "S": [
        [0,4,4],
        [4,4,0],
        [0,0,0]
    ],

    "Z": [
        [5,5,0],
        [0,5,5],
        [0,0,0]
    ],

    "J": [
        [6,0,0],
        [6,6,6],
        [0,0,0]
    ],

    "L": [
        [0,0,7],
        [7,7,7],
        [0,0,0]
    ]
}

// Definir la matriz de las piezas estáticas
var tablero = [];
// Llenar la matriz con valores iniciales de 0 (vacíos)
for (let fila = -2; fila < 20; fila++)
{
    tablero[fila] = [];
    for (let col = 0; col < 10; col++)
    {
        tablero[fila][col] = 0;
    }
}

// Devuelve la siguiente pieza a generar en el tablero
function sigPieza()
{
    let next = piezaNext;
    
    // Si la secuencia ya está vacía se genera una nueva secuencia
    if (secuencia.length == 0)
    {
        generarSec();
    }
    
    // Obtiene la pieza de 'secuencia'
    piezaNext = secuencia.pop();
    
    if (primPieza)
    {
        next = piezaNext;
        piezaNext = secuencia.pop();
        primPieza = false;
    }

    // Resetea la posición en X, centrado en el tablero
    piezaX = tablero[0].length/2 - Math.ceil(matrices[next][0].length/2);

    // Resetea la posición en Y, la pieza en I una fila más abajo que las demás para coincidir en la altura del cuadro más inferior
    if (next == "I")
        piezaY = -1;
    else
        piezaY = -2;
    
    // Define la matriz inicial de acuerdo al valor de next elegido
    matrizAct = matrices[next];
    console.log(matrizAct);

    // Devuelve la pieza elegida en forma de letra
    return next;
}

// Crea una nueva secuencia de piezas aleatoria
function generarSec()
{
    // Piezas posibles de obtener
    let piezas = ["I", "O", "T", "S", "Z", "J", "L"];
    let piezaSelec;

    // Randomizar el orden de las piezas
    while (piezas.length > 0)
    {
        num = generarIntRand(0, piezas.length-1);

        // Selecciona la pieza siguiente eliminándola del arreglo de piezas, y añadiéndola a la secuencia
        piezaSelec = piezas.splice(num, 1)[0];
        secuencia.push(piezaSelec);
    }
}

// Devuelve un número entero aleatorio en el rango entre min y max
function generarIntRand(min, max)
{
    // Se presupone que los datos de entrada son enteros
    return Math.floor(Math.random()*(max-min+1));
}

// Toma la matriz y dibuja los cuadros con el color asociado al número incluido en la celda
function dibujarTablero()
{
    for (i = 0; i < 20; i++)
    {
        for (j = 0; j < 10; j++)
        {
            if (tablero[i][j] != 0)
            {
                let numero = tablero[i][j];
                ctx.fillStyle = colores[numero];
                ctx.fillRect(j*lado, i*lado, lado-1, lado-1);
            }
        }
    }
}

// Rota la pieza del parámetro en 90 grados en el sentido de las manecillas del reloj
function rotarManecillas(matrizAct)
{
    // Crear nueva matriz del mismo tamaño que la original
    nvMatriz = [];
    for (i = 0; i < matrizAct.length; i++)
    {
        nvMatriz[i] = [];
        for (j = 0; j < matrizAct[i].length; j++)
        {
            nvMatriz[i][j] = 0;
        }
    }

    // Transponer la matriz original
    for (i = 0; i < nvMatriz.length; i++)
    {
        for (j = 0; j < nvMatriz[i].length; j++)
        {
            nvMatriz[i][j] = matrizAct[j][i];
        }
    }

    // Invertir el orden de las filas
    for (i = 0; i < nvMatriz.length; i++)
    {
        let temp = 0;
        let l = 0;
        let r = nvMatriz[i].length - 1;

        while (l < r)
        {
            temp = nvMatriz[i][l];
            nvMatriz[i][l] = nvMatriz[i][r];
            nvMatriz[i][r] = temp;
            l++;
            r--;
        }
    }

    return nvMatriz;
}

// Rota la pieza del parámetro en 90 grados en sentido opuesto a las manecillas del reloj
function rotarContraManecillas(matrizAct)
{
    // Crear nueva matriz del mismo tamaño que la original
    nvMatriz = [];
    for (i = 0; i < matrizAct.length; i++)
    {
        nvMatriz[i] = [];
        for (j = 0; j < matrizAct[i].length; j++)
        {
            nvMatriz[i][j] = 0;
        }
    }

    // Transponer la matriz original
    for (i = 0; i < nvMatriz.length; i++)
    {
        for (j = 0; j < nvMatriz[i].length; j++)
        {
            nvMatriz[i][j] = matrizAct[j][i];
        }
    }

    // Invertir el orden de las columnas
    for (j = 0; j < nvMatriz.length; j++)
    {
        let temp = 0;
        let u = 0;
        let d = nvMatriz.length - 1;

        while (u < d)
        {
            temp = nvMatriz[u][j];
            nvMatriz[u][j] = nvMatriz[d][j];
            nvMatriz[d][j] = temp;
            u++;
            d--;
        }
    }

    return nvMatriz;
}

// Dibujar la matriz especificada por el parámetro de entrada
function dibujarPieza(matrizPieza)
{
    for (i = 0; i < matrizPieza.length; i++)
    {
        for (j = 0; j < matrizPieza[i].length; j++)
        {
            // Solo tomar en cuenta las celdas de la matriz donde haya un cuadro
            if (matrizPieza[i][j] != 0)
            {
                ctx.fillStyle = colores[matrizPieza[i][j]];
                ctx.fillRect((piezaX+j)*lado, (piezaY+i)*lado, lado-1, lado-1);
            }
        }
    }
}

// Función para establecer la velocidad de la pieza, de acuerdo al nivel en el que se encuentra el juego
function actualizarVelocidad()
{
    if (nivel >= 1)
    {
        if (nivel >= 2)
        {
            if (nivel >= 3)
            {
                if (nivel >= 4)
                {
                    if (nivel >= 5)
                    {
                        if (nivel >= 6)
                        {
                            if (nivel >= 7)
                            {
                                if (nivel >= 8)
                                {
                                    if (nivel >= 9)
                                    {
                                        if (nivel >= 10)
                                        {
                                            if (nivel >= 11)
                                            {
                                                if (nivel >= 14)
                                                {
                                                    if (nivel >=17)
                                                    {
                                                        if (nivel >= 20)
                                                        {
                                                            if (nivel >= 30)
                                                            {
                                                                framesNv = 1;
                                                            }
                                                            else
                                                            {
                                                                framesNv = 2;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            framesNv = 3;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        framesNv = 4;
                                                    }
                                                }
                                                else
                                                {
                                                    framesNv = 5;
                                                }
                                            }
                                            else
                                            {
                                                framesNv = 6;
                                            }
                                        }
                                        else
                                        {
                                            framesNv = 8;
                                        }
                                    }
                                    else
                                    {
                                        framesNv = 13;
                                    }
                                }
                                else
                                {
                                    framesNv = 18;
                                }
                            }
                            else
                            {
                                framesNv = 23;
                            }
                        }
                        else
                        {
                            framesNv = 28;
                        }
                    }
                    else
                    {
                        framesNv = 33;
                    }
                }
                else
                {
                    framesNv = 38;
                }
            }
            else
            {
                framesNv = 43;
            }
        }
        else
        {
            framesNv = 48;
        }
    }
}

// Busca líneas completas, las elimina, baja las filas superiores, y devuelve el número de líneas eliminadas
function eliminarLineas()
{
    let estaCompleta;
    let conteo = 0;
    for (i = 0; i < 20; i++)
    {
        estaCompleta = true;
        // Si hay un cuadro vacío, se cancela el recorrido
        for (j = 0; j < 10 && estaCompleta; j++)
        {
            if (tablero[i][j] == 0)
            {
                estaCompleta = false;
            }
        }

        // Revisa si la línea está completa
        if (estaCompleta)
        {
            // Recorrer las líneas superiores para reemplazar las inferiores
            for (m = i-1; m >= 0; m--)
            {
                for (n = 0; n < 10; n++)
                {
                    tablero[m+1][n] = tablero[m][n];
                }
            }

            // Cancelar el incremento de i, para volver a evaluar la línea ya reemplazada
            i--;
            // Incrementar el conteo de líneas eliminadas
            conteo++;
        }
    }

    // Reproducir sonido de acuerdo al número de líneas eliminadas
    switch (conteo)
    {
        case 1:
            let audioSingle = new Audio("sounds/se_game_single.wav");
            audioSingle.play();
            break;
        case 2:
            let audioDouble = new Audio("sounds/se_game_double.wav");
            audioDouble.play();
            break;
        case 3:
            let audioTriple = new Audio("sounds/se_game_triple.wav");
            audioTriple.play();
            break;
        case 4:
            let audioTetris = new Audio("sounds/se_game_tetris.wav");
            audioTetris.play();
    }

    if (conteo > 0)
    {

        // Revisar si se ha cumplido un All Clear
        let isAllClear = true;
        for (i = 0; i < tablero.length && isAllClear; i++)
        {
            for (j = 0; j < tablero[i].length && isAllClear; j++)
            {
                if (tablero[i][j] != 0)
                    isAllClear = false;
            }
        }
    
        if (isAllClear)
        {
            // Sumar al puntaje de acuerdo a las líneas hechas para hacer el All Clear
            switch (conteo)
            {
                case 1:
                    puntaje += 800*nivel;
                    break;
                case 2:
                    puntaje += 1200*nivel;
                    break;
                case 3:
                    puntaje += 1800*nivel;
                    break;
                case 4:
                    puntaje += 2000*nivel;
            }
            let audioPerfect = new Audio("sounds/se_game_perfect.wav");
            audioPerfect.play();
        }
    }

    return conteo;
}

function actualizarPuntaje(lineas)
{
    switch(lineas)
    {
        case 1:
            puntaje += 100*nivel;
            break;
        case 2:
            puntaje += 300*nivel;
            break;
        case 3:
            puntaje += 500*nivel;
            break;
        case 4:
            puntaje += 800*nivel;
    }
}

// Busca si la pieza actual choca con otras piezas, o se encuentra fuera del tablero
function piezaChoca(matrizPieza)
{
    // Recorre la matriz de la pieza
    for (i = 0; i < matrizPieza.length; i++)
    {
        for (j = 0; j < matrizPieza[i].length; j++)
        {
            // Solo tomar en cuenta las celdas de la matriz donde hayan cuadros
            if (matrizPieza[i][j] != 0)
            {
                // Revisar si columna muy a la izquierda o muy a la derecha, o fila muy abajo; además, si existe otro cuadro en la misma posición del tablero
                if (piezaX + j < 0 || piezaX + j >= tablero[0].length || piezaY + i >= tablero.length)
                {
                    console.log("Choca: fuera del tablero");
                    return true;
                }
                if (tablero[piezaY + i][piezaX + j] != 0)
                {
                    console.log("Choca: pieza existente");
                    return true;
                }
            }
        }
    }
    console.log("Choca: "+false);
    return false;
}

// Colocar pieza en la matriz principal del tablero
function fijarPieza(matrizPieza)
{
    // Recorre la matriz de la pieza
    for (i = 0; i < matrizPieza.length; i++)
    {
        for (j = 0; j < matrizPieza[i].length; j++)
        {
            // Solo tomar en cuenta las celdas de la matriz donde hayan cuadros
            if (matrizPieza[i][j] != 0)
            {
                // Si el cuadro está sobre el borde superior del tablero, marcar gameover
                if (i + piezaY < 0)
                {
                    // Función para Game Over
                    gameOver = true;
                }

                tablero[i + piezaY][j + piezaX] = matrizPieza[i][j];
                
            }
        }
    }
    
    if (gameOver)
    {
        setGameOver();
        piezaAct = "";
    }
    else
    {
        piezaAct = sigPieza();
        let audioLanding = new Audio("sounds/se_game_landing.wav");
        audioLanding.play();
    }
}

// Indica el comportamiento del juego al llegar a un gameOver
function setGameOver()
{

    audioInGame.pause();
    audioInGame2.pause();
    audioInGame3.pause();

    // Colorear los bloques del tablero en gris
    for (i = 0; i < tablero.length; i++)
    {
        for (j = 0; j < tablero[i].length; j++)
        {
            if (tablero[i][j] != 0)
            {
                tablero[i][j] = 8;
            }
        }
    }

    // Colorear los bloques de la pieza en gris
    for (i = 0; i < matrizAct.length; i++)
    {
        for (j = 0; j < matrizAct[i].length; j++)
        {
            if (matrizAct[i][j] != 0)
            {
                matrizAct[i][j] = 8;
            }
        }
    }

    // Volver a dibujar tablero y pieza, con el color actualizado
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarTablero();
    dibujarPieza(matrizAct);
    dibujarDatos();

    if (lineasTotal<150)
    {
        audioGameOver.play();
        setTimeout(playResults1, 4000);
    }
    else
    {
        audioGameClear.play();
        setTimeout(playResults2, 5000);
    }

    // Eliminar el auto-llamado de la función cicloJuego
    clearInterval(intervalID);
    intervalID = null;
}

function dibujarDatos()
{
    // Borrar el canvas de datos
    ctxDat.clearRect(0, 0, canvasDat.width, canvasDat.height);

    // Dibujar el cuadro de la pieza siguiente
    ctxDat.fillStyle = "black";
    ctxDat.fillRect(86, 80, 128, 128);

    // Ajustar el offset de la pieza siguiente
    matrizNext = matrices[piezaNext];
    if (piezaNext == "O")
        nextX = 1;
    else
        nextX = 0;

    if (piezaNext == "I")
        nextY = 0;
    else
        nextY = 1;

    // Dibujar la pieza siguiente
    if (!isPausa && !isInicioJuego && !gameOver)
    {
        for (i = 0; i < matrizNext.length; i++)
        {
            for (j = 0; j < matrizNext[i].length; j++)
            {
                // Solo tomar en cuenta las celdas de la matriz donde haya un cuadro
                if (matrizNext[i][j] != 0)
                {
                    ctxDat.fillStyle = colores[matrizNext[i][j]];
                    ctxDat.fillRect((nextX+j)*lado+86, (nextY+i)*lado+80, lado-1, lado-1);
                }
            }
        }
    }

    // Escribir los datos generales
    ctxDat.font = "20px Arial";
    ctxDat.fillStyle = "white";
    ctxDat.fillText("Siguiente:", 105, 60);
    ctxDat.fillText(`Puntaje: ${puntaje}`, 25, 300);
    ctxDat.fillText(`Nivel: ${nivel}`, 25, 350);
    if (lineasTotal >= 150)
        ctxDat.fillStyle = "green";
    ctxDat.fillText(`Líneas elim.: ${lineasTotal}`, 25, 400);    

    if (isInicioJuego)
    {
        // Instrucción para iniciar el juego
        ctxDat.font = "30px Arial";
        ctxDat.fillStyle = "white";
        ctxDat.fillText("Presiona ENTER", 30, 500);
        ctxDat.fillText("para iniciar", 75, 530);
    }
    else if (isPausa)
    {
        // Instrucción para salir de pausa
        ctxDat.font = "30px Arial";
        ctxDat.fillStyle = "cyan";
        ctxDat.fillText("EN PAUSA", 70, 500);
        ctxDat.font = "20px Arial"
        ctxDat.fillText("Presiona Esc o Enter", 55, 540);
        ctxDat.fillText("para continuar", 90, 570);
    }
    else if (gameOver)
    {
        // Inidicador de Game Over
        ctxDat.font = "40px Arial";
        ctxDat.fillStyle = "red";
        ctxDat.fillText("GAME OVER", 25, 500);
        ctxDat.font = "25px Arial";
        ctxDat.fillText("Recargue la página", 40, 550);
        ctxDat.fillText("para una nueva partida", 20, 580);
    }
    else
    {
        // Controles
        ctxDat.font = "15px Arial";
        ctxDat.fillStyle = "white";
        ctxDat.fillText("Flechas ← y → --- Mover pieza", 15, 460);
        ctxDat.fillText("Flecha ↓ --- Caída rápida", 15, 490);
        ctxDat.fillText("Flecha ↑ / Tecla X --- Rotar a la derecha", 15, 520);
        ctxDat.fillText("Tecla Z --- Rotar a la izquierda", 15, 550);
        ctxDat.fillText("Barra Espaciadora --- Caída instantánea", 15, 580);
        ctxDat.fillText("Tecla Esc --- Pausa", 15, 620);
    }
}

// La sucesión de instrucciones que se llamará cada frame, generando el bucle del juego
function cicloJuego()
{
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isPausa && !isInicioJuego)
    {
        // Busca líneas por eliminar, devuelve el número de líneas eliminadas y las suma al total
        lineasElim = eliminarLineas();
        console.log("LineasElim: "+lineasElim);
        lineasTotal += lineasElim;
        console.log("LineasTotal: "+lineasTotal);
        
        // Actualiza el puntaje de acuerdo al número de líneas eliminadas con el último movimiento
        actualizarPuntaje(lineasElim);
        console.log("Puntaje: "+puntaje);
        
        // Dibujar las piezas estáticas del tablero
        dibujarTablero();
        
        // Actualizar el nivel en el que se encuentra el juego
        let antNivel = nivel;
        nivel = Math.floor(lineasTotal/10)+1;
        console.log("Nivel: "+nivel);
        if (antNivel != nivel)
        {
            if (nivel == 10)
            {
                audioInGame.pause();
                audioAlert1.play();
                setTimeout(playInGame2, 350);
            }
            else if (nivel == 15)
            {
                audioInGame.pause();
                audioInGame2.pause();
                audioAlert2.play();
                setTimeout(playInGame3, 200);
            }
            else
            {
                let audioNivel = new Audio("sounds/se_game_kbget.wav");
                audioNivel.play();
            }
        }
        
        // Actualizar la velocidad a la que cae la pieza, dependiendo del nivel
        actualizarVelocidad();
        console.log("Vel: "+framesNv);
        
        // Incrementar la cantidad de frames, y revisar si han pasado los suficientes para bajar la posición de la pieza
        frames++;
        console.log("Frames: "+frames);
        if (frames > framesNv)
        {
            piezaY++;
            console.log("PiezaY: "+piezaY);
            // Comprobar si la pieza ha chocado con un elemento del tablero
            if (piezaChoca(matrizAct))
            {
                // Devolver a la última fila válida
                piezaY--;
                // Colocar pieza en la matriz del tablero
                fijarPieza(matrizAct);
            }
            
            // Reiniciar conteo de frames
            frames = 0;
        }
        
        // Dibujar de nuevo el tablero y la pieza actual
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarTablero();
        dibujarPieza(matrizAct);
    }
    dibujarDatos();
}
    
document.addEventListener("keydown", manejadorTeclado);

function manejadorTeclado(e)
{
    // Si aún no es game over
    if (!gameOver)
    {
        if (!isPausa && !isInicioJuego)
        {
            // Al presionar la flecha derecha, mover la matriz de la pieza a la derecha
            if (e.key == "Right" || e.key == "ArrowRight")
            {
                piezaX++;
                if (piezaChoca(matrizAct))
                {
                    piezaX--;
                }
                else
                {
                    let audioMove = new Audio("sounds/se_game_move.wav");
                    audioMove.play();
                }
            }
            // Al presionar la flecha izquierda, mover la matriz de la pieza a la izquierda
            if (e.key == "Left" || e.key == "ArrowLeft")
            {
                piezaX--;
                if (piezaChoca(matrizAct))
                {
                    piezaX++;
                }
                else
                {
                    let audioMove = new Audio("sounds/se_game_move.wav");
                    audioMove.play();
                }
            }
            // Al presionar la flecha abajo, acelerar la caída de la pieza
            if (e.key == "Down" || e.key == "ArrowDown")
            {
                piezaY++;
                if (piezaChoca(matrizAct))
                {
                    piezaY--;
                    fijarPieza(matrizAct);
                }
                else
                {
                    puntaje++;
                    let audioSoftDrop = new Audio("sounds/se_game_softdrop.wav");
                    audioSoftDrop.play();
                }
                frames = 0;
            }
            // Al presionar la flecha arriba o la tecla X, rotar la pieza en el sentido de las manecillas del reloj
            if (e.key == "Up" || e.key == "ArrowUp" || e.key == "KeyX" || e.key == "x")
            {
                let matrizTemp = rotarManecillas(matrizAct);
                if (!piezaChoca(matrizTemp))
                {
                    matrizAct = matrizTemp;
                    let audioRotate = new Audio("sounds/se_game_rotate.wav");
                    audioRotate.play();
                }
            }
            // Al presionar la tecla Z, rotar la pieza en el sentido opuesto a las manecillas del reloj
            if (e.key == "KeyZ" || e.key == "z")
            {
                let matrizTemp = rotarContraManecillas(matrizAct);
                if (!piezaChoca(matrizTemp))
                {
                    matrizAct = matrizTemp;
                    let audioRotate = new Audio("sounds/se_game_rotate.wav");
                    audioRotate.play();
                }
            }
            // Al presionar la tecla Espacio, hacer caer la pieza hasta el fondo del tablero
            if (e.key == " ")
            {
                while (!piezaChoca(matrizAct))
                {
                    puntaje += 2;
                    piezaY++;
                }
                piezaY--;
                puntaje -= 2;
                fijarPieza(matrizAct);
                frames = 0;
                let audioHardDrop = new Audio("sounds/se_game_harddrop.wav");
                audioHardDrop.play();
            }
        }
        
        if (e.key == "Escape")
        {
            let tempPausa = isPausa
            if (!isInicioJuego)
            {
                isPausa = !isPausa;
                if (isPausa)
                {
                    let audioPause = new Audio("sounds/se_game_pause.wav");
                    audioPause.play();
                    if (nivel >= 10 && nivel < 15)
                    {
                        audioInGame2.pause();
                    }
                    else if (nivel >= 15)
                    {
                        audioInGame3.pause();
                    }
                    else
                    {
                        audioInGame.pause();
                    }
                }
                if (tempPausa != isPausa && !isPausa)
                {
                    let audioSelect = new Audio("sounds/se_sys_select.wav");
                    audioSelect.play();

                    if (nivel >= 10 && nivel < 15)
                    {
                        audioInGame2.play();
                    }
                    else if (nivel >= 15)
                    {
                        audioInGame3.play();
                    }
                    else
                    {
                        audioInGame.play();
                    }
                }
            }
        }
    
        if (e.key == "Enter")
        {
            let tempPausa = isPausa;
            let tempIni = isInicioJuego;
            isPausa = isInicioJuego = false;
            if (tempPausa != isPausa && !isPausa)
            {
                let audioSelect = new Audio("sounds/se_sys_select.wav");
                audioSelect.play();

                if (nivel >= 10 && nivel < 15)
                {
                    audioInGame2.play();
                }
                else if (nivel >= 15)
                {
                    audioInGame3.play();
                }
                else
                {
                    audioInGame.play();
                }
            }
            if (tempIni != isInicioJuego && !isInicioJuego)
            {
                audioMenu.pause();
                audioInGame.play();
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isPausa && !isInicioJuego)
        {
            dibujarTablero();
            dibujarPieza(matrizAct);
        }
    }
}

audioMenu.addEventListener("ended", function() {
    this.currentTime = 56.5;
    this.play();
})

audioInGame.addEventListener("ended", function() {
    this.currentTime = 4.5;
    this.play();
})

function playResults1()
{
    audioResults1.play();
}

function playResults2()
{
    audioResults2.play();
}

function playInGame2()
{
    audioInGame2.play();
}

function playInGame3()
{
    audioInGame3.play();
}

audioResults1.addEventListener("ended", function() {
    this.currentTime = 16.7;
    this.play();
})

audioResults2.addEventListener("ended", function() {
    this.currentTime = 5.2;
    this.play();
})

audioInGame2.addEventListener("ended", function() {
    this.currentTime = 4;
    this.play();
})

audioInGame3.addEventListener("ended", function() {
    this.currentTime = 6;
    this.play();
})


// Empezar el juego
audioMenu.play();
piezaAct = sigPieza();
intervalID = setInterval(cicloJuego, 1000/60);