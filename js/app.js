/*
 * Create a list that holds all of your cards
 * 
 */
    var allCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
    }

    var newList = shuffle(allCards);
    console.log(newList);

// Creat new Deck of Cards    

    var deck = document.querySelector(".deck");
    var fragment = document.createDocumentFragment();

    function createDeck(list) {

        for (var i = 0; i < 16; i++) {
            
            var cardLi = document.createElement("li");
                cardLi.classList.add("card");
            var symbolCard = document.createElement("i");
                symbolCard.classList.add("fa", list[i])
                cardLi.appendChild(symbolCard);

            fragment.appendChild(cardLi);
        }
        return fragment;
    }

    var newDeck = createDeck(newList);
        deck.appendChild(newDeck);

    console.log(deck);


// Add class Open, Show to cliked Card;

    var symbolContainer = document.querySelectorAll(".card");
    var card = document.querySelector(".card");   

    function getSymbols(){

        for (var i = 0; i < 16; i++) { 
            var oneCard = symbolContainer[i];

            oneCard.addEventListener("click", function() {

                this.classList.add("open", "show");
                return this;

            });
        }         
    }
    var openCard = getSymbols();

    


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
