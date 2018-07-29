
    var allCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

    var panel = document.querySelector(".score-panel");
    var resetButton = document.querySelector(".restart");
//    console.log(panel);
//    console.log(resetButton);


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

        function progressMeasure(startTime) {

            var stars = document.querySelectorAll(".stars i");
            var star1 = stars[0];
            var star2 = stars[1];
            var star3 = stars[2];            
            var countNumber = movesNumber.innerHTML;
            var allGoodCards = userList.length;
            var difference = countNumber - allGoodCards;

            if (difference < 8) {

                star1.classList.add("fa-star");
                star2.classList.add("fa-star");
                star3.classList.add("fa-star");

            } else if (difference < 16) {
                star1.classList.add("fa-star");
                star2.classList.add("fa-star");
                star3.classList.remove("fa-star");

            } else if (difference < 24) {
                star1.classList.add("fa-star");
                star2.classList.remove("fa-star");

            } else if (difference > 32) {
                star1.classList.remove("fa-star");
            }
                    
            console.log(countNumber);            
        }

        function countMoves(list) {

            var count = (list.length % 2 === 0) ? (list.length / 2) : ((list.length / 2) - 0.5)

            movesNumber.innerHTML = count;    
        }


// ---------------------- Cards checker --------------------------

  //      var symbolContainer = document.querySelectorAll(".card");

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


                } else {console.log(undefined)}
                  console.log(userList);
            
        };


// Two cards open

        function checkOpenList(openList, card1, card2) {

            if (openList.length == 2) {

                if (openList[0] === openList[1]) {
                    card2.classList.remove("open");
                    card1.classList.remove("open");
                    card2.classList.add("match");
                    card1.classList.add("match");
          //          console.log(openList);
                    console.log("good");

                    openCardList = [];

                } else if (openList[0] != openList[1]) {
                    card2.classList.remove("open");
                    card1.classList.remove("open");
          //          console.log(openList);
                    console.log("bad");

                    openCardList = [];
                }

            } else {console.log(undefined)};
        };


// Open List for checking and counting

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


// Add eventListener to the cards and open class      

  //     var symbolContainer = document.querySelectorAll(".card");

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
        var deckRemove = document.querySelector(".deck");
        deckRemove.innerHTML = "";
        start();
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
