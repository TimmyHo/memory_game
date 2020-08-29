const states = {
    // start with nothing
    // use done-main_title.css
    STEP0__default: 0,
    // add in gameboard row
    // (modify the look)
    // use done-gameboard.css
    STEP1__show_card_icons: 1,
    STEP2__fill_all_cards_with_icons: 2,
    STEP3__randomize_card_icons: 3,
    STEP4__click_cards_selected_icon: 4,
    STEP5__check_two_cards_for_match: 5,
    STEP6__check_two_cards_for_no_match: 6,
    STEP7__add_win_condition: 7,
    STEP8__add_click_card_checks: 8,

    // add in inforow and message
    STEP9__add_message: 9,
    // add in reset button
    STEP10__add_reset_button: 10,
    STEP11__reset_clears_board_classes: 11,
    // add in timer display
    STEP12__add_timer_button: 12,
    // add in best time display
    STEP13__add_best_time: 13,
    // just play
    // then add in sound button
    STEP14__add_sound: 14

    // use full-*.css
    // upload to heroku
}

let currentState = states.STEP14__add_sound;

// currentState = states.STEP14__add_sound;
for (let state in states) {
    if (currentState === states[state]) {
        console.log(`The current state is: ${state}`);
    }
}

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

icons = [
    '<i class="fas fa-basketball-ball"></i>',
    '<i class="fas fa-dragon"></i>',
    '<i class="fas fa-atom"></i>',
    '<i class="fas fa-grin-beam"></i>',
    '<i class="fas fa-hippo"></i>',
    '<i class="fas fa-home"></i>',
    '<i class="fas fa-heart"></i>',
    '<i class="fas fa-umbrella"></i>',
    '<i class="fas fa-tree"></i>',
    '<i class="fas fa-meteor"></i>'
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
let isSoundEnabled = true;

let audioFoundTimeout;
let audioWrongTimeout;
let audioWonGameTimeout;
let clearShowingCardsTimeout;

let stopwatch;
let timeTaken = document.querySelector('#timeTaken');
let timeTakenInMs = 0;
let bestTimeValue;

let soundButton = document.querySelector('#soundButton');
let resetButton = document.querySelector('#resetButton');

function generateDoubleArrWithFixedInd(arrLen) {
    let arr = [];
    for (let i = 0; i < arrLen * 2; i++) {
        arr.push(Math.floor(i/2));
    }
    return arr;
}

function generateRepeatingArrWithFixedInd(arrLen) {
    let arr = [];
    for (let i = 0; i < arrLen * 2; i++) {
        arr.push(i % arrLen);
    }
    return arr;
}

function generateArrWithRandomInd(arrLen, numRand) {
    numsToPick = []
    for (let i = 0; i < numRand; i++) {
        numsToPick.push(i);
    }

    arr = []
    for (let i = 0; i < arrLen; i++) {
        let ind = Math.floor(Math.random() * numsToPick.length);
        arr.push(numsToPick[ind]);
        numsToPick.splice(ind, 1);
    }

    return arr;
}

// Given an array ie: [1,2,3,4,5], randomize it so it is like [3,1,5,4,2]
function randomizeArray(arr) {
    newArr = [];
    while (arr.length > 0) {
        let ind = Math.floor(Math.random() * arr.length);
        newArr.push(arr[ind]);
        arr.splice(ind,1);
    }
    return newArr;
}

function resetGame() {
    if (currentState >= states.STEP9__add_message) {
        message.innerHTML = "&nbsp;";
    }

    if (currentState >= states.STEP12__add_timer_button) {
        timeTakenInMs = 0;
        timeTaken.innerHTML = "--";
    }

    if (currentState >= states.STEP13__add_best_time) {
        bestGameTime.classList.remove('newBestTime');
    }

    if (currentState >= states.STEP14__add_sound) {
        if (isSoundEnabled) {
            stopAudio();
        }
        updateSoundIcon();
    }

    newMemoryGame();
}

function newMemoryGame() {
    if (currentState >= states.STEP11__reset_clears_board_classes) {
        resetGameBoard();
    }

    if (currentState >= states.STEP2__fill_all_cards_with_icons) {
        shouldGenerateFixed = true;

        wonGame = false;
        gameStarted = false;

        newArr = [];
        if (shouldGenerateFixed) {
            arrInd = generateDoubleArrWithFixedInd(10);
//            arrInd = generateRepeatingArrWithFixedInd(10);
            newArr = arrInd;

            if (currentState >= states.STEP3__randomize_card_icons) {
                newArr = randomizeArray(newArr); 
            }
        }
        else {
        //     arrInd = generateArrWithRandomInd(cards.length / 2, icons.length);
            
        //     //  want to have 2 of each card
        //     newArr = arrInd.concat([...arrInd]);

        //    newArr = randomizeArray(arrInd);   
        } 

        for (let i = 0; i < cards.length; i++) {
            cards[i].innerHTML = icons[newArr[i]];
        }
    } else {
        if (currentState === states.STEP0__default) {
            for (let i = 0; i < cards.length; i++) {
                cards[i].innerHTML = (i+1);
            }
        }
        else if (currentState === states.STEP1__show_card_icons) {
            for (let i = 0; i < icons.length; i++) {
                cards[i].innerHTML = icons[i];
            }
        }
    }
}

function resetGameBoard() {
    if (currentState >= states.STEP10__add_reset_button) {
        selectedCards = [];
        numFound = 0;

        for (let i = 0; i < isFound.length; i++) {
            isFound[i] = false
        }

        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('selected');
            cards[i].classList.remove('found');
        }

        if (currentState >= states.STEP12__add_timer_button) {
            clearInterval(stopwatch);
        }
    }
}

function startGameTimer() {
    if (currentState >= states.STEP12__add_timer_button) {
        stopwatch = setInterval(function() {
            timeTakenInMs += 100;
            timeTaken.textContent = (timeTakenInMs / 1000).toFixed(1);
        }, 100);
        gameStarted = true;
    }
}

function setNewBestTime() {
    if (currentState >= states.STEP13__add_best_time) {
        bestTimeValue = timeTakenInMs;
        bestTimeTaken.innerHTML = (bestTimeValue / 1000).toFixed(1);
        bestGameTime.classList.add('newBestTime');
    }
}

function toggleSound() {
    if (currentState >= states.STEP14__add_sound) {
        isSoundEnabled = !isSoundEnabled;
        updateSoundIcon();
    }
}

function updateSoundIcon() {   
    if (currentState >= states.STEP14__add_sound) {
        if (isSoundEnabled) {
            soundButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        else {
            soundButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }
}

function playFoundAudio() {
    if (currentState >= states.STEP14__add_sound) {
        audioFound.play();
        
        audioFoundTimeout = setTimeout(function() {
            audioFound.pause();
            audioFound.currentTime = 0;
        },
        1000);
    }
}

function playWrongAudio() {
    if (currentState >= states.STEP14__add_sound) {   
        audioWrong.play();

        audioWrongTimeout = setTimeout(function() {
            audioWrong.pause();
            audioWrong.currentTime = 0;
        }, 500);
    }
}

function playWonGameAudio() {
    if (currentState >= states.STEP14__add_sound) {
        audioWonGame.play();
    }
}

function stopAudio() {
    if (currentState >= states.STEP14__add_sound) {
        audioWrong.pause();
        audioWrong.currentTime = 0;
        audioFound.pause();
        audioFound.currentTime = 0;
        audioWonGame.pause();
        audioWonGame.currentTime = 0;
    }
}

function clearShowingCards() {
    if (currentState >= states.STEP5__check_two_cards_for_match) {
        isShowing = false;

        for (let k = 0; k < selectedCards.length; k++) {                    
            cards[selectedCards[k]].classList.remove('selected');
        }

        selectedCards = [];
    }
}

function clickCardEvent(event) {
    if (currentState == states.STEP4__click_cards_selected_icon) {
        this.classList.add('selected');
    }
    else if (currentState >= states.STEP5__check_two_cards_for_match) {
        
        if (currentState >= states.STEP12__add_timer_button) {
            if (!gameStarted) {
                startGameTimer();
            }
        }

        if (currentState < states.STEP8__add_click_card_checks || 
            (!wonGame && 
            isFound[this.id] !== true && // if the card is already found
            // if the card is not selected
            (selectedCards === 0 || selectedCards[0] !== this.id))) {    

            if (currentState >= states.STEP14__add_sound) {
                if (isSoundEnabled) {
                    clearInterval(audioWrongTimeout);
                    clearInterval(audioFoundTimeout);
                    stopAudio();
                }
            }

            if (isShowing) {
                clearInterval(clearShowingCardsTimeout)
                clearShowingCards();
            }

            if (currentState >= states.STEP9__add_message) {
                message.innerHTML = "&nbsp;";
            }
        
            selectedCards.push(this.id);
            let isMatch = true;
            for (let j = 1; j < selectedCards.length; j++) {
                if (cards[selectedCards[j]].innerHTML !== cards[selectedCards[0]].innerHTML) {
                    isMatch = false;
                    break;
                }
            }

            this.classList.add('selected');
            if (currentState >= states.STEP6__check_two_cards_for_no_match &&
                isMatch === false) {
                isShowing = true;
                
                if (currentState >= states.STEP9__add_message) {
                    message.innerHTML = "可惜不一樣 :(";
                }

                if (currentState >= states.STEP14__add_sound) {
                    if (isSoundEnabled) {
                        playWrongAudio();
                    }
                }

                clearShowingCardsTimeout = setTimeout(clearShowingCards, 1000);
            } else if (isMatch === true) {
                if (selectedCards.length === 2) {
                    for(let k = 0; k < selectedCards.length; k++) {
                        cards[selectedCards[k]].classList.add('found');
                        cards[selectedCards[k]].classList.remove('selected');
                        isFound[selectedCards[k]] = true;
                        numFound += 1
                    }
                    
                    selectedCards = [];

                    if (currentState >= states.STEP7__add_win_condition) {
                        if (numFound === cards.length) {
                            if (currentState >= states.STEP7__add_win_condition &&
                                currentState < states.STEP9__add_message) {
                                    setTimeout("alert('恭喜完成!!');", 1);
                            }
                            wonGame = true;

                            if (currentState >= states.STEP9__add_message) {
                                message.innerHTML = "恭喜完成!!"
                            }

                            if (currentState >= states.STEP12__add_timer_button) {
                                clearInterval(stopwatch);
                            }

                            if (currentState >= states.STEP13__add_best_time) {
                                if (!bestTimeValue || timeTakenInMs < bestTimeValue) {
                                    setNewBestTime();
                                }
                            }
                            
                            if (currentState >= states.STEP14__add_sound) {
                               if (isSoundEnabled) {
                                    playWonGameAudio();
                                }
                            }
                        }
                        else {
                            if (currentState >= states.STEP9__add_message) {
                                message.innerHTML = "你好棒棒！"
                            }

                            
                            if (currentState >= states.STEP14__add_sound) {
                                if (isSoundEnabled) {
                                    playFoundAudio();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

if (currentState >= states.STEP4__click_cards_selected_icon) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].id = i;
        cards[i].addEventListener("click", clickCardEvent);
    }
}

if (currentState >= states.STEP10__add_reset_button) {
    resetButton.addEventListener("click", resetGame);
}

if (currentState >= states.STEP14__add_sound) {
    soundButton.addEventListener("click", toggleSound);
}

resetGame();
