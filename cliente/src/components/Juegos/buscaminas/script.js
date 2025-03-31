/***************************************************************
--Faltaria implementar:

setTimeout(funcion,tiempo);

********************************************************************/

var canvas = document.getElementById("tile");
var pincel = canvas.getContext("2d");

var canvasScore = document.getElementById("puntuacion");
var ctx = canvasScore.getContext("2d");
let diferenciaTemporal = 0;

function inicioTime() {
    const ahora = new Date();
    tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
    clearInterval(idInterval);
    idInterval = setInterval(refrescarTiempo, 100);

}

var banderilla;

var recTile;
var xTile;
var yTile;

var recTileScenario;

var img = new Image();
img.src = "imagenes/tablero1.png"

var img1 = new Image();
img1.src = "imagenes/boton.png"

const buscaminas = {
    numMinasTotales: 0,
    numMinasEncontradas: 0,
    numFilas: 0,
    numColumnas: 0,
    aCampoMinas: [],
    tablero: []
}

window.onload = nivelMedio;

var boton1 = document.getElementById("easy");
var boton2 = document.getElementById("medium");
var boton3 = document.getElementById("hard");

boton1.addEventListener("click",nivelFacil);
boton2.addEventListener("click",nivelMedio);
boton3.addEventListener("click",nivelDificil);

function nivelFacil() {
    buscaminas.numFilas = 8;
    buscaminas.numColumnas = 8;
    buscaminas.numMinasTotales = 10;
    buscaminas.numMinasEncontradas = 0;
    canvas.setAttribute("width",256);
    canvas.setAttribute("height",256);
    recTile = canvas.getBoundingClientRect();
    eliminarTablero();
    inicio();
}

function nivelMedio() {
    buscaminas.numFilas = 16;
    buscaminas.numColumnas = 16;
    buscaminas.numMinasTotales = 40;
    buscaminas.numMinasEncontradas = 0;
    canvas.setAttribute("width",512);
    canvas.setAttribute("height",512);
    recTile = canvas.getBoundingClientRect();
    eliminarTablero();
    inicio();
}

function nivelDificil() {
    buscaminas.numFilas = 16;
    buscaminas.numColumnas = 30;
    buscaminas.numMinasTotales = 99;
    buscaminas.numMinasEncontradas = 0;
    canvas.setAttribute("width",960);
    canvas.setAttribute("height",512);
    recTile = canvas.getBoundingClientRect();
    eliminarTablero();
    inicio();
}

function inicio(){
    detenerContador();
    banderilla = false;
    canvas.addEventListener("click",destapar);
    canvas.addEventListener("contextmenu",marcar);
    canvasScore.removeEventListener("click",botonLoad);
    generarCampoMinasVacio();
    esparcirMinas();
    contarMinas();
    //console.log(buscaminas.aCampoMinas);
    //console.log(buscaminas.tablero);
    pintartableroNew(true);
    ctx.fillText("Tiempo:", 10, 80);
    ctx.fillText("Minas restantes", 10, 20);
    ctx.fillStyle = "black"; // Establece el color de relleno
    ctx.fillRect(0, 100, 200, 60); // (x, y, ancho, alto) Es para eliminar el puntaje
    ctx.fillRect(90, 54, 68, 48); // (x, y, ancho, alto) Tiempo
}

var colores = [
    "#0026ffaf",
    "#009803",
    "#a80a0a",
    "#9211ce",
    "#e5e10c",
    "#a57100",
    "#e80599",
    "#23000",
]
ctx.font = "20px Courier New";
function pintartableroNew( e ) {
    pincel.font = "20px Courier New";
    //Dibujamos la porcion de la imagen
    for (let j = 0; j < buscaminas.numFilas; j++) {
        for (let i = 0; i < buscaminas.numColumnas; i++) {
            if (buscaminas.tablero[j][i]=="1") {
                pincel.drawImage(img,12,48,32,32,i*32,j*32,32,32);
            } else {
                if (buscaminas.tablero[j][i]=="0") {
                    pincel.drawImage(img,46,48,32,32,i*32,j*32,32,32);
                    pincel.fillStyle=colores[buscaminas.aCampoMinas[j][i]];//Esto pinta los numeros confofrme a la matriz
                    if (buscaminas.aCampoMinas[j][i]!="0") 
                        pincel.fillText(buscaminas.aCampoMinas[j][i], (i*32)+10, (j*32)+20);                        
                    } else {
                    if (buscaminas.tablero[j][i]=="2") {
                        pincel.drawImage(img,80,48,32,32,i*32,j*32,32,32);
                    } else {
                        pincel.drawImage(img,114,48,32,32,i*32,j*32,32,32);
                    }
                }
            }
        }
    }
    if (e) {
        actualizarNumMinasRestantes();
    }
}

function destapar(miEvento){
    if (!banderilla) {
        iniciarContador();
        banderilla=true;
    }
    var relativeX = miEvento.clientX-recTile.left;
    var relativeY = miEvento.clientY-recTile.top;
    xTile = Math.floor(relativeX/32);
    yTile = Math.floor(relativeY/32);
    //console.log(xTile,yTile);

    if (destaparCasilla(yTile,xTile)) {
        pintartableroNew(true);
    }else{
        pintartableroNew(false);
    }
}

function destaparCasilla(fila, columna){
    //console.log("destapamos la casilla con fila " + fila + " y columna " +columna );
    
    //si la casilla esta dentro del tablero
    if (fila > -1 && fila < buscaminas.numFilas &&
        columna >-1 && columna < buscaminas.numColumnas){
        //si la casilla no esta destapada
        if (buscaminas.tablero[fila][columna]=="1"){
            
            //si no esta marcada como "bandera"
            if (buscaminas.tablero[fila][columna]!="2"){
                
                //la destapamos
                buscaminas.tablero[fila][columna] = "0";
                //console.log(buscaminas.tablero);
                //si no es bomba
                if (buscaminas.aCampoMinas[fila][columna] !="B"){
 
                    // y tiene 0 minas alrededor, destapamos las casillas contiguas
                    if (buscaminas.aCampoMinas[fila][columna] == 0){
                        destaparCasilla(fila-1,columna-1);
                        destaparCasilla(fila-1,columna);
                        destaparCasilla(fila-1,columna+1);
                        destaparCasilla(fila,columna-1);
                        destaparCasilla(fila,columna+1);
                        destaparCasilla(fila+1,columna-1);
                        destaparCasilla(fila+1,columna);
                        destaparCasilla(fila+1,columna+1);
                    }
                    return true;
                }else if (buscaminas.aCampoMinas[fila][columna]=="B"){
                    //añadimos el estilo de que hay bomba
                    buscaminas.tablero[fila][columna] = "3";
 
                    // y resolvemos el tablero indicando (false), que hemos cometido un fallo
                    resolverTablero(false);
                    return false;
                }
            }
        }
    }
}

function resolverTablero(e){
    if (e){
        let banderaFalsa = false;

        for (let j = 0; j < buscaminas.numFilas; j++) {
            for (let i = 0; i < buscaminas.numColumnas; i++) {
                if (buscaminas.aCampoMinas[j][i]=="B" && buscaminas.tablero[j][i]=="2") {
                    banderaFalsa=true;
                }
            }
        }
        if (!banderaFalsa) {
            //quitamos los listeners
            canvas.removeEventListener("contextmenu",marcar);
            canvas.removeEventListener("click", destapar); 
            detenerContador();
            canvasScore.addEventListener("click",botonLoad);
            ctx.drawImage(img1,0,0,500,497,80,420,48,48);
    
            ctx.fillStyle= "white";
            ctx.fillText("Tu puntuacion es:", 0, 120);
            ctx.fillText("-->"+contador+"<--", 60, 140);
        }
    }else{
        //quitamos los listeners
        canvas.removeEventListener("contextmenu",marcar);
        canvas.removeEventListener("click", destapar); 
        detenerContador();
        canvasScore.addEventListener("click",botonLoad);
        for (let j = 0; j < buscaminas.numFilas; j++) {
            for (let i = 0; i < buscaminas.numColumnas; i++) {
                if (buscaminas.aCampoMinas[j][i]=="B" ) {
                    buscaminas.tablero[j][i]="3";
                }
            }
        }
        ctx.drawImage(img1,0,0,500,497,80,420,48,48);
    }
}

var contador; 
var intervalId;   // Almacena el ID del intervalo

// Función para incrementar el contador en 1 segundo
function incrementarContador() {
    contador++;
    actualizarContador();
    console.log(contador);
}

function iniciarContador() {
    contador = 0; // Inicializa el contador en 0
    // Inicia el contador cuando se hace clic en un cuadrado
    intervalId = setInterval(incrementarContador, 1000); // Actualiza cada segundo (1000 ms)    
}

function detenerContador() {
    // Detiene el contador cuando se pierde"
    clearInterval(intervalId);    
}

function botonLoad(miEvento) {
    recTileScenario = canvasScore.getBoundingClientRect();
    var relativeXS = miEvento.clientX-recTileScenario.left;
    var relativeYS = miEvento.clientY-recTileScenario.top
    //console.log(relativeX,relativeY);
    if (relativeXS>80 && relativeXS <148 && relativeYS>420 && relativeYS<468) {
        ctx.fillStyle = "black"; // Establece el color de relleno
        ctx.fillRect(90, 60, 40, 40); // (x, y, ancho, alto)
        if (buscaminas.numMinasTotales==10) {
            nivelFacil();
        }
        if (buscaminas.numMinasTotales==40) {
            nivelMedio();
        }
        if (buscaminas.numMinasTotales==99) {
            nivelDificil();
        }
    }
}

function eliminarTablero(){
    pincel.clearRect(0, 0, canvas.width, canvas.height);
}

function actualizarContador() {
    // Dibuja un cuadrado relleno
    ctx.fillStyle = "black"; // Establece el color de relleno
    ctx.fillRect(90, 60, 40, 40); // (x, y, ancho, alto)
    ctx.fillStyle= "white";
    ctx.fillText(contador, 94, 80);
}

function actualizarNumMinasRestantes(){
    ctx.fillStyle = "black"; // Establece el color de relleno
    ctx.fillRect(70, 24, 60, 40); // (x, y, ancho, alto) Minas
    ctx.fillRect(80, 420, 68, 48); // (x, y, ancho, alto) Boton
    ctx.fillStyle= "white";
    ctx.fillText(buscaminas.numMinasTotales - buscaminas.numMinasEncontradas, 80, 40);
}

function marcar(miEvento){
    if (!banderilla) {
        iniciarContador();
        banderilla=true;
    }
    var relativeX = miEvento.clientX-recTile.left;
    var relativeY = miEvento.clientY-recTile.top;
    xTile = Math.floor(relativeX/32);
    yTile = Math.floor(relativeY/32);
    //console.log(xTile,yTile);
    
    if (buscaminas.tablero[yTile][xTile]=="1") {
        buscaminas.tablero[yTile][xTile]= "2";
        buscaminas.numMinasEncontradas++;
        //si es igual al numero de minas totales resolvemos el tablero
        if (buscaminas.numMinasEncontradas == buscaminas.numMinasTotales){
            resolverTablero(true);
        }
    }else{
        if (buscaminas.tablero[yTile][xTile]=="2") {
            buscaminas.tablero[yTile][xTile]="1";
            buscaminas.numMinasEncontradas--;
        }
    }
    //console.log(buscaminas.tablero);
    pintartableroNew(true);
}

function generarCampoMinasVacio(){
    //generamos el campo de minas en el objeto buscaminas
    buscaminas.aCampoMinas = new Array(buscaminas.numFilas);
    for (let fila=0; fila<buscaminas.numFilas; fila++){
        buscaminas.aCampoMinas[fila] = new Array(buscaminas.numColumnas);
    }
    //Generamos un segundo campo del tablero
    buscaminas.tablero = new Array(buscaminas.numFilas);
    for (let fila=0; fila<buscaminas.numFilas; fila++){
        buscaminas.tablero[fila] = new Array(buscaminas.numColumnas);
    }
    //Lo llenamos de 1's
    for (let j = 0; j < buscaminas.numFilas; j++) {
        for (let i = 0; i < buscaminas.numColumnas; i++) {
            buscaminas.tablero[j][i]="1";
        }
    }
}

function esparcirMinas(){
    //repartimos de forma aleatoria las minas
    let numMinasEsparcidas = 0;
    
    while (numMinasEsparcidas<buscaminas.numMinasTotales){
        //numero aleatorio en el intervalo [0,numFilas-1]
        let fila= Math.floor(Math.random() * buscaminas.numFilas);
 
        //numero aleatorio en el intervalo [0,numColumnas-1]
        let columna= Math.floor(Math.random() * buscaminas.numColumnas);
 
        //si no hay bomba en esa posicion
        if (buscaminas.aCampoMinas[fila][columna] != "B"){
            //la ponemos
            buscaminas.aCampoMinas[fila][columna] = "B";
 
            //y sumamos 1 a las bombas esparcidas
            numMinasEsparcidas++;
        }
    }
}

function contarMinas(){
    //contamos cuantas minas hay alrededor de cada casilla
    for (let fila=0; fila<buscaminas.numFilas; fila++){
        for (let columna=0; columna<buscaminas.numColumnas; columna++){
            //solo contamos si es distinto de bomba
            if (buscaminas.aCampoMinas[fila][columna]!="B"){
                contarMinasAlrededorCasilla(fila,columna);
            }
        }
    }
}

function contarMinasAlrededorCasilla(fila,columna){
    let numeroMinasAlrededor = 0;
 
    //de la fila anterior a la posterior
    for (let zFila = fila-1; zFila <= fila+1; zFila++){
 
        //de la columna anterior a la posterior
        for (let zColumna = columna-1; zColumna <= columna+1; zColumna++){
 
            //si la casilla cae dentro del tablero
            if (zFila>-1 && zFila<buscaminas.numFilas && zColumna>-1 && zColumna<buscaminas.numColumnas){
 
                //miramos si en esa posición hay bomba
                if (buscaminas.aCampoMinas[zFila][zColumna]=="B"){
 
                    //y sumamos 1 al numero de minas que hay alrededor de esa casilla
                    numeroMinasAlrededor++;
                }
            }
        }
    }
    //y guardamos cuantas minas hay en esa posicion
    buscaminas.aCampoMinas[fila][columna] = numeroMinasAlrededor;
}