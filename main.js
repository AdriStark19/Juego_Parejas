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
const temporizador = document.querySelector(".tiempo");
const score = document.querySelector(".score");
let indice = 3;
let cartaAnterior = null
let isPlaying = false
let segundos = 0
let cronometro
let aciertos = 0
let clicks = 0
let scoreNumber = 0
botonesDificultad.forEach((boton, i) => {
    boton.addEventListener("click", () => {
        indice = i + 3;
        board.classList.toggle("medio", indice === 4)
        board.classList.toggle("dificil", indice === 5)

        reset()

        botonPlay.removeEventListener("click", startGame)
        botonPlay.addEventListener("click", startGame)

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

function reset() {
    clearInterval(cronometro)
    isPlaying = false
    segundos = 0
    aciertos = 0
    clicks = 0
    scoreNumber = 0
    cartaAnterior = null
    temporizador.textContent = "00:00"
    score.textContent = "0000"
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

function jugar(event) {
    if (!isPlaying) return
    const card = event.currentTarget
    let win = false;
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
            actualizarScore()
            if (aciertos === indice) {
                win = true;
                stopGame(win)
            }
        } else {

            scoreNumber -= 2
            if (scoreNumber <= 0) scoreNumber = 0
            actualizarScore()
            setTimeout(() => {
                cartaAnterior.classList.remove("visible")
                card.classList.remove("visible")
                cartaAnterior = null
            }, 300)
        }
        clicks++
    }
}
function stopGame(win) {
    clearInterval(cronometro)
    isPlaying = false
    scoreNumber -= Math.floor(segundos / 10)
    actualizarScore()
    if(win){
        crearFichasTecnicas()
    }
}
function actualizarScore() {
    score.textContent = String(scoreNumber).padStart(4, "0")
}
function crearFichasTecnicas(){
    const fichas = document.querySelector(".fichas-coches")
    while (fichas.firstChild) {
        fichas.firstChild.remove()
    }

     fichasTecnicas.forEach((coche, i) => {
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
    })
}

