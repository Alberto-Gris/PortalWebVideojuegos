var canvas = document.getElementById("animacion");
var ctx = canvas.getContext('2d');   //pajaro y escenario
var ctx2 = canvas.getContext('2d'); //base
var ctx3 = canvas.getContext('2d'); //tubo inferior
var ctx4 = canvas.getContext('2d'); //tubo superior

var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var img4 = new Image();
var img5 = new Image();
var img6 = new Image();
var img7 = new Image();
var img8 = new Image();
var img9 = new Image();
var img10 = new Image();
var img11 = new Image();
var img12 = new Image();
var img13 = new Image();
var img14 = new Image();
var img15 = new Image();
var img16 = new Image();
var img17 = new Image();
var img18 = new Image();
var img19 = new Image();

img1.src = "background-day.png"
img2.src = "yellowbird-downflap.png";
img3.src = "yellowbird-midflap.png";
img4.src = "yellowbird-upflap.png";
img5.src = "base.png";
img6.src = "base.png";
img7.src = "message.png";
img8.src = "gameover.png";
img9.src = "pipe-green.png";
img10.src = "pipe-green-180.png";

img11.src = "bluebird-downflap.png";
img12.src = "bluebird-midflap.png";
img13.src = "bluebird-upflap.png";
img14.src = "redbird-downflap.png";
img15.src = "redbird-midflap.png";
img16.src = "redbird-upflap.png";

img17.src = "background-night.png";
img18.src = "pipe-red.png";
img19.src = "pipe-red-180.png";

var x = canvas.width/2;//posicion inicial de la moneda en el centro en x
var y = canvas.height/2;//posicion inicial de la moneda en el centro en y

//Velocidades de movimiento en y del pajaro
var dyLenta = 2;
var dyMedia = 3;
var dyRapida = 5;

//Diferentes imagenes para la animacion
var indice = 0;

var y_temp = y;//Guarda la posicion de 'y' cuando se hace click
var angulo = 0;//Angulo de rotacion del pajaro

var x_base = 0;//posicion inicial de la base en x
var dx_base = 3;//velocidad de movimiento de la base en x

var perdio = true;//Si perdio o no
var gano = false;//Si gano o no

var tiempo = 0;//Tiempo que lleva jugando
var segundos = 0;//Segundos que lleva jugando

var x_tubos = 0;//posicion inicial de los tubos en x
var dx_tubos = 3;//velocidad de movimiento de los tubos en x
var rand = 270;//posicion inicial de los tubos en y (aleatorio entre 50 y 270)

var abertura = 40;//Abertura entre los tubos 40 es la abertura por defecto es decir los tubos estan pegados, va de acuerdo al nivel de dificultad
var score = 0;
var nivel = 1;
var primeraPartida = true;

const rectTile = canvas.getBoundingClientRect();//Guarda en rectTile los limites del canvas

img1.onload = function (){ //carga la imagen y despues ejecuta la funcion
    setInterval(Main,20);
}

canvas.addEventListener('mousedown',click, false);//Se llama a la funcion click cuando se clickea


function Main(){
    ctx.clearRect(0,0,canvas.width,canvas.height); //Limpia canvas y agarra el color de fondo de forma automatica
    //console.log(score);
    if(score >= 0 && score < 25)
        ctx.drawImage(img1,0,0,288,512,0,0,canvas.width,canvas.height);//dibuja el escenario;
    else
        if(score >= 25)
            ctx.drawImage(img17,0,0,288,512,0,0,canvas.width,canvas.height);//dibuja el escenario;
    tiempo+=20;
    segundos = Math.floor(tiempo/1000);//Calcula los segundos desde que se inicio el juego
    //console.log(segundos);
    ctx.font="36px minecraft"
    ctx.fillStyle="white"

    if(gano == true){
        ctx.drawImage(img5,0,0,288,112,x_base,400,288,112);//dibuja la base mas a la izquierda
        ctx2.drawImage(img6,0,0,288,112,x_base+288,400,288,112);//dibuja la base mas a la derecha
        ctx.drawImage(img7,0,205,184,62,((canvas.width)/(2))-184/2,((canvas.height)/(2))-(267/2)+155,184,62);//dibuja el mensaje recortado
        ctx.font="40px minecraft"
        ctx.fillText("Felicidades",47,80);//Mensaje de victoria
        ctx.font="25px minecraft"
        ctx.fillText("¡GANASTE!",80,120);//Score
        ctx.font="28px minecraft"
        ctx.fillStyle="white"
        ctx.fillText(""+score,130,155)//Nivel
        perdio = true;
    }else
        if(perdio == false){//Si no ha perdido
            animacionBase();
            animacionPajaro();
            caida();//Si el pajaro toca los bordes activa la variable perdio
            animacionTubos();//Dibuja los tubos y hace que el pajaro pierda cuando los toca
            if(score >= 0 && score < 10)
                ctx.fillText(""+score,137,80);//Score
            else
                ctx.fillText(""+score,127,80);//Score
            ctx.font="20px minecraft"
            nivel = Math.floor(score/5)+1;
            ctx.fillText("Level: ",5,18)//Nivel
            ctx.fillStyle="black";
            if(nivel <= 10)
                ctx.fillText("          "+nivel,5,18)//Nivel
            else
                ctx.fillText("         "+"10",5,18)//Nivel
        }else
            if(perdio == true && primeraPartida == false){//Si perdio pero ya no es el inicio del juego
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angulo * Math.PI / 180);
                if(score >= 0 && score < 15)//Pajaro amarillo
                    ctx.drawImage(img2, -img2.width / 2, -img2.height / 2);
                else
                    if(score >= 15 && score < 30)//Pajaro azul
                        ctx.drawImage(img11, -img11.width / 2, -img11.height / 2);
                    else//Pajaro rojo
                        ctx.drawImage(img14, -img14.width / 2, -img14.height / 2);
                ctx.restore();
                ctx.drawImage(img5,0,0,288,112,x_base,400,288,112);//dibuja la base mas a la izquierda
                ctx2.drawImage(img6,0,0,288,112,x_base+288,400,288,112);//dibuja la base mas a la derecha
                if(score >= 0 && score < 25){//Mantiene el fondo de dia y el color de los tubos en verde
                    ctx4.drawImage(img10,0,rand-abertura,52,320-rand+abertura,x_tubos+288,0,52*0.7,320-rand+abertura);//dibuja el tubo superior
                    ctx3.drawImage(img9,0,0,52,rand+abertura,x_tubos+288,(400-rand-abertura),52*0.7,rand+abertura);//dibuja el tubo inferior
                }else
                    if(score >= 25){//Cambiar el fondo a noche, el color de los tubos a rojo
                        ctx4.drawImage(img19,0,rand-abertura,52,320-rand+abertura,x_tubos+288,0,52*0.7,320-rand+abertura);//dibuja el tubo superior
                        ctx3.drawImage(img18,0,0,52,rand+abertura,x_tubos+288,(400-rand-abertura),52*0.7,rand+abertura);//dibuja el tubo inferior
                    }
                ctx.drawImage(img8,0,0,192,42,50,40,192,42);//dibuja el gameover
                ctx.drawImage(img7,0,205,184,62,((canvas.width)/(2))-184/2,((canvas.height)/(2))-(267/2)+155,184,62);//dibuja el mensaje recortado
                if(score >= 0 && score < 10)
                    ctx.fillText(""+score,132,135);//Score
                else
                    ctx.fillText(""+score,122,135);//Score
            }else
                if(perdio == true && primeraPartida == true){//Inicio del juego
                    ctx.drawImage(img7,0,0,184,267,((canvas.width)/(2))-184/2,((canvas.height)/(2))-(267/2)-47,184,267);//dibuja el mensaje
                    ctx.drawImage(img5,0,0,288,112,x_base,400,288,112);//dibuja la base mas a la izquierda
                    ctx2.drawImage(img6,0,0,288,112,x_base+288,400,288,112);//dibuja la base mas a la derecha
                }
}

function click(e){
    var relativeX_escenario = e.clientX - rectTile.left;//Guarda la posicion de 'x' cuando se hace click
	var relativeY_escenario = e.clientY - rectTile.top;//Guarda la posicion de 'y' cuando se hace click
    //console.log(relativeX_escenario,relativeY_escenario)

    if(perdio == true && relativeX_escenario >= 88+20 && relativeX_escenario <= 200+50 && relativeY_escenario >= 245+50 && relativeY_escenario <= 346+80){//Si se hace click en el boton de play y perdio
        perdio = false;
        y = canvas.height/2;//posicion inicial de el pajaro en el centro en y
        angulo = 0;//Angulo de rotacion del pajaro
        y_temp = y+100;//Guarda la primer caida del pajaro
        tiempo = 0;
        segundos = 0;
        x_tubos = 0;
        score = 0;
        primeraPartida = false;
        gano = false;
    }else{
        if(perdio == false){//Si no ha perdido y se hace click en cualquier parte del canvas
            angulo = 315;//Reinicia el angulo cuando se hace click con el pajaro en 315 grados
            y_temp = y;//Guarda la posicion de 'y' cuando se hace click
            y -= 40;//Reajusta la posicion de 'y' para que el pajaro suba 40 pixeles
        }
    }
}

function animacionPajaro(){
    indice = (indice+1) % 6;
    if(y < y_temp){//Subir sin animacion
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angulo * Math.PI / 180);
        if(score >= 0 && score < 15){//Pajaro amarillo
            if(indice == 1 || indice == 2)//Pajaro downflap
                ctx.drawImage(img2, -img2.width / 2, -img2.height / 2);
            else
                if(indice == 3 || indice == 4)//Pajaro midflap
                    ctx.drawImage(img3, -img3.width / 2, -img3.height / 2);
                else//Pajaro upflap
                ctx.drawImage(img4, -img4.width / 2, -img4.height / 2);
        }else
            if(score >= 15 && score < 30){//Pajaro azul
                if(indice == 1 || indice == 2)//Pajaro downflap
                    ctx.drawImage(img11, -img11.width / 2, -img11.height / 2);
                else
                    if(indice == 3 || indice == 4)//Pajaro midflap
                        ctx.drawImage(img12, -img12.width / 2, -img12.height / 2);
                    else//Pajaro upflap
                        ctx.drawImage(img13, -img13.width / 2, -img13.height / 2);
            }else//Pajaro rojo
                if(indice == 1 || indice == 2)//Pajaro downflap
                    ctx.drawImage(img14, -img14.width / 2, -img14.height / 2);
                else
                    if(indice == 3 || indice == 4)//Pajaro midflap
                        ctx.drawImage(img15, -img15.width / 2, -img15.height / 2);
                    else//Pajaro upflap
                        ctx.drawImage(img16, -img16.width / 2, -img16.height / 2);
                
        ctx.restore();
        y += dyLenta;//mueve el bird en y lento
    }else{//Bajar con animacion
        //Dibuja el bird
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angulo * Math.PI / 180);
        if(score >= 0 && score < 15){//Pajaro amarillo
            if(indice == 1 || indice == 2)//Pajaro downflap
                ctx.drawImage(img2, -img2.width / 2, -img2.height / 2);
            else
                if(indice == 3 || indice == 4)//Pajaro midflap
                    ctx.drawImage(img3, -img3.width / 2, -img3.height / 2);
                else//Pajaro upflap
                ctx.drawImage(img4, -img4.width / 2, -img4.height / 2);
        }else
            if(score >= 15 && score < 30){//Pajaro azul
                if(indice == 1 || indice == 2)//Pajaro downflap
                    ctx.drawImage(img11, -img11.width / 2, -img11.height / 2);
                else
                    if(indice == 3 || indice == 4)//Pajaro midflap
                        ctx.drawImage(img12, -img12.width / 2, -img12.height / 2);
                    else//Pajaro upflap
                        ctx.drawImage(img13, -img13.width / 2, -img13.height / 2);
            }else//Pajaro rojo
                if(indice == 1 || indice == 2)//Pajaro downflap
                    ctx.drawImage(img14, -img14.width / 2, -img14.height / 2);
                else
                    if(indice == 3 || indice == 4)//Pajaro midflap
                        ctx.drawImage(img15, -img15.width / 2, -img15.height / 2);
                    else//Pajaro upflap
                        ctx.drawImage(img16, -img16.width / 2, -img16.height / 2);

        ctx.restore();

        //Rota el bird y lo hace caer
        if(angulo >= 315 && angulo <= 360){//Si el angulo esta entre 315 y 360
            angulo += 5;//Velocidad de rotacion
            y += dyMedia;//Velocidad de caida
        }else
            if(angulo >= 0 && angulo <= 90){//Si el angulo esta entre 0 y 90
                angulo += 12;//Velocidad de rotacion
                y += dyRapida;//Velocidad de caida
        }    
        
        //Reinicia los angulos
        if(angulo >= 360)//Reinicia el angulo cuando alcanza 360 grados para que no se desborde
            angulo = 0;
        else
            if (angulo >= 90 && angulo < 315)//Reinicia el angulo cuando alcanza 90 grados para que no rote mas de 90 grados
                angulo = 90;
    }
}

function caida(){
    if (y > canvas.height-112-18){//si el bird toca el borde inferior
        perdio = true;
        y = canvas.height-112-14;
    }else
        if(y < -200)//Si el bird toc el borde superior
            y = -200;
    
}

function animacionBase(){
    if(x_base <= -288)
        x_base = 0;
    ctx.drawImage(img5,0,0,288,112,x_base,400,288,112);//dibuja la base
    ctx2.drawImage(img6,0,0,288,112,x_base+288,400,288,112);//dibuja la base
    x_base -= dx_base;//mueve la base hacia la izquierda en x con velocidad dx_base
}

function animacionTubos(){
    if(segundos >= 3){
        if(x_tubos+288 <= -52){//Si el tubo sale del canvas del lado izquierdo
            x_tubos = 0;
            rand = Math.floor(Math.random() * (270 - 50 + 1)) + 50;//Genera un numero aleatorio entre 50 y 270
        }
        if(score >= 0 && score < 5)
            abertura = -40;
        else
            if(score >= 5 && score < 10)
                abertura = -38;
            else
                if(score >= 10 && score < 15)
                    abertura = -36;
                else
                    if(score >= 15 && score < 20)
                        abertura = -34;
                    else
                        if(score >= 20 && score < 25)
                            abertura = -32;
                        else
                            if(score >= 25 && score < 30)
                                abertura = -30;
                            else
                                if(score >= 30 && score < 35)
                                    abertura = -25;
                                else
                                    if(score >= 35 && score < 40)
                                        abertura = -20;
                                    else
                                        if(score >= 40 && score < 45)
                                            abertura = -15;
                                        else
                                            if(score >= 45)
                                                abertura = -8;
        if(score == 50 && x_tubos+288 == 96){
            gano = true;
        }

        //Cambia el color de los tubos y el fondo dependiendo del score
        if(score >= 0 && score < 25){
            //Mantiene el fondo de dia y el color de los tubos en verde
            ctx4.drawImage(img10,0,rand-abertura,52,320-rand+abertura,x_tubos+288,0,52*0.7,320-rand+abertura);//dibuja el tubo superior
            ctx3.drawImage(img9,0,0,52,rand+abertura,x_tubos+288,(400-rand-abertura),52*0.7,rand+abertura);//dibuja el tubo inferior
            x_tubos -= dx_tubos;//mueve los tubos hacia la izquierda en x con velocidad dx_tubos = 3
        }else
            if(score >= 25){
                //Cambiar el fondo a noche, el color de los tubos a rojo
                ctx4.drawImage(img19,0,rand-abertura,52,320-rand+abertura,x_tubos+288,0,52*0.7,320-rand+abertura);//dibuja el tubo superior
                ctx3.drawImage(img18,0,0,52,rand+abertura,x_tubos+288,(400-rand-abertura),52*0.7,rand+abertura);//dibuja el tubo inferior
                x_tubos -= dx_tubos;//mueve los tubos hacia la izquierda en x con velocidad dx_tubos = 3
            }

        //Limites del tubo superior en y = 320-rand+40
        //Limites del tubo inferior en y = 400-rand-40

        //Suma 1 al score
        if(x_tubos+288 == 156)
            score += 1;

        //Si el pajaro toca los tubos
        if(x_tubos+288 <= 157 && x_tubos+288 >= 108.6 && (y-20 <= 320-rand+abertura || y+18 >= 400-rand-abertura)){//15 y 20 son los radios del pajaro dependiendo de la rotacion
            perdio = true;
        }
    }
}

//Siguiente paso es dibujar los tubos y hacer que el pajaro pierda cuando toque los tubos
//Siguiente paso es sumar 1 al score cada vez que el pajaro pasa por el medio de los tubos