document.addEventListener("keydown", (event) => {
    if (event.target.tagName === "INPUT") return
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
const fichasTecnicas = [
    {
        nombre: "Alpine A290",
        potencia: "220 CV",
        motor: "Eléctrico",
        aceleracion: "0-100 km/h: 6,4 s",
        peso: "1.479 kg"
    },
    {
        nombre: "Alpine A110 R Ultime",
        potencia: "345 CV",
        motor: "1.8 Turbo",
        aceleracion: "0-100 km/h: 3,8 s",
        peso: "1.082 kg"
    },
    {
        nombre: "Alpine A390",
        potencia: "Hasta 470 CV",
        motor: "Eléctrico AWD",
        aceleracion: "0-100 km/h: 3,9 s",
        peso: "≈ 2.100 kg"
    },
    {
        nombre: "Alpine A110",
        potencia: "252 CV",
        motor: "1.8 Turbo",
        aceleracion: "0-100 km/h: 4,5 s",
        peso: "≈ 1.102 kg"
    },
    {
        nombre: "Alpine A110 GTS",
        potencia: "300 CV",
        motor: "1.8 Turbo",
        aceleracion: "0-100 km/h: 4,2 s",
        peso: "≈ 1.110 kg"
    }
];
const botonesDificultad = document.querySelectorAll(".difficulty-option")

const board = document.querySelector(".board")
board.addEventListener("click", jugar)

const temporizador = document.querySelector(".tiempo");
const score = document.querySelector(".score");
const fichas = document.querySelector(".fichas-coches")
const scorePerHit = 100
const timeDivider = 10
const scoreLossClick = 2

const dataPlayer = document.querySelector(".dataPlayer")
const nombreInput = document.getElementById("nombre-input")
const guardarNombreBoton = document.getElementById("boton-guardar-nombre")
guardarNombreBoton.addEventListener("click", guardarMejorPuntuacion)
nombreInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        guardarNombreBoton.click()
    }
})

const nombreRecord = document.getElementById("nombre-record")
const mejorScoreHTML = document.getElementById("mejor-score")

let numParejas = 3;
let cartaAnterior = null
let isPlaying = false
let segundos = 0
let cronometro
let aciertos = 0
let clicks = 0
let scoreNumber = 0
let bloqueado = false
let mejorScore = 0
let nombreJugador = null
botonesDificultad.forEach((boton, i) => {
    boton.addEventListener("click", () => {
        numParejas = i + 3;

        botonesDificultad.forEach(b => b.classList.remove("active"));
        boton.classList.add("active");

        board.classList.toggle("medio", numParejas === 4)
        board.classList.toggle("dificil", numParejas === 5)

        reset()

        crearTablero()

    });
});

function crearTablero() {

    board.innerHTML = ""

    let cartas = [];

    for (let i = 0; i < numParejas; i++) {
        cartas.push({ id: i, imagen: imagenes[i] })
        cartas.push({ id: i, imagen: imagenes[i] })
    }

    cartas.sort(() => Math.random() - 0.5)

    cartas.forEach(carta => {

        const card = document.createElement("div")
        card.classList.add("card")
        card.dataset.id = carta.id
        card.emparejado = false
        const img = document.createElement("img")
        img.src = carta.imagen

        card.appendChild(img)
        board.appendChild(card)


    });
}

crearTablero();

function reset() {
    clearInterval(cronometro)
    isPlaying = false
    segundos = 0
    aciertos = 0
    clicks = 0
    scoreNumber = 0
    cartaAnterior = null
    temporizador.textContent = "00:00"
    botonPlay.addEventListener("click", startGame)
    actualizarScore()
    limpiarFichas()
    ocultarDataPlayer()
}
function timer() {
    segundos++

    const minutos = Math.floor(segundos / 60)
    const segundosRestantes = segundos % 60

    temporizador.textContent = `${String(minutos).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`
}
function startGame() {
    isPlaying = true
    cronometro = setInterval(timer, 1000)
    botonPlay.removeEventListener("click", startGame)
}
const sonidoAcierto = new Audio("sound/ironman.mp3")
const sonidoFallo = new Audio("sound/mario.mp3")
function jugar(event) {
    if (!isPlaying || bloqueado) return
    const card = event.target.closest(".card")

    if (!card) return
    if (card.emparejado) return
    if (card === cartaAnterior) return

    card.classList.add("visible")

    if (cartaAnterior === null) {
        cartaAnterior = card
        reproducirSonido(sonidoAcierto)
        return
    }

    if (cartaAnterior.dataset.id === card.dataset.id) {
        reproducirSonido(sonidoAcierto)
        cartaAnterior.emparejado = true
        card.emparejado = true
        cartaAnterior = null
        aciertos++
        scoreNumber += scorePerHit * numParejas
        actualizarScore()

        if (aciertos === numParejas) {
            stopGame()
        }
    } else {
        reproducirSonido(sonidoFallo)
        bloqueado = true

        scoreNumber -= scoreLossClick * clicks

        if (scoreNumber <= 0) scoreNumber = 0
        actualizarScore()

        const primeraCarta = cartaAnterior

        setTimeout(() => {
            primeraCarta.classList.remove("visible")
            card.classList.remove("visible")
            cartaAnterior = null
            bloqueado = false
        }, 300)
    }
    clicks++
}

function stopGame() {
    clearInterval(cronometro)
    isPlaying = false
    scoreNumber -= Math.floor(segundos / timeDivider)
    if (scoreNumber <= 0) scoreNumber = 0
    actualizarScore()
    crearFichasTecnicas()
    mostrarDataPlayer()
}
function actualizarScore() {
    score.textContent = String(scoreNumber).padStart(4, "0")
}
function crearFichasTecnicas() {

    limpiarFichas()
    for (let i = 0; i < numParejas; i++) {
        const coche = fichasTecnicas[i]

        const div = document.createElement("div")
        div.classList.add("ficha-coche", "alpine")

        const img = document.createElement("img")
        img.src = imagenes[i]
        img.alt = coche.nombre

        const nombre = document.createElement("h2")
        nombre.textContent = coche.nombre

        const potencia = document.createElement("p")
        potencia.textContent = `Potencia: ${coche.potencia}`

        const motor = document.createElement("p")
        motor.textContent = `Motor: ${coche.motor}`

        const aceleracion = document.createElement("p")
        aceleracion.textContent = coche.aceleracion

        const peso = document.createElement("p")
        peso.textContent = `Peso: ${coche.peso}`

        div.appendChild(img)
        div.appendChild(nombre)
        div.appendChild(potencia)
        div.appendChild(motor)
        div.appendChild(aceleracion)
        div.appendChild(peso)

        fichas.appendChild(div)
    }
}
function limpiarFichas() {
    fichas.innerHTML = ""
}
const volumen = document.getElementById("volumen")
function reproducirSonido(sonido) {
    sonido.currentTime = 0
    sonido.volume = volumen.value
    sonido.play()
}
function guardarMejorPuntuacion() {
    if (nombreInput.value === "" || scoreNumber <= mejorScore) return

    mejorScore = scoreNumber
    nombreJugador = nombreInput.value

    nombreRecord.textContent = nombreJugador.trim()
    mejorScoreHTML.textContent = `MEJOR: ${String(mejorScore).padStart(4, "0")}`

    ocultarDataPlayer()
}
function mostrarDataPlayer() {
    dataPlayer.hidden = false
}

function ocultarDataPlayer() {
    dataPlayer.hidden = true
}
