"use strict";

import * as cards from "./modules/cards.mjs";
import * as scoring from "./modules/scoring.mjs";

var deck, playerHand, dealerHand, tradeInArray = new Array;
var playerCard1, playerCard2, playerCard3, playerCard4, playerCard5;
var GAMEINPROGRESS = false;
var DEALERHASTRADEDIN = false; 

// selector bindings
const dealButton = document.querySelector("#dealButton");
const foldButton = document.querySelector("#foldButton");
const callButton = document.querySelector("#callButton");
const tradeButton = document.querySelector("#tradeButton");
const playerHandDisplay = document.querySelector("#playerHandDisplay");
const dealerHandDisplay = document.querySelector("#dealerHandDisplay");
const messageDisplay = document.querySelector("#messageDisplay");
const mainHeader = document.querySelector("h1");

// button event listeners
dealButton.addEventListener("click", () =>  { playGame(); } );   
foldButton.addEventListener("click", () =>  { fold(); } );
callButton.addEventListener("click", () =>  { call(); } );
tradeButton.addEventListener("click", () => { tradeInCards(); } );

// audio
const shuffleSoundEffect = new Audio("media/shuffle.wav");
var MUTE = true;

// test mode
const TESTMODE = false;      // if true, forces dealerHand and playerHand to test values
                             // warning - it's currently a bit buggy, refresh after each hand is finished

// setup 

hideAllDisplayElements();

if (TESTMODE === true) {
    let text = "Test Mode Active"
    mainHeader.textContent = text;
    mainHeader.style.color = "orange";
}

// Game Play

function playGame() {
    if (GAMEINPROGRESS === true) {
        if (confirm('Do you want to start a new hand?') === true) { 
            fold();
        } else { return; };
    }

    initializeGame();
    console.log("Deck immediately after initialization: ")
    console.log(deck);
    GAMEINPROGRESS = true;
    console.log("New game started.");
    foldButton.style.display = "inline";

    deal();
    updateMessage("Click up to four cards to trade in and click \"continue\".");
    
    prepareTradeIn();   
}

function deal() {
    if (MUTE === false){
        let dealSoundEffect = shuffleSoundEffect.cloneNode()
        dealSoundEffect.play();
    }

    if  (document.querySelector("#playerCards")) {          // if hand already exists, erase it
        playerCards.parentNode.removeChild(playerCards);
        dealerCards.parentNode.removeChild(dealerCards);
        messageDisplay.innerHTML = "";
    }

    callButton.style.display = "inline";

    if (TESTMODE === true) {                                // testmode forces dealer hand to testHand
        dealerHand = getDealerTestHand();
        playerHand = getPlayerTestHand();
    }
    else {
        console.log("deck");// todo erase
        console.log(deck);// todo erase
        playerHand = createHand(5);    
        dealerHand = createHand(5);
    }
    showPlayerHand();
    showDealerHandHidden();
    console.log("initial dealerHand:");
    console.log(dealerHand);
}

function createHand(numCards) {                             // creates n-card hands
    var hand = new Array;
    for (let i = 0; i < numCards; i++ ) {
        hand.push(deck.pop());
    }
    // console.log("hand just after being built");//todo remove
    // console.log(hand);//todo remove
    return hand;
}

function showPlayerHand() {
    playerHandDisplay.style.display = "block";
    let handList = document.createElement("ul");
    playerHandDisplay.appendChild(handList);
    handList.id="playerCards";

    for (let i = 0; i < playerHand.length; i++) {
        let listItem = handList.appendChild(document.createElement("li"));
        // creates image refs and ids for card1 through card5
        listItem.innerHTML = "<img src=.\\img\\cards\\" + playerHand[i].img + " id=\"playerCard" + [i+1] + "\">";
        playerCards.appendChild(listItem);
    }
}

function showDealerHandHidden() {                          // draws 5 card backs
    dealerHandDisplay.style.display = "block";             // display hidden element
    let handList = document.createElement("ul");
    dealerHandDisplay.appendChild(handList);
    handList.id="dealerCards";

    for (let i = 0; i < dealerHand.length; i++ ) {
        let listItem = handList.appendChild(document.createElement("li"));
        listItem.innerHTML = "<img src=.\\img\\cards\\back.png" + " id=\"dealerCard" + [i+1] + "\">";
        dealerCards.appendChild(listItem);
    }   
}

function showDealerHand() {
    dealerCards.parentNode.removeChild(dealerCards);        // erase current hand
    let handList = document.createElement("ul");
    dealerHandDisplay.appendChild(handList);
    handList.id="dealerCards";
    console.log(dealerCards);

    for (let i = 0; i < dealerHand.length; i++) {
        let listItem = handList.appendChild(document.createElement("li"));
        listItem.innerHTML = "<img src=.\\img\\cards\\" + dealerHand[i].img + " id=\"dealerCard" + [i+1] + "\">";
        dealerCards.appendChild(listItem);
    }
}

function updateMessage(message) {
    messageDisplay.style.display = "block";
    messageDisplay.innerHTML = `${ message }`;
}

function prepareTradeIn() {
    playerCard1 = document.querySelector("#playerCard1");
    playerCard2 = document.querySelector("#playerCard2");
    playerCard3 = document.querySelector("#playerCard3");
    playerCard4 = document.querySelector("#playerCard4");
    playerCard5 = document.querySelector("#playerCard5");

    playerCard1.addEventListener("click", () => {           // click to remove <li> and card
        tradeButton.style.display = "inline";
        if (checkCardSwapMax() === false) return;
        if (playerCard1.className === "selectedForDiscard") {
            playerCard1.classList.remove("selectedForDiscard");
            tradeInArray.pop();                             // TODO this only works if you undo what you've just selected
        } else {
            playerCard1.className="selectedForDiscard";
            tradeInArray.push(playerCard1);
        }
    })
    playerCard2.addEventListener("click", () => { 
        tradeButton.style.display = "inline";
        if (checkCardSwapMax() === false) return;
        if (playerCard2.className === "selectedForDiscard") {
            playerCard2.classList.remove("selectedForDiscard");
            tradeInArray.pop();
        } else {
            playerCard2.className="selectedForDiscard";
            tradeInArray.push(playerCard2);
        }
    })
    playerCard3.addEventListener("click", () => { 
        tradeButton.style.display = "inline";
        if (checkCardSwapMax() === false) return;
        if (playerCard3.className === "selectedForDiscard") {
            playerCard3.classList.remove("selectedForDiscard");
            tradeInArray.pop();
        } else {
            playerCard3.className="selectedForDiscard";
            tradeInArray.push(playerCard3);
        }
    })
    playerCard4.addEventListener("click", () => { 
        tradeButton.style.display = "inline";
        if (checkCardSwapMax() === false) return;
        if (playerCard4.className === "selectedForDiscard") {
            playerCard4.classList.remove("selectedForDiscard");
            tradeInArray.pop();
        } else {
            playerCard4.className="selectedForDiscard";
            tradeInArray.push(playerCard4);
        }
    })
    playerCard5.addEventListener("click", () => { 
        tradeButton.style.display = "inline";
        if (checkCardSwapMax() === false) return;
        if (playerCard5.className === "selectedForDiscard") {
            playerCard5.classList.remove("selectedForDiscard");
            tradeInArray.pop();
        } else {
            playerCard5.className="selectedForDiscard";
            tradeInArray.push(playerCard5);
        }
    })
}

function tradeInCards() {
    for (let i = 0; i < tradeInArray.length; i++) {         // remove display of discards
        let cardToRemove = tradeInArray[i];
        var cardParent = cardToRemove.parentElement;
        cardParent.parentNode.removeChild(cardParent);
        switch (cardToRemove) {                             // remove discards from hand
            case playerCard1: 
                delete playerHand[0];
                break;
            case playerCard2: 
                delete playerHand[1];
                break;
            case playerCard3: 
                delete playerHand[2];
                break;
            case playerCard4: 
                delete playerHand[3];
                break;
            case playerCard5: 
                delete playerHand[4];
                break;
        }
    }
    playerHand = playerHand.filter(function (card) { return card != null; });   // clear empty indices of hand

    let replacementCards = createHand(tradeInArray.length);
    for (let i = 0; i < replacementCards.length; i++) {
        playerHand.push(replacementCards[i]);
    }
    
    let handList = document.createElement("ul");
    dealerHandDisplay.appendChild(handList);

    for (let i = 0; i < replacementCards.length; i++) {
        let listItem = handList.appendChild(document.createElement("li"));
        listItem.innerHTML = "<img src=.\\img\\cards\\" + replacementCards[i].img + " id=\"playerCard" + [i+1] + "\">";
        playerCards.appendChild(listItem);
    }
    tradeButton.style.display = "none";
    tradeInArray = [];

    dealerTradeIn();
    updateMessage("Call or fold!");
    // setTimeout(() => { updateMessage("Call or fold!") }, 2000);
}

function dealerTradeIn() {
    DEALERHASTRADEDIN = true;
    let dealerScore = scoring.scoreHand(dealerHand);

// TODO ERASE BELOW
    console.log("Dealer trade-in begun.")
    console.log("Initial Dealer Score: ");    // TODO erase
    console.log(dealerScore);       // TODO erase


    switch (dealerScore.result) {
        // hold on flush, full house, any straight or flush, or four of a kind
        case "royalStraightFlush":
        case "straightFlush":
        case "fourOfAKind":
        case "fullHouse":
        case "flush": 
        case "straight":
            updateMessage("I'll hold.");
            return;
        case "threeOfAKind":
            for (let card of dealerHand) {
                if (card.value !== parseInt(dealerScore.highCard)) {
                    tradeInArray.push(card);
                }
            }
            updateMessage("I'll take two.");       
            dealerTradeInCards();
            return;
        case "twoPair":
            for (let card of dealerHand) {
                if (card.value !== parseInt(dealerScore.highCard) && 
                card.value !== parseInt(dealerScore.secondHighCard)) {
                    tradeInArray.push(card);
                }
            }
            updateMessage("I'll take one.");
            dealerTradeInCards()
            return;
        case "pair":
            for (let card of dealerHand) {
                if (card.value !== parseInt(dealerScore.highCard)) {
                    tradeInArray.push(card);
                }
            }
            updateMessage("I'll take three.");       
            dealerTradeInCards();
            return;
        default:        // high card, near flush, or near straight
            console.log("Final trade-in step begun."); // TODO remove
            console.log(dealerScore);
            if (dealerScore.result === "nearFlush") {                // near flush
                console.log("Near flush."); // TODO remove
                for (let card of dealerHand) {
                    if (card.suit !== dealerScore.nearFlushSuit) {
                        tradeInArray.push(card);
                    }
                updateMessage("I'll take one.");       
                dealerTradeInCards();
                return;
                }
            }
            else if (dealerScore.result === "nearStraight") {             // near straight
                console.log("Near straight."); // TODO remove
                for (let card of dealerHand) {
                    if (parseInt(card.value) === parseInt(dealerScore.highCard)) {
                        tradeInArray.push(card);
                    }
                }
                updateMessage("I'll take one.");       
                dealerTradeInCards();
                return;
            }
            else {                                                      // high card
                console.log("High card."); // TODO remove
                for (let card of dealerHand) {
                    if (parseInt(card.value) !== parseInt(dealerScore.highCard)) {
                        tradeInArray.push(card);
                    }
                }
                updateMessage("I'll take four.");       
                dealerTradeInCards();
                return;
            }
    }
}

function dealerTradeInCards() {
    console.log("tradeInArray"); // TODO remove
    console.log(tradeInArray); // TODO remove

    for (let i = 0; i < tradeInArray.length; i++) {
        let cardToRemove = tradeInArray[i];

        switch (cardToRemove.name) {         // remove discards from hand
            case dealerHand[0].name: 
                dealerHand[0] = "";
                break;
            case dealerHand[1].name: 
                dealerHand[1] = "";
                break;
            case dealerHand[2].name: 
                dealerHand[2] = "";
                break;
            case dealerHand[3].name: 
                dealerHand[3] = "";
                break;
            case dealerHand[4].name: 
                dealerHand[4] = "";
                break;
        }
    }
    dealerHand = dealerHand.filter(function (card) { return card != ""; });   // clear empty indices of hand

    let replacementCards = createHand(tradeInArray.length);
    for (let i = 0; i < replacementCards.length; i++) {
        dealerHand.push(replacementCards[i]);
    }

    console.log("Replenished hand: "); // TODO remove
    console.log(dealerHand) // TODO remove
    
    tradeInArray = [];
}

function fold() {
    console.log("Player folded.")
    GAMEINPROGRESS = false;
    callButton.style.display = "none";
    playerHand, dealerHand = { };
    playerCards.parentNode.removeChild(playerCards);
    dealerCards.parentNode.removeChild(dealerCards);
    hideAllDisplayElements();
}

function call() {
    if (DEALERHASTRADEDIN === false) {
        dealerTradeIn();
        // setTimeout(() => { updateMessage("Call when you're ready!") }, 2000);
        updateMessage("Call when you're ready!");
    }

    GAMEINPROGRESS = false;
    foldButton.style.display = "none";
    callButton.style.display = "none";
    showDealerHand();
    const playerScore = scoring.scoreHand(playerHand); 
    const dealerScore = scoring.scoreHand(dealerHand);

    // special handling when both players have two-pair
    // if the high pair is the same, checks the low pair
    if ((playerScore.result === "twoPair") && (playerScore.value === dealerScore.value)) {
        if (playerScore.secondHighCard > dealerScore.secondHighCard) {
            updateMessage("You win with " + getResultMessage(playerScore) + "! Play again?");
        } else updateMessage("I win with " + getResultMessage(dealerScore) + "! Play again?");    
    } 
    // any other case
    else if (playerScore.value > dealerScore.value ) {
        updateMessage("You win with " + getResultMessage(playerScore) + "! Play again?");
    } else updateMessage("I win with " + getResultMessage(dealerScore) + "! Play again?");

    console.log("final dealer score"); // TODO remove
    console.log(dealerScore); // TODO remove
}

// utilities

function initializeGame() {
    deck = cards.getShuffledDeck();
    playerHand = new Array; 
    dealerHand = new Array;
    tradeInArray = new Array;
    playerCard1 = ""; 
    playerCard2 = "";
    playerCard3 = "";
    playerCard4 = "";
    playerCard5 = "";
    GAMEINPROGRESS = false;
    DEALERHASTRADEDIN = false;
}

function hideAllDisplayElements() {
    playerHandDisplay.style.display = "none";                  // hide display elements till needed
    dealerHandDisplay.style.display = "none";
    messageDisplay.style.display = "none";
    foldButton.style.display = "none";
    tradeButton.style.display = "none";
    callButton.style.display = "none";
}

function checkCardSwapMax(){
    if (tradeInArray.length === 4) {
        updateMessage("You've traded in the maximum number of cards - please click \"continue\".");
        return false;
    }
}

function getResultMessage(score){
    var s = score;
    var returnString = "";
    switch(score.result) {
        case "pair": 
            returnString += "a pair of " + resultsPluralizer(s);
            break;
        case "twoPair": 
            returnString += "two pair";
            break;
        case "threeOfAKind": 
            returnString += "three " + resultsPluralizer(s);
            break;
        case "straight": 
            returnString += "a straight";
            break;
        case "flush": 
            returnString += "a flush";
            break;
        case "fullHouse": 
            returnString += "a full house";
            break;
        case "fourOfAKind": 
            returnString += "a four of a kind! Whoa! That's, like, so rare";
            break;
        case "straightFlush": 
            returnString += "HOLY SMOKES A STRAIGHT FLUSH";
            break;
        case "royalStraightFlush": 
            returnString += "a royal straight flush! I can't believe my eyes";
            break;
        default:				    // winner wins with high-card
            returnString += "a" + resultsHighCardMessager(s) + " high";
            break;
    }
    return returnString;
}

function resultsPluralizer(score){
    switch(parseInt(score.highCard)) {
        case 2: 
            return "twos";
            break;
        case 3: 
            return "threes";
            break;
        case 4: 
            return "fours";
            break;
        case 5: 
            return "fives";
            break;
        case 6: 
            return "sixes";
            break;
        case 7: 
            return "sevens";
            break;
        case 8: 
            return "eights";
            break;
        case 9: 
            return "nines";
            break;
        case 10: 
            return "tens";
            break;
        case 11: 
            return "jacks";
            break;
        case 12: 
            return "queens";
            break;
        case 13: 
            return "kings";
            break;
        case 14: 
            return "aces";
            break;
    }
}

function resultsHighCardMessager(score) {
    switch(parseInt(score.highCard)) {
        case 8:                     // lowest-possible winning high card
            return "n eight";
            break;
        case 9: 
            return " nine";
            break;
        case 10: 
            return " ten";
            break;
        case 11: 
            return " jack";
            break;
        case 12: 
            return " queen";
            break;
        case 13: 
            return " king";
            break;
        case 14: 
            return "n ace";
            break;
    }
}

function getPlayerTestHand() {
    let playerHandToReturn = [ 
        cards.spades3, 
        cards.clubs6, 
        cards.hearts10, 
        cards.diamondsJack, 
        cards.spadesAce ]
    return playerHandToReturn
}

function getDealerTestHand() {
    const royalStraightFlush = [ cards.spades10, cards.spadesJack, cards.spadesQueen, cards.spadesKing, cards.spadesAce ];
    const straightFlush = [ cards.spades9, cards.spades10, cards.spadesJack, cards.spadesQueen, cards.spadesKing ];
    const flush = [ cards.spades7, cards.spadesJack, cards.spadesQueen, cards.spadesKing, cards.spadesAce ];
    const nearFlush = [ cards.clubs7, cards.spadesJack, cards.spadesQueen, cards.spadesKing, cards.spadesAce ];
    const straight = [ cards.spades9, cards.clubs10, cards.diamondsJack, cards.heartsQueen, cards.spadesKing ];
    const nearStraight = [ cards.spades9, cards.clubs10, cards.diamondsJack, cards.heartsQueen, cards.spades2 ];
    const fourOfAKind = [ cards.spades10, cards.clubs10, cards.hearts10, cards.diamonds10, cards.spadesAce ];
    const threeOfAKind = [ cards.spades2, cards.clubs10, cards.hearts10, cards.diamonds10, cards.spadesAce ];
    const twoPair = [ cards.spades2, cards.clubs2, cards.hearts10, cards.diamonds10, cards.spadesAce ];
    const pair = [ cards.spades2, cards.clubs2, cards.hearts7, cards.diamonds9, cards.spadesAce ];
    const highCard = [ cards.spades2, cards.clubs4, cards.hearts7, cards.diamonds9, cards.spadesKing ];

    let dealerHandToReturn = straight; 
    return dealerHandToReturn;
}