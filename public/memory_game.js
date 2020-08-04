let cards = document.querySelectorAll('.card');

let icons = [
    '<i class="fas fa-baby"></i>',
    '<i class="fas fa-basketball-ball"></i>',
    '<i class="fas fa-cat"></i>',
    '<i class="fab fa-earlybirds"></i>',
    '<i class="far fa-dizzy"></i>',
    '<i class="fas fa-dog"></i>',
    '<i class="fas fa-hippo"></i>',
    '<i class="fas fa-hiking"></i>',
    '<i class="fas fa-monument"></i>',
    '<i class="far fa-money-bill-alt"></i>',
    
    '<i class="fas fa-podcast"></i>',
    '<i class="fas fa-bowling-ball"></i>',
    '<i class="fas fa-chalkboard-teacher"></i>',
    '<i class="fas fa-bug"></i>',
    '<i class="fas fa-brain"></i>',
    '<i class="fas fa-microscope"></i>',
    '<i class="fas fa-meteor"></i>',
    '<i class="far fa-meh"></i>',
    '<i class="fas fa-seedling"></i>',
    '<i class="far fa-sad-cry"></i>'
]

let selectedCards = []
let isFound = []
let numFound = 0;

let gameStarted = false;
let wonGame = false;
let isShowing = false;


let message = document.querySelector('#message')
let audioFound = document.querySelector('#audioFound');
let audioWrong = document.querySelector('#audioWrong');
let audioWonGame = document.querySelector('#audioWonGame');
let isPlayingAudio = false;
let isSoundEnabled = true;

let stopwatch;
let timeTaken = document.querySelector('#timeTaken');
let timeTakenInMs = 0;
let bestTimeValue;


function generateArrWithRandomInd(arrLen, numRand) {
    numsToPick = []
    for (let i = 0; i < numRand; i++) {
        numsToPick.push(i);
    }

    arr = []
    for (let i = 0; i < arrLen; i++) {
        let ind = Math.floor(Math.random() * numsToPick.length);
        arr.push(numsToPick[ind]);
        numsToPick.splice(ind,1);
    }

    return arr;
}

// Given an array ie: [1,2,3,4,5], randomize it so it is like [3,1,5,4,2]
function randomizeArray(arr) {
    newArr = []
    while (arr.length > 0) {
        let ind = Math.floor(Math.random() * arr.length);
        newArr.push(arr[ind]);
        arr.splice(ind,1);
    }
    return newArr;
}

function resetGame() {
    message.innerHTML = "&nbsp;";

    timeTakenInMs = 0;
    timeTaken.innerHTML = "--";
    
    bestGameTime.classList.remove('newBestTime');

    if (isSoundEnabled) {
        stopAudio();
    }

    newMemoryGame();

}

function newMemoryGame() {
    resetGameBoard();

    wonGame = false;
    gameStarted = false;

    arrInd = generateArrWithRandomInd(cards.length / 2, icons.length);
    // want to have 2 of each card
    arrInd = arrInd.concat([...arrInd]);

    // for (let i = 0; i < cards.length; i++) {
    //     arrInd[i] = i % (cards.length / 2)
    // }

    newArr = randomizeArray(arrInd);    

    for (let i = 0; i < cards.length; i++) {
        cards[i].innerHTML = icons[newArr[i]];
    }
}

function resetGameBoard() {
    selectedCards = [];
    numFound = 0;

    for (let i = 0; i < isFound.length; i++) {
        isFound[i] = false
    }

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('selected');
        cards[i].classList.remove('found');
    }

    clearInterval(stopwatch);
}

function playFoundAudio() {
    audioFound.play();
    isPlayingAudio = true;
    setTimeout(function() {
        if (isPlayingAudio) {
            audioFound.pause();
            audioFound.currentTime = 0;
            isPlayingAudio = false;
        }
    },
    1000);
}

function playWrongAudio() {
    audioWrong.play();
    isPlayingAudio = true;

    setTimeout(function() {
        if (isPlayingAudio) {
            audioWrong.pause();
            audioWrong.currentTime = 0;
            isPlayingAudio = false;
        }
    }, 500);
}

function playWonGameAudio() {
    audioWonGame.play();
    isPlayingAudio = true; 
        
    // setTimeout(function() {
    //     audioWonGame.pause();
    //     audioWonGame.currentTime = 0;
    // },
    // 1000);  
}

function stopAudio() {
    isPlayingAudio = false;
    audioFound.pause();
    audioFound.currentTime = 0;
    audioWrong.pause();
    audioWrong.currentTime = 0;
    audioWonGame.pause();
    audioWonGame.currentTime = 0;
}

function startGameTimer() {
    stopwatch = setInterval(function() {
        timeTakenInMs += 100;
        timeTaken.textContent = (timeTakenInMs / 1000).toFixed(1);
    }, 100);
    gameStarted = true;
}

function setNewBestTime() {
    bestTimeValue = timeTakenInMs;
    bestTimeTaken.innerHTML = (bestTimeValue / 1000).toFixed(1);
    bestGameTime.classList.add('newBestTime');
}

function clearShowingCards() {
    if (isShowing) {
        isShowing = false;

        for (let k = 0; k < selectedCards.length; k++) {                    
            cards[selectedCards[k]].classList.remove('selected');
        }

        selectedCards = [];
    }
}

function clickCardEvent(event) {
    if (!gameStarted) {
        startGameTimer();
    }

    if (!wonGame && 
        isFound[this.id] !== true && // if the card is already found
        // if the card is not selected
        (selectedCards === 0 || selectedCards[0] !== this.id)) {

        if (isShowing) {
            clearShowingCards();
        }

        if (isPlayingAudio) {
            stopAudio();
        }

        selectedCards.push(this.id);
        message.innerHTML = "&nbsp;";

        let isMatch = true;
        for (let j = 1; j < selectedCards.length; j++) {
            if (cards[selectedCards[j]].innerHTML !== cards[selectedCards[0]].innerHTML) {
                isMatch = false;
                break;
            }
        }

        this.classList.add('selected');
        if (isMatch === false) {
            isShowing = true;
            message.innerHTML = "可惜不一樣 :(";

            if (isSoundEnabled) {
                playWrongAudio();
            }

            setTimeout(clearShowingCards, 1000);
        } else {
            if (selectedCards.length === 2) {
                for(let k = 0; k < selectedCards.length; k++) {
                    cards[selectedCards[k]].classList.add('found');
                    cards[selectedCards[k]].classList.remove('selected');
                    isFound[selectedCards[k]] = true;
                    numFound += 1
                }
                
                selectedCards = [];
                if (numFound === cards.length) {
                    wonGame = true;
                    message.innerHTML = "恭喜完成!!"

                    if (isSoundEnabled) {
                        playWonGameAudio();
                    }
                    clearInterval(stopwatch);
                    
                    if (!bestTimeValue || timeTakenInMs < bestTimeValue) {
                        setNewBestTime();
                    }
                }
                else {
                    message.innerHTML = "你好棒棒！"

                    if (isSoundEnabled) {
                        playFoundAudio();
                    }
                }
            }
        }
    }
}


document.querySelector('#resetButton').addEventListener("click", resetGame);

for (let i = 0; i < cards.length; i++) {
    cards[i].id = i;
    cards[i].addEventListener("click", clickCardEvent);
}

resetGame();