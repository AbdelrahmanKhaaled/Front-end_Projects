let letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

const lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
    let span = document.createElement("span");

    let letterNode = document.createTextNode(letter);

    span.classList.add("letter-box")

    span.appendChild(letterNode);
    
    lettersContainer.appendChild(span)
})

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

let allKeys = Object.keys(words);

let randomIndexKey = Math.floor(Math.random() * allKeys.length);
let randomCat = allKeys[randomIndexKey];
let keyArray = words[randomCat];

let randomIndexword = Math.floor(Math.random() * keyArray.length);
let randomWord = keyArray[randomIndexword];
// let keyArray = allKeys[randomCat];

// console.log(allKeys)
// console.log(randomCat)
// console.log(keyArray)
// console.log(randomWord)

document.querySelector(".category span").innerHTML = randomCat

const lettersGuessContainer = document.querySelector(".letters-guess");

let lettersAndSpace = Array.from(randomWord);

lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");

    if (letter === ' ')
        emptySpan.classList.add("with-space");

    lettersGuessContainer.appendChild(emptySpan);
})

let wrongAttempts = 0;

let guessSpans = document.querySelectorAll(".letters-guess span")

let theDraw = document.querySelector(".hangman-draw")

document.addEventListener("click", (e) => {
    let status;
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked")
        status = false
    }

    let clickedLetter = e.target.innerHTML

    lettersAndSpace.forEach((wordLetter, index) => {
        if (wordLetter.toLowerCase() === clickedLetter.toLowerCase()) {
            guessSpans[index].innerHTML = clickedLetter
            status = true
            document.getElementById("success").play()   
        }
    })
    
    if (status === false) {
        wrongAttempts++;
        theDraw.classList.add(`wrong-${wrongAttempts}`)

        document.getElementById("fail").play()
        if (wrongAttempts === 8) {
            endGame();
        }
    }
        
})

function endGame() {
    let div = document.createElement("div")

    let divText = document.createTextNode(`Game Over, The word is ${randomWord}`);

    div.appendChild(divText);

    div.className = 'popup'

    document.body.appendChild(div)
}

