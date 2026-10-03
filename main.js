
const coches = [
    {
        imagen: "img/alpine_a290.jpg",
        nombre: "Alpine A290",
        potencia: "220 CV",
        motor: "Eléctrico",
        aceleracion: "0-100 km/h: 6,4 s",
        peso: "1.479 kg"
    },
    {
        imagen: "img/alpine_ultime.jpg",
        nombre: "Alpine A110 R Ultime",
        potencia: "345 CV",
        motor: "1.8 Turbo",
        aceleracion: "0-100 km/h: 3,8 s",
        peso: "1.082 kg"
    },
    {
        imagen: "img/alpine-a390.jpg",
        nombre: "Alpine A390",
        potencia: "Hasta 470 CV",
        motor: "Eléctrico AWD",
        aceleracion: "0-100 km/h: 3,9 s",
        peso: "≈ 2.100 kg"
    },
    {
        imagen: "img/a110.jpg",
        nombre: "Alpine A110",
        potencia: "252 CV",
        motor: "1.8 Turbo",
        aceleracion: "0-100 km/h: 4,5 s",
        peso: "≈ 1.102 kg"
    },
    {
        imagen: "img/a110Gts.jpeg",
        nombre: "Alpine A110 GTS",
        potencia: "300 CV",
        motor: "1.8 Turbo",
        aceleracion: "0-100 km/h: 4,2 s",
        peso: "≈ 1.110 kg"
    }
];

const botonesDificultad = document.querySelectorAll(".difficulty-option")
const board = document.querySelector(".board")
const botonPlay = document.querySelector(".play-button");
const temporizador = document.querySelector(".tiempo");
const score = document.querySelector(".score");
const fichas = document.querySelector(".fichas-coches")
const scorePerHit = 100
const timeDivider = 10
const scoreLossClick = 2
const facil = 3
const media = 4
const dificil = 5

const dataPlayer = document.querySelector(".dataPlayer")
const nombreInput = document.getElementById("nombre-input")
const guardarNombreBoton = document.getElementById("boton-guardar-nombre")

const nombreRecord = document.getElementById("nombre-record")
const mejorScoreHTML = document.getElementById("mejor-score")

const volumen = document.getElementById("volumen")
const sonidoAcierto = new Audio("sound/ironman.mp3")
const sonidoFallo = new Audio("sound/mario.mp3")


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

botonPlay.addEventListener("click", startGame);

document.addEventListener("keydown", (event) => {
    if (event.target.tagName === "INPUT") return
    if (event.key.toLowerCase() === "t") {
        swapTheme();
    }
});

guardarNombreBoton.addEventListener("click", guardarMejorPuntuacion)
nombreInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        guardarNombreBoton.click()
    }
})
board.addEventListener("click", jugar)
botonesDificultad.forEach((boton, i) => {
    boton.addEventListener("click", () => {
        numParejas = i + facil;

        botonesDificultad.forEach(b => b.classList.remove("active"));
        boton.classList.add("active");

        board.classList.toggle("medio", numParejas === media)
        board.classList.toggle("dificil", numParejas === dificil)

        reset()

        crearTablero()

    });
});
function swapTheme() {
    document.body.classList.toggle("dark")
}
function crearTablero() {

    board.innerHTML = ""

    let cartas = [];

    for (let i = 0; i < numParejas; i++) {
        cartas.push({ id: i, imagen: coches[i].imagen })
        cartas.push({ id: i, imagen: coches[i].imagen })
    }

    fisherYates(cartas)

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

crearTablero()

function reset() {
    clearInterval(cronometro)
    isPlaying = false
    segundos = 0
    aciertos = 0
    clicks = 0
    scoreNumber = 0
    cartaAnterior = null
    bloqueado = false
    temporizador.textContent = "00:00"
    actualizarScore()
    limpiarFichas()
    ocultarDataPlayer(true)
}
function timer() {
    segundos++

    const minutos = Math.floor(segundos / 60)
    const segundosRestantes = segundos % 60

    temporizador.textContent = `${String(minutos).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`
}
function startGame() {
    if (isPlaying) return
    isPlaying = true
    cronometro = setInterval(timer, 1000)
}

function jugar(event) {
    if (!isPlaying || bloqueado) return
    const card = event.target.closest(".card")

    if (!card) return
    if (card.emparejado) return
    if (card === cartaAnterior) return

    clicks++

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
    
}

function stopGame() {
    clearInterval(cronometro)
    isPlaying = false
    scoreNumber -= Math.floor(segundos / timeDivider)
    if (scoreNumber <= 0) scoreNumber = 0
    actualizarScore()
    crearFichasTecnicas()
    ocultarDataPlayer(false)
}
function actualizarScore() {
    score.textContent = String(scoreNumber).padStart(4, "0")
}
function crearFichasTecnicas() {

    limpiarFichas()
    for (let i = 0; i < numParejas; i++) {
        const coche = coches[i]

        const div = document.createElement("div")
        div.classList.add("ficha-coche", "alpine")

        const img = document.createElement("img")
        img.src = coche.imagen
        img.alt = coche.nombre
        div.appendChild(img)

        const nombre = document.createElement("h2")
        nombre.textContent = coche.nombre
        div.appendChild(nombre)

        const datos = [
            `Potencia: ${coche.potencia}`,
            `Motor: ${coche.motor}`,
            coche.aceleracion,
            `Peso: ${coche.peso}`
        ]

        datos.forEach(dato => {
            const p = document.createElement("p")
            p.textContent = dato
            div.appendChild(p)
        })

        fichas.appendChild(div)
    }
}

function limpiarFichas() {
    fichas.innerHTML = ""
}

function reproducirSonido(sonido) {
    sonido.currentTime = 0
    sonido.volume = volumen.value
    sonido.play().catch(error => {
        console.error("No se pudo reproducir el sonido:", error)
    })
}
function guardarMejorPuntuacion() {
    if (nombreInput.value.trim() === "" || scoreNumber <= mejorScore) return

    mejorScore = scoreNumber
    nombreJugador = nombreInput.value

    nombreRecord.textContent = nombreJugador.trim()
    mejorScoreHTML.textContent = `MEJOR: ${String(mejorScore).padStart(4, "0")}`

    ocultarDataPlayer(true)
}
function ocultarDataPlayer(mostrar) {
    dataPlayer.hidden = mostrar
}
function fisherYates(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temporal = cartas[i]
        cartas[i] = cartas[j]
        cartas[j] = temporal
    }
}