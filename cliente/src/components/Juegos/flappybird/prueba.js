// Obtén el elemento canvas y su contexto 2D
var canvas = document.getElementById('miCanvas');
var ctx = canvas.getContext('2d');

// Crea una nueva instancia de la imagen
var img = new Image();
img.src = 'yellowbird-downflap.png'; // Reemplaza 'ruta_de_tu_imagen.jpg' con la ruta de tu imagen

// Variable para almacenar el ángulo de rotación
var angulo = 0;

// Función para dibujar y rotar la imagen
function dibujarImagen() {
    // Borra cualquier contenido previo en el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Guarda el estado actual del contexto
    ctx.save();
    
    // Mueve el origen del contexto al centro de la imagen
    ctx.translate(canvas.width / 2, canvas.height / 2);
    
    // Rota la imagen en el ángulo actual (en radianes)
    ctx.rotate(angulo * Math.PI / 180);
    
    // Dibuja la imagen rotada en el canvas (ajustando la posición para centrarla)
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    
    // Restaura el estado original del contexto
    ctx.restore();
    
    // Incrementa el ángulo para la próxima rotación
    angulo += 1;
    if (angulo >= 360) {
        angulo = 0; // Reinicia el ángulo cuando alcanza 360 grados
    }
}

// Llama a la función dibujarImagen cada 10 milisegundos para crear una animación continua
setInterval(dibujarImagen, 10);