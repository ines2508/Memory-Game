
    
    var allCards = ["fa-diamond", "fa-anchor", "fa-bomb", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond",   "fa-bolt", "fa-bicycle", "fa-leaf", "fa-paper-plane-o", "fa-bomb","fa-cube"];

    var resetButton = document.querySelector(".restart");
    var startButton = document.querySelector(".start-button");
    var playAgain = document.querySelector(".play-again");
    var deck = document.querySelector(".deck");
    var clock = document.querySelector(".time-score");
    var clockPanel = document.querySelector(".clock-panel");
    


// ----------------------After Start Animation --------------------------------

    // Waiting till the finish of the animation to remove start deck

    setTimeout( function startDeck() {

        var startDeck = document.querySelector(".start-deck");
        startDeck.classList.remove("hide");

        var startAnimation = document.querySelector(".start-animation");
        startAnimation.classList.add("hide");
        
    
    }, 3000);


    // ------------------- Start ----------------------------

        function startGame() {


            var startDeck = document.querySelector(".start-deck");
            startDeck.classList.add("reset-card");
    
            setTimeout(function moveDeck() {
                startDeck.classList.add("hide");
                deck.classList.remove("hide");
                deck.classList.remove("win");
                deck.innerHTML = "";                
                var scorePanel = document.querySelector(".score-panel");
                scorePanel.classList.remove("hide");
            
                start();
    
            }, 1000);
        }
        
        startButton.addEventListener("click", startGame, false); 


// ---------------------- Cards shuffler -----------------------------

    function start() {       

    // Shuffle function from http://stackoverflow.com/a/2450976

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        };
        shuffle(allCards);
        
        var newList = shuffle(allCards);

// Bringing back score panel

        var scorePanel = document.querySelector(".score-panel");
        scorePanel.classList.remove("hide");


// Creat new Deck of Cards    

        deck.classList.remove("hide");
        deck.classList.add("start-card");

        var fragment = document.createDocumentFragment();

        function createDeck(list) {

            for (var i = 0; i < 16; i++) {
                
                var cardLi = document.createElement("li");
                    cardLi.classList.add("card");
                var symbolCard = document.createElement("i");
                    symbolCard.classList.add("fa", list[i]);
                    cardLi.appendChild(symbolCard);

                fragment.appendChild(cardLi);
            }
            return fragment;
        };

        var newDeck = createDeck(newList);

        // Insert new cards to deck in DOM

        deck.appendChild(newDeck);
        createDeck(newList);

        var symbolContainer = document.querySelectorAll(".card");
   
// ---------------------- Panel ---------------------------------
// Time counter is outside start function


        //Add and remove stars

        var movesNumber = document.querySelector(".moves");
        var userList = document.querySelectorAll(".match");

        function progressMeasure() {

            var stars = document.querySelectorAll(".stars i");
            var star1 = stars[0];
            var star2 = stars[1];
            var star3 = stars[2];            
            var countNumber = movesNumber.innerHTML;
            var allGoodCards = userList.length;
            var difference = countNumber - allGoodCards;

            if (difference < 17) {

                star1.classList.add("fa-star");
                star2.classList.add("fa-star");
                star3.classList.add("fa-star");

            } else if (difference >= 17 && difference < 25) {

                star1.classList.add("fa-star");
                star2.classList.add("fa-star");
                star3.classList.remove("fa-star");

            } else if (difference >= 25 && difference < 33) {

                star1.classList.add("fa-star");
                star2.classList.remove("fa-star");

            } else if (difference === 33) {

                star1.classList.remove("fa-star");

            } else {console.log(undefined)}
        }

        
        // Counts the number of moves based on lenght
        // of the all shown symbols (cards);

        function countMoves(list, start) {

        //    var movesText = document.querySelector(".moves-text");


            // Odd numbers are rounded down

            var count = Math.floor(list.length / 2);

            movesNumber.innerHTML = count;  

        }

// ---------------------- Cards checker --------------------------


// Animations for you won

        function youWon(keepNumber) {

            // Setting up Win screen

            setTimeout(function winMessage() {

                deck.classList.add("hide");
                var winMessage = document.querySelector(".win-message");
                winMessage.classList.remove("hide");

                // Show number of moves

                var movesNumber = document.querySelector(".moves").textContent;
                var movesMessage = document.querySelector(".moves-message");
                movesMessage.textContent = movesNumber;

                // Show game time
                var gameTime = document.querySelector(".game-time");
                gameTime.textContent = keepNumber;

                // Show stars number
                
                var stars = document.querySelectorAll(".stars .fa-star");
                var starMessage = document.querySelector(".star-number");
                starMessage.textContent =  stars.length;

                var scorePanel = document.querySelector(".score-panel");
                scorePanel.classList.add("hide");
           //     var timeScore = document.querySelector(".time-score");
            //    timeScore.disable = true;

            }, 1980); // Waiting till win card animation finish
            
       };


// Win list is based on match lenght array

        function checkWinList(timeZero) {
            
            var userList = document.querySelectorAll(".match");

                if (userList.length === 16) {

                    // Storing time number

                    var keepNumber = clock.innerHTML;
                    clock.classList.add("hide");
                    clockPanel.classList.add("hide");        

                    // adding win animation

                    for (var i = 0;  i < symbolContainer.length; i++) {
                        symbolContainer[i].classList.remove("match");
                        symbolContainer[i].classList.add("win");
                    }        
                    
                    youWon(keepNumber);

                } else {console.log(undefined)}
        };


// Disable click - to prevent from clicking when two cards are open

        function disableClick() {
            for (var i = 0; i < symbolContainer.length; i++){
                symbolContainer[i].classList.add("disable-click");
            }
        };


// Two cards open

        function checkOpenList(openList, card1, card2) {
    

            if (openList.length === 2) {

                disableClick()

                if (openList[0] === openList[1]) {
                    card2.classList.remove("open");
                    card1.classList.remove("open");
                    card2.classList.add("match");
                    card1.classList.add("match");

                    openCardList = [];

                } else if (openList[0] != openList[1]) {
                    
                    card2.classList.remove("open");
                    card1.classList.remove("open");
                    card2.classList.add("wrong");
                    card1.classList.add("wrong");

                    openCardList = [];
    
                    // Needed time to remember the cards

                    setTimeout(
                        function removeWrong(){
                            card2.classList.remove("show");
                            card1.classList.remove("show");        
                            card2.classList.remove("wrong");
                            card1.classList.remove("wrong");

                    },900)  // length of animation wrong is 500s
                            // plus added 400 for remembering                    
                }


                // No new cards will be shown during "remembering"

                setTimeout(
                    function ableClick(){

                        for (var i = 0; i < symbolContainer.length; i++){
                                                     
                            symbolContainer[i].classList.remove("disable-click");
                        
                        }   
                }, 900) // time needed to end animation and hide "show"

            } else  {console.log(undefined)};
        };


// Seting up Open List and Count List

        var openCardList = [];
        var countList = [];

        function checkCards(thisCard){
            
            var openCards = document.querySelectorAll(".open");
            var card1 = openCards[0];
            var card2 = openCards[1];

            var symbol = thisCard.querySelector(".show .fa").classList.item(1);
            
            // Array of open cards, need to check if cards match

            openCardList.push(symbol);
            checkOpenList(openCardList, card1, card2);

            // Lenght of countList is a number of clicks
            // which after dividing by 2 and rounding down
            // will give number of moves

            countList.push(symbol);
            countMoves(countList);


        };


// Add eventListener to the cards, 
// giving them "open" and "show" class
// Start checking if cards match 
// and if all cards are collected


        function afterClicking() {

            var thisCard = this;

            this.classList.add("open", "show");
                    
            progressMeasure();
            checkCards(thisCard);
            checkWinList();                   
        };


        function clickCard(){

            for (var i = 0; i < 500; i++) { 
                var oneCard = symbolContainer[i];
                
                oneCard.addEventListener("click", afterClicking, false);

            }
        };

        clickCard();

    }; // end of start() function


// ---------------------- Counter ------------------------------  
// Must be outside of start()  

var number0 = 0;

function counter() {

        // After first in deck EventListener is removed

        deck.removeEventListener("click", counter, false);

        // Producing seconds
        
        setTimeout(function(){

            number0 = number0 + 1;

        }, 1000)

        var clock2 = setTimeout("counter()", 1000);

        // Changing seconds into minutes

        var minuts = Math.floor(number0 / 60);
        var seconds = number0 - (minuts * 60);

        // Set up display for single number

        if (minuts < 10) {
            minuts = "0" + minuts;
        } else {minuts};
    
        if (seconds < 10) {
            seconds = "0" + seconds;
        } else {seconds};

        clock.textContent = `${minuts}:${seconds}`;


        // Reseting time

        function stop() {
            clearTimeout(clock2);
            clock.textContent = `00:00`
            number0 = 0;
        }


        resetButton.addEventListener("click", stop, false);
        playAgain.addEventListener("click", stop, false);

        if (clockPanel.classList.contains("hide")) {
            stop();
            lastCard.removeEventListener("click", stop, false);

        } else {console.log(undefined)};

        lastCard.addEventListener("click", stop, false);


}

    deck.addEventListener("click", counter, false);


// --------------------- Play Again ----------------------------


    function playAgainFunction() {

        // Removing win Message

        var winMessage = document.querySelector(".win-message");
        winMessage.classList.add("reset-card");

        // Reseting stars

        var stars = document.querySelectorAll(".stars i");    
            
        for (var i = 0; i < stars.length; i++){
            stars[i].classList.add("fa-star");
        };

        // Reseting move's number

        var movesNumber = document.querySelector(".moves");
            movesNumber.innerHTML = 0;

        // Bringing back clock
        
        clock.classList.remove("hide");
        clockPanel.classList.remove("hide");        

        deck.addEventListener("click", counter, false);

        // Waiting till restart animation will end
    
        setTimeout(function wait() {

            winMessage.classList.add("hide");

            deck.innerHTML = ""; // cleaning old deck

            start();  // producting new deck of cards

        }, 1000)
    };

    playAgain.addEventListener("click", playAgainFunction, false);


// --------------------- Restart ----------------------------

    function restartFunction() {

        // Removing win Message

        var winMessage = document.querySelector(".win-message");
        winMessage.classList.add("hide");

        // Bring back Deck 

        deck.classList.remove("hide");
    
        // Reseting stars

        var stars = document.querySelectorAll(".stars i");    
            
        for (var i = 0; i < stars.length; i++){
            stars[i].classList.add("fa-star");
        };

        // Reseting move's number

        var movesNumber = document.querySelector(".moves");
            movesNumber.innerHTML = 0;

        // Bring back clock
        
        clock.classList.remove("hide");
        clockPanel.classList.remove("hide");        

        deck.addEventListener("click", counter, false);

        // Adding restart animation for cards

        var symbolContainer = document.querySelectorAll(".card");

        (function animationReset(){

            for (var i = 0; i < symbolContainer.length; i++){
                symbolContainer[i].classList.add("reset-card");
                symbolContainer[i].classList.remove("match");
                symbolContainer[i].classList.remove("show");
            
            }
        }())   

        // Waiting till restart animation will end
       
        setTimeout(function wait() {

            deck.innerHTML = "";
        
            start();  
    
        }, 1000)
    };

    resetButton.addEventListener("click", restartFunction, false);
    

   




 
 

























   

    

    


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
