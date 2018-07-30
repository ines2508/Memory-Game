document.addEventListener("DOMContentLoaded", function(){
    
    var allCards = ["fa-diamond", "fa-anchor", "fa-bomb", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond",   "fa-bolt", "fa-bicycle", "fa-leaf", "fa-paper-plane-o", "fa-bomb","fa-cube"];

    var resetButton = document.querySelector(".restart");
    var startButton = document.querySelector(".start-button");

// ----------------------After Start Animation --------------------------------

    // Waiting till the finish of the animation to remove start deck

    setTimeout( function startDeck() {

        var startDeck = document.querySelector(".start-deck");
        startDeck.classList.remove("hide");

        var startAnimation = document.querySelector(".start-animation");
        startAnimation.classList.add("hide");
        
    
    }, 3000);
        

    

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

// Creat new Deck of Cards    

        var deck = document.querySelector(".deck");
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

        deck.appendChild(newDeck);
        createDeck(newList);

        var symbolContainer = document.querySelectorAll(".card");
   
// ---------------------- Panel ---------------------------------
        
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


        function countMoves(list, start) {

            var movesText = document.querySelector(".moves-text");
            var count = (list.length % 2 === 0) ? (list.length / 2) : ((list.length / 2) - 0.5);

            movesNumber.innerHTML = count;  

            movesText.textContent = (count === 1) ? "Move" : "Moves";

        }

// ---------------------- Cards checker --------------------------


// Animations for you won

        function youWon(roundUserTime) {

            var symbolContainer = document.querySelectorAll(".card");

            for (var i = 0;  i < symbolContainer.length; i++) {
                symbolContainer[i].classList.remove("match");
                symbolContainer[i].classList.add("win");
                console.log(symbolContainer[i]);
            }

            
            setTimeout(function winMessage() {
                deck.classList.add("hide");
                var winMessage = document.querySelector(".win-message");
                winMessage.classList.remove("hide");
                var movesNumber = document.querySelector(".moves").textContent;
                var movesMessage = document.querySelector(".moves-message");
                movesMessage.textContent = movesNumber;
                var gameTime = document.querySelector(".game-time");
                gameTime.textContent = roundUserTime;
                var playAgain = document.querySelector(".play-again");
                playAgain.addEventListener("click", restartFunction, false); 

            }, 2050);
       };


// Check win list

        function checkWinList(timeZero) {
            
            var userList = document.querySelectorAll(".match");

                if (userList.length === 16) {

                    var endTime = performance.now(); 
                    var userTime = endTime - timeZero;
                    userTime = userTime / 1000;
                    var roundUserTime = userTime.toFixed(2);
                    
                    youWon(roundUserTime);

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
                    card1.classList.add("disable-click");
                    card2.classList.add("disable-click");


                    openCardList = [];

                } else if (openList[0] != openList[1]) {
                    
                    card2.classList.remove("open");
                    card1.classList.remove("open");
                    card2.classList.add("wrong");
                    card1.classList.add("wrong");
                    
                // Needed time to remember the cards

                    setTimeout(
                        function removeWrong(){
                            card2.classList.remove("show");
                            card1.classList.remove("show");        
                            card2.classList.remove("wrong");
                            card1.classList.remove("wrong");
                    },1000)
                        
                    openCardList = [];
                }

                // No new cards will be shown during "remembering"

                setTimeout(
                    function ableClick(){

                        for (var i = 0; i < symbolContainer.length; i++){
                            
                            if (!symbolContainer[i].classList.contains("match")){
                                symbolContainer[i].classList.remove("disable-click");
                            } else {console.log(undefined)}
                        
                        }   
                }, 1010)

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
            openCardList.push(symbol);
            countList.push(symbol);

            countMoves(countList);
            checkOpenList(openCardList, card1, card2);

        };


// Add eventListener to the cards, giving them "open" class
// Setting start time of the game    

var timeTable = [];

        function clickCard(){

            for (var i = 0; i < 500; i++) { 
                var oneCard = symbolContainer[i];
                
                oneCard.addEventListener("click", function(){

                    var thisCard = this;
                    this.classList.add("open", "show");

                    var startTime = performance.now();  
                    timeTable.push(startTime);
                    var timeZero = timeTable[0];
                    console.log(timeZero);       

                    progressMeasure(timeZero);
                    checkCards(thisCard);
                    checkWinList(timeZero);

                }, false);
            }
        };


        clickCard();
    };


// --------------------- Restart ----------------------------

    function restartFunction() {


        // Removing win Message

        var winMessage = document.querySelector(".win-message");
        winMessage.classList.add("hide");

        // Bring back Deck TODO - osobno dla play again (bez tego)

        var deckRemove = document.querySelector(".deck");
        deckRemove.classList.remove("hide");
    
        // Reseting stars

        var stars = document.querySelectorAll(".stars i");    
            
        for (var i = 0; i < stars.length; i++){
            stars[i].classList.add("fa-star");
        };

        // Reseting move's number

        var movesNumber = document.querySelector(".moves");
            movesNumber.innerHTML = 0;

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

            deckRemove.innerHTML = "";
    
            start();      

        }, 1100)
    };

    resetButton.addEventListener("click", restartFunction, false);
    

    // ------------------- Start ----------------------------


    function startGame() {


        var startDeck = document.querySelector(".start-deck");
        startDeck.classList.add("reset-card");

        setTimeout(function moveDeck() {
            startDeck.classList.add("hide");
            var deckRemove = document.querySelector(".deck");
            deckRemove.classList.remove("hide");
            deckRemove.classList.remove("win");
            deckRemove.innerHTML = "";                
            var scorePanel = document.querySelector(".score-panel");
            scorePanel.classList.remove("hide");
        
            start();          
        }, 1000);
    }
    
    startButton.addEventListener("click", startGame, false);    

});





   

    

    


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
