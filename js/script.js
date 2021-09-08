var maximo, medio, reproducir, barra, progreso, silenciar, volumen, bucle;

function iniciar(){
    // inicializamos las variables 
    maximo = 400;
    medio = document.getElementById("medio");
    reproducir = document.getElementById("reproducir");
    barra = document.getElementById("barra");
    progreso = document.getElementById("progreso");
    silenciar = document.getElementById("silenciar");
    volumen = document.getElementById("volumen");

    // registrar el evento en el objeto especifico
    reproducir.addEventListener("click", presionar);
    silenciar.addEventListener("click", sonido);
    barra.addEventListener("click", mover);
    volumen.addEventListener("click", nivel);
}

function presionar(){
    //si medio.paused y medio.ended son diferentes de true
    if(!medio.paused && !medio.ended){
        medio.pause();
        reproducir.value = "▶️";
        clearInterval(bucle);
    }else{
        medio.play();
        reproducir.value = "⏸️"
        bucle = setInterval(estado, 1000);
    }
}

//actualizar la barra de progreso
function estado(){
    if(!medio.ended){
        let largo = parseInt(medio.currentTime * maximo/medio.duration)
        progreso.style.width = largo +'px';
    }else{
        progreso.style.width = '0px';
        reproducir.value = "▶️";
        clearInterval(bucle);
    }
}

// reproducir el video desde la posicion seleccionada por el usuario
function mover(evento){
    if(!medio.paused && !medio.ended){
        let ratonX = evento.offsetX - 2 ;//offsetX obtiene la posocion relativa al elemento del destino
        if(ratonX < 0){
            ratonX = 0;
        }else if(ratonX > maximo){
            ratonX = maximo;
        }
        let tiempo = ratonX * medio.duration / maximo;
        medio.currentTime = tiempo;
        progreso.style.width = ratonX + 'px';
    }
}

// activa o desactiva el sonido
function sonido(){
    if(silenciar.value == '🔊'){
        medio.muted = true;
        volumen.value = 0;
        silenciar.value = "🔇";
    }else{
        medio.muted = false;
        volumen.value = 0.6;
        silenciar.value = "🔊";
    }
}

//cambia el volumen de acuerdo al especificado en el elemento volumen
function nivel(){
    medio.volumen = volumen.value
}

//responder al evebnto load para iniciar la aplicacion cuando el documento es cargado
window.addEventListener("load", iniciar)