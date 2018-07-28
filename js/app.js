
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
   
// ---------------------- Panel ---------------------------------

    function countMoves(list) {

        var movesNumber = document.querySelector(".moves");
        var count = (list.length % 2 === 0) ? (list.length / 2) : ((list.length / 2) - 0.5)

        movesNumber.innerHTML = count;    
    }



// ---------------------- Cards checker --------------------------

        var symbolList = [];
        var listOpen = [];
        var symbolContainer = document.querySelectorAll(".card");

// If card match

        function cardMatch(cardA, cardB) {
            cardB.classList.remove("open");  
            cardA.classList.remove("open");
            console.log("good");

            cardA.classList.add("match");
            cardB.classList.add("match");
            listOpen = [];
        }

// If cards don't match

        function cardNoMatch(cardA, cardB) {
            cardB.classList.remove("open");
            cardA.classList.remove("open");
           // cardB.classList.remove("show");    
           // cardA.classList.remove("show");
            console.log("bad");
            listOpen = [];      
        }

// Two cards open

        function getOpenCard(){
            var cardOpenSymbol = document.querySelectorAll(".open .fa");
            var cardOpen = document.querySelectorAll(".open");
            var cardA = cardOpen[0];
            var cardB = cardOpen[1];
            var card1 = cardOpenSymbol[0].classList.item(1);
            var card2 = cardOpenSymbol[1].classList.item(1);

            listOpen.push(card1);
            listOpen.push(card2);
            console.log(listOpen);

            if (listOpen.length = 2) {
                if (card1 === card2) {
                    cardMatch(cardA, cardB); 

                } else if (card1 != card2) {
                    cardNoMatch(cardA, cardB); 

                }  else {console.log(undefined)}  

            } else if (listOpen > 2) {
                //  cardB.classList.remove("show");    
                //  cardA.classList.remove("show");
            }   
        }


        function getSymbols(){

            for (var i = 0; i < 16; i++) {
        
                var symbol = symbolContainer[i];
                if (symbol.classList.item(1) == "open"){
                    var openCard = symbol.firstChild.classList.item(1);
                } 
            }
            symbolList.push(openCard);

            countMoves(symbolList);
            getOpenCard();
        };

// Add class Open, Show to cliked Card;

        var symbolContainer = document.querySelectorAll(".card");

        function checkCards(){
          
            getSymbols();
        };

        function clickCard(){

            for (var i = 0; i < 16; i++) { 
                var oneCard = symbolContainer[i];
                
                oneCard.addEventListener("click", function(){
                        this.classList.add("open", "show");

                    checkCards();
                }, false);
            }
        };

        clickCard();
    };

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
