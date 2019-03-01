# Memory Game Project

## Game screens and animations

Game consists of 4 screens:
1. Welcome screen with the title of the game and 5 kinds of animations
2. Start screen with button start and 2 animations
3. Deck screen with cards, score panel and animations:
  - start deck
  - wrong answer
  - match cards
  - win animation
  - reset animation
4. Winner message with button play and reset animation

## Screen 1

First screen starts automatically when the whole document is load.
4 kinds of animations are added to the symbols (up, down, right, left).
The 5th animation "shows" up when the symbols start to disappear.
Most parts of the DOM has class "hide" with display: none, so they don't take extra space. 

## Screen 2

Start screen waits till the welcome animation ends. 
It has setTimeout of 3000. On the screen is a big button "Start the game".
After clicking the button animation "reset" hides the screen, new deck of cards is "produced" and score panel shows up. This is runing the **function start()**.

## Screen 3

Consist of score panel with:
- stars rating
- number of moves
- timer
- reset button

Deck of cards is "produced" from the array of symbols which are randomly shuffled **function shuffle**. Newly created array is stored in variable **newList**. 

From this new array of symbols **function createDeck** creats new DOM elements and stores them in **document fragment**. This function "produces" new list elements with the class "card" and symbol.

Newly created **document fragment** is attached to the existing DOM element **ul class "deck"**.

**EventListener** waits for cliking the list of cards.

### Number of moves

After clicking the **score panel** counts the number of moves. **Number of moves** is created by storing all clicked symbols into array **countList**. The lenght of this array is then divide by 2 and rounded down to have whole number.

### Stare rating

**The stars rating** is based on the **number of moves** and length of the  **userList** with all cards with the class "match". The difference betweet this two lists, gives starting point for rating. At this point stars are awarded discretionary and more user tests are needed to prepared more fair scoring.

### Timer

This function is outside scope of **start function**. 
Timer is based on two setTimeouts which "produce seconds". The number of seconds is divided by 60 to get the minutes. And then rounded down to have a whole number. The rest of this division is shown as the seconds. To better present the time, to singular numbers the string "0" is added.

There are 3 ways to clear this setTimeout:
- clicking reset button
- clicking play again button
- and after the score panel is hide when all cards are matched.

### Button Reset
[Reset Button](###ResetButton)

### Deck of cards

####Function clickCard and afterClicking

**Function clickCard** checks the whole list of cards and add them EventListener. When the card is clicked the **function afterClicking** starts. The clicked card gets two classes "open" and "show". At this point the stars rating **function progressMeasure** is invoked. The checked card is transfer to invoked **function checkCards** and **function checkWinList** starts checking if there are all 16 cards with class "match".

#### Function checkCards

This function creates the array of Open cards **openCardList**. And give them to **function checkOpenList** where this two cards will be checked and this array will be reset to zero.

The second array **countList** is prepare to count number of moves and is not reset till the end of the game.

#### Function checkOpenList

This function gets the array of **openCardList** and checks if there are two positions in it. If "yes" the card1 and card2 are checked. If they match, the cards get class **"match"**, if they don't match, they get class **"wrong"**. 

These two classes have animations. The card wrong is shown only for 900ms before this class will be removed. After checking these 2 cards the **openCardList** is reset. 

### Function checkWinList

This function checks if there are 16 elements with the class "match". If "yes" the game is over. And the cards get class "win-animation". 

The time of the game is collected at this point.  

## Screen 4

### Function checkWinList cd.

The setTimeOut waits till the win animation will end. And then adds class "hide" to the deck, and removes "hide" from the Screen 4 (winMessage).

The **winMessage** shows up with the information about user's stars, time and number of moves. The score panel is hide, which ends setTimeOut for the timer. The play again button is present. 

## Buttons

### Play Again Button

After clicking Play Again Button the screen 4 (winMessage) gets class "reset-animation" which is a short end animation. The stars rating, number of moves and clock are back to default. Deck gets back EventListener to start counting the time. 

After animation ends. WinMessage gets class "hide", deck is reset and **function start()** is invoked.

### Reset Button

Clicking this button will reset: stars rating, number of moves, timer. And adds class "reset-animation" to cards, so they will disappear. SetTimeOut waits till the animation ends. Then resets the deck and runs **function start()**.
