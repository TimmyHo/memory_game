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
    '<i class="far fa-money-bill-alt"></i>'
]

let selectedCards = []
let isFound = []
let numFound = 0;
let wonGame = false;
let isShowing = false;

let message = document.querySelector('#message')
let audioFound = document.querySelector('#audioFound');
let audioWrong = document.querySelector('#audioWrong');
let audioWonGame = document.querySelector('#audioWonGame');


let timeTakenValue = 0;
let timeTaken = document.querySelector('#timeTaken');
let bestTimeValue;
let stopwatch;
let gameStarted = false;
function randomizeArray(arr) {
    newArr = []
    while (arr.length > 0) {
        let ind = Math.floor(Math.random() * arr.length);
        newArr.push(arr[ind]);
        arr.splice(ind,1);
    }
    return newArr;
}

arrInd = []
for (let i = 0; i < 20; i++) {
    arrInd[i] = i % 10
}

newArr = randomizeArray(arrInd);

for (let i =0; i < cards.length; i++) {
    cards[i].innerHTML = icons[newArr[i]];
}
    


document.querySelector('#resetButton').addEventListener("click",function() {
    selectedCards = []
    
    for (let i = 0; i < isFound.length; i++) {
        isFound[i] = false
    }

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('selected');
        cards[i].classList.remove('found');
    }
    message.innerHTML = "&nbsp;";
    wonGame = false;
    numFound = 0;

    timeTakenValue = 0.0;
    timeTaken.innerHTML = "--";
    gameStarted = false;

    arrInd = []
for (let i = 0; i < 20; i++) {
    arrInd[i] = i % 10
}

newArr = randomizeArray(arrInd);

for (let i =0; i < cards.length; i++) {
    cards[i].innerHTML = icons[newArr[i]];
}
    
clearInterval(stopwatch);

})

for (let i = 0; i < cards.length; i++) {
    cards[i].id = i;

    isFound[i] = false;

    cards[i].addEventListener("click", function(event) {
        if (!wonGame && !gameStarted) {
            stopwatch = setInterval(function() {
                timeTakenValue =  (timeTakenValue+1);
                timeTaken.textContent = (timeTakenValue / 10).toFixed(1);
            }, 100);
            gameStarted = true;
        }
        if (!wonGame && isFound[this.id] !== true &&
            (selectedCards === 0 || selectedCards[0] !== this.id)) {

            if (isShowing === true) {
                    audioWrong.pause();
                    audioWrong.currentTime = 0;
                    
                    isShowing = false;
                    for (let k = 0; k < selectedCards.length; k++) {
                
                        cards[selectedCards[k]].classList.remove('selected');
                   
                }
    
                selectedCards = [];
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
            message.innerHTML = "可惜不一樣 :(";
            isShowing = true;
            audioWrong.play();

            setTimeout(function() {
                    audioWrong.pause();
                    audioWrong.currentTime = 0;
    
            }, 500)
            setTimeout(function() {
                if (isShowing) {
                isShowing = false;

            for (let k = 0; k < selectedCards.length; k++) {
                
                    cards[selectedCards[k]].classList.remove('selected');
               
            }

            selectedCards = [];
        }
        }, 1000);
        } else {
            if (selectedCards.length === 2) {
                cards[selectedCards[0]].classList.add('found');
                cards[selectedCards[0]].classList.remove('selected');
                
                cards[selectedCards[1]].classList.add('found');
                cards[selectedCards[1]].classList.remove('selected');
                
                isFound[selectedCards[0]] = true;
                isFound[selectedCards[1]] = true;
                numFound += 2;
                selectedCards = [];
                if (numFound === 20) {
                    wonGame = true;
                    message.innerHTML = "恭喜完成!!"
                    audioWonGame.play();
                    // setTimeout(function() {
                    //     audioFound.pause();
                    //     audioFound.currentTime = 0;
                    // },
                    // 1000);
                    clearInterval(stopwatch);
                    
                    if (!bestTimeValue || timeTakenValue < bestTimeValue) {
                        bestTimeValue = timeTakenValue;
                        bestTimeTaken.innerHTML = (bestTimeValue / 10).toFixed(1);
                    }
                }
                else {
                    message.innerHTML = "你好棒棒！"
                    audioFound.play();
                    setTimeout(function() {
                        audioFound.pause();
                        audioFound.currentTime = 0;
                    },
                    1000);
                }

            }
        }
        } 

    })
}