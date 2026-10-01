document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "t") {
        swapTheme();
    }
});
const botonPlay = document.querySelector(".play-button");

botonPlay.addEventListener("click", startGame);
function swapTheme() {
    document.body.classList.toggle("dark")
}
const imagenes = [
    "img/alpine_a290.jpg",
    "img/alpine_ultime.jpg",
    "img/alpine-a390.jpg",
    "img/a110.jpg",
    "img/a110Gts.jpeg"

];
const botonesDificultad = document.querySelectorAll(".difficulty-option")
const board = document.querySelector(".board")
const temporizador = document.querySelector(".tiempo");
const score = document.querySelector(".score");
let indice = 3;

botonesDificultad.forEach((boton, i) => {
    boton.addEventListener("click", () => {
        indice = i + 3;
        console.log(indice)
        board.classList.toggle("medio", indice === 4)
        board.classList.toggle("dificil", indice === 5)
        crearTablero()
    });
});

function crearTablero() {

    while (board.firstChild) {
        board.firstChild.remove()
    }

    let cartas = [];

    for (let i = 0; i < indice; i++) {
        cartas.push({ id: i, imagen: imagenes[i] })
        cartas.push({ id: i, imagen: imagenes[i] })
        console.log(indice)
    }

    cartas.sort(() => Math.random() - 0.5)

    cartas.forEach(carta => {

        const card = document.createElement("div")
        card.classList.add("card")
        card.dataset.id = carta.id

        const img = document.createElement("img")
        img.src = carta.imagen

        card.appendChild(img)
        board.appendChild(card)
        card.addEventListener("click", jugar)
    });
}

crearTablero();
let cartaAnterior = null

let isPlaying = false
let segundos = 0
let cronometro
let aciertos = 0
let clicks = 0
let scoreNumber = 0
function timer() {
    segundos++

    const minutos = Math.floor(segundos / 60)
    const segundosRestantes = segundos % 60

    temporizador.textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(segundosRestantes).padStart(2, "0")
}
function startGame(){
    isPlaying = true
    cronometro = setInterval(timer, 1000)
}

function jugar(event) {
    if(!isPlaying) return
    const card = event.currentTarget

    card.classList.toggle("visible")

    if (cartaAnterior === null) {
        cartaAnterior = card
    } else {

        if (cartaAnterior.dataset.id === card.dataset.id) {
            cartaAnterior.removeEventListener("click", jugar);
            card.removeEventListener("click", jugar);
            cartaAnterior = null
            aciertos++
            scoreNumber += 100
            score.textContent = String(scoreNumber).padStart(4, "0")
            if(aciertos === indice){
                stopGame()
            }
        } else {
            clicks++
            scoreNumber -= 2
            if(scoreNumber <= 0) scoreNumber = 0
            score.textContent = String(scoreNumber).padStart(4, "0")
            setTimeout(() => {
                cartaAnterior.classList.remove("visible")
                card.classList.remove("visible")
                cartaAnterior = null
            }, 1000)
        }
    }
}
function stopGame(){
    clearInterval(cronometro)
    isPlaying = false
    botonPlay.removeEventListener
    scoreNumber -= Math.floor(segundos / 10)
    score.textContent = String(scoreNumber).padStart(4, "0")
}
