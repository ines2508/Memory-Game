
    var allCards = ["fa-diamond", "fa-anchor", "fa-bomb", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond",   "fa-bolt", "fa-bicycle", "fa-leaf", "fa-paper-plane-o", "fa-bomb","fa-cube"];

    var panel = document.querySelector(".score-panel");
    var resetButton = document.querySelector(".restart");
    var startButton = document.querySelector(".start-button");

// ---------------------- Start game --------------------------------

    // Waiting till the start animation will finished

    setTimeout( function startDeck() {

        var startDeck = document.querySelector(".start-deck");
        startDeck.classList.remove("hide");

        var symbolBox = document.querySelector(".symbol-box");
        symbolBox.classList.add("hide");
    
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

            if (difference < 16) {

                star1.classList.add("fa-star");
                star2.classList.add("fa-star");
                star3.classList.add("fa-star");

            } else if (difference < 24) {
                star1.classList.add("fa-star");
                star2.classList.add("fa-star");
                star3.classList.remove("fa-star");

            } else if (difference < 32) {
                star1.classList.add("fa-star");
                star2.classList.remove("fa-star");

            } else if (difference > 40) {
                star1.classList.remove("fa-star");
            }
                    
            console.log(countNumber);            
        }


        function countMoves(list) {

            var count = (list.length % 2 === 0) ? (list.length / 2) : ((list.length / 2) - 0.5)

            movesNumber.innerHTML = count;    
        }


// ---------------------- Cards checker --------------------------


// Animations for you won

        function youWon() {

            for (var i = 0;  i < symbolContainer.length; i++) {
                symbolContainer[i].classList.remove("show");   
                symbolContainer[i].classList.remove("match");   
                symbolContainer[i].classList.add("win");   
                console.log(symbolContainer);
            }
        };


// Check win list

        function checkWinList(startTime) {
            
            var userList = document.querySelectorAll(".match");

                if (userList.length === 16) {

                    console.log("you win");
                    var endTime = performance.now(); 
                    var userTime = endTime - startTime;
                        userTime *= 10;
                    var roundUserTime = Math.round(userTime)
                    console.log(roundUserTime);    
                    
                    youWon();

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
                            symbolContainer[i].classList.remove("disable-click");
                        
                        }   
                }, 1000)

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


        function clickCard(){

            for (var i = 0; i < 500; i++) { 
                var oneCard = symbolContainer[i];
                
                oneCard.addEventListener("click", function(){

                    var thisCard = this;
                    this.classList.add("open", "show");
                    var startTime = performance.now();        

                    progressMeasure(startTime);
                    checkCards(thisCard);
                    checkWinList(startTime);

                }, false);
            }
        };


        clickCard();
    };


// --------------------- Restart ----------------------------

    function restartFunction() {
    
        // Reseting stars

        var stars = document.querySelectorAll(".stars i");    
            
        for (var i = 0; i < stars.length; i++){
            stars[i].classList.add("fa-star");
        };

        // Reseting moves number

        var movesNumber = document.querySelector(".moves");
            movesNumber.innerHTML = 0;

        // Adding restar animation for cards

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

            var deckRemove = document.querySelector(".deck");
            deckRemove.innerHTML = "";
    
            start();      

        }, 750)
    };

    resetButton.addEventListener("click", restartFunction, false);
    

    // ------------------- Start ----------------------------

    function startGame() {

        var deckRemove = document.querySelector(".deck");
        deckRemove.innerHTML = "";
        
        start();      
    }
    
    startButton.addEventListener("click", startGame, false);    





   

    

    


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
