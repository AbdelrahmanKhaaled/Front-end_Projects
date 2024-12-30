document.querySelector(".control-buttons span").onclick = function () {
    
    let yourName = prompt("What's your name ?");

    if (yourName === null || yourName === "")
        document.querySelector(".name span").innerHTML = "Unknown"
    else
       document.querySelector(".name span").innerHTML = yourName

    document.querySelector(".control-buttons").remove() 
}

let game_BlockParent = document.querySelector(".memory-game-blocks");
let game_Blocks = Array.from(document.querySelectorAll(".memory-game-blocks .game-block"));

let blocksNumber = game_Blocks.length;

let orderRange = Array.from(Array(blocksNumber).keys())

let triesNumber = 0;

// console.log(orderRange)
shuffle(orderRange)
// console.log(orderRange)

game_Blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    
    block.onclick = function () {
        checkMatch(block);
    }
});


function checkMatch(block) {
    block.classList.add("is-flipped")

    let flippedBlocks = document.querySelectorAll(".is-flipped")

    if (flippedBlocks.length === 2) {

        game_BlockParent.classList.add("no-event")
        
        setTimeout(() => {game_BlockParent.classList.remove("no-event")}, 1000)
        has_Match(flippedBlocks[0], flippedBlocks[1]);
        // console.log(flippedBlocks)
    }
}

function shuffle(array) {
    let current = array.length - 1;
    let current2 = array.length - 1;
    let random, temp;
    while (current > 1) {

        random= Math.floor(Math.random() * current2);

        temp = array[current];
        array[current] = array[random]
        array[random] = temp

        current--;
    }
}

function has_Match(firstBlock , secondBlock) {
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")

        firstBlock.classList.add("has-match")
        secondBlock.classList.add("has-match")

        document.getElementById("success").play();
    }   
    else {
        triesNumber++;

        document.querySelector(".info .tries span").innerHTML = triesNumber
        setTimeout(() => {
        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")
        }, 1000)

        document.getElementById("fail").play();

    }
}