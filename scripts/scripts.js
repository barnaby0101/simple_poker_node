"use strict";

import * as cards from "./modules/cards.mjs";
import * as scoring from "./modules/scoring.mjs";

var deck, playerHand, dealerHand, tradeInArray = new Array;
var playerCard1, playerCard2, playerCard3, playerCard4, playerCard5;
var GAME_IN_PROGRESS = false;
var DEALER_HAS_TRADED_IN = false; 

// audio
const shuffleSoundEffect = new Audio("media/shuffle.wav");
var MUTE = false;

// test mode
const TESTMODE = false;      // if true, forces dealerHand and playerHand to test values
                             // warning - it's currently a bit buggy, refresh after each hand is finished

// selector bindings
const dealButton = document.querySelector("#dealButton");
const foldButton = document.querySelector("#foldButton");
const callButton = document.querySelector("#callButton");
const tradeButton = document.querySelector("#tradeButton");
const dealSoundEffect = shuffleSoundEffect.cloneNode();

const playerHandDisplay = document.querySelector("#playerHandDisplay");
const dealerHandDisplay = document.querySelector("#dealerHandDisplay");
const messageDisplay = document.querySelector("#messageDisplay");
const pageTitle = document.querySelector("#pageTitle");
const settingsLink = document.querySelector("#settingsLink");
const settingsCheckbox = document.querySelector("#settingsCheckbox");

// event listeners
dealButton.addEventListener("click", () =>  { playGame(); } );   
foldButton.addEventListener("click", () =>  { fold(); } );
callButton.addEventListener("click", () =>  { call(); } );
tradeButton.addEventListener("click", () => { tradeInCards(); } );
settingsLink.addEventListener("click", () => { settingsActive(); });
settingsCheckbox.addEventListener("click", () => { muteToggle(); });

// setup 

hideAllDisplayElements();
displayInitial();
updateMessage("Welcome to the Poker Lounge.")

if (TESTMODE === true) { 
    let text = "Test Mode Active"
    pageTitle.innerHTML = text;
    pageTitle.style.color = "orange";
}

// Game Play

function playGame() {
    if (GAME_IN_PROGRESS === true) {
        if (confirm('Do you want to start a new hand?') === true) { 
            fold();
        } else { return; };
    }

    initializeGame();

    buttonDisplayHand();
    GAME_IN_PROGRESS = true;
    console.log("New game started.");

    beginHand();
    updateMessage("Click up to four cards to trade in.");
    
    prepareTradeIn();   
}

function beginHand() {
    if (MUTE === false){
        dealSoundEffect.play();
    }

    // deal
    if (document.querySelector("#playerCards")) {           // if hand already exists, erase it
        playerCards.parentNode.removeChild(playerCards);
        dealerCards.parentNode.removeChild(dealerCards);
        messageDisplay.innerHTML = "";
    }

    if (TESTMODE === true) { 
        dealerHand = getDealerTestHand();
        playerHand = getPlayerTestHand();
    }
    else {
        playerHand = createHand(5);    
        dealerHand = createHand(5);
    }
    showPlayerHand();
    if (TESTMODE === true) { showDealerHand(); }
        else { showDealerHandHidden(); }
}

function createHand(numCards) {                             // creates n-card hands
    var hand = new Array;
    for (let i = 0; i < numCards; i++) {
        hand.push(deck.pop());
    }
    return hand;
}

function showPlayerHand() {
    playerHandDisplay.style.display = "block";
    if (document.querySelector("#playerCards")) {
        playerCards.parentNode.removeChild(playerCards);        // erase current hand
    }
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

function showDealerHand() {
    dealerHandDisplay.style.display = "block"; 
    if (document.querySelector("#dealerCards")) {
        dealerCards.parentNode.removeChild(dealerCards);        // erase current hand
    }
    let handList = document.createElement("ul");
    dealerHandDisplay.appendChild(handList);
    handList.id="dealerCards";

    for (let i = 0; i < dealerHand.length; i++) {
        let listItem = handList.appendChild(document.createElement("li"));
        listItem.innerHTML = "<img src=.\\img\\cards\\" + dealerHand[i].img + " id=\"dealerCard" + [i+1] + "\">";
        dealerCards.appendChild(listItem);
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

function prepareTradeIn(){
    playerCard1 = document.querySelector("#playerCard1");
    playerCard2 = document.querySelector("#playerCard2");
    playerCard3 = document.querySelector("#playerCard3");
    playerCard4 = document.querySelector("#playerCard4");
    playerCard5 = document.querySelector("#playerCard5");

    playerCard1.addEventListener("click", () => { prepareCardForTradeIn(playerCard1)} );
    playerCard2.addEventListener("click", () => { prepareCardForTradeIn(playerCard2)} );
    playerCard3.addEventListener("click", () => { prepareCardForTradeIn(playerCard3)} );
    playerCard4.addEventListener("click", () => { prepareCardForTradeIn(playerCard4)} );
    playerCard5.addEventListener("click", () => { prepareCardForTradeIn(playerCard5)} );
}

function prepareCardForTradeIn(card) {                  // adds/removes card from tradeInArray upon card click
    buttonDisplayPlayerTradeIn();
    if (checkCardSwapMax() === false) {
        if (card.className !== "selectedForDiscard") {
            return;
        }   
    }
    if (card.className === "selectedForDiscard") {      // if already selected, deselect
        for (let i = 0; i < tradeInArray.length; i++) {
            if (tradeInArray[i] === card) {
                card.className="";
                delete tradeInArray[i];
            }
        }
    } else {
        card.className="selectedForDiscard";
        tradeInArray.push(card);
    }
}

function tradeInCards() {                                   // called by "Trade In Cards" button
    console.log(`Player traded in ${tradeInArray.length} cards.`)
    tradeInArray = tradeInArray.filter(function (card) { return card != null; });   // clear empty indices
    for (let i = 0; i < tradeInArray.length; i++) {         // remove display of discards
        let cardToRemove = tradeInArray[i];
        
        switch (cardToRemove) {                             // remove discards from hand
            case playerCard1: 
                playerHand[0] = "noCard";
                // playerCard1.className="animateDiscard";
                break;
            case playerCard2: 
                playerHand[1] = "noCard";
                // playerCard2.className="animateDiscard";
                break;
            case playerCard3: 
                playerHand[2] = "noCard";
                // playerCard3.className="animateDiscard";
                break;
            case playerCard4: 
                playerHand[3] = "noCard";
                // playerCard4.className="animateDiscard";
                break;
            case playerCard5: 
                playerHand[4] = "noCard";
                // playerCard5.className="animateDiscard";
                break;
        }
    }

    let replacementCards = createHand(tradeInArray.length);     // update cards in hand

    for (let i = 0; i < replacementCards.length; i++) {
        for (let j = 0; j < playerHand.length; j++) {
            if (playerHand[j] === "noCard") {
                playerHand[j] = replacementCards[i];
                break;
            }
        }
    }

    showPlayerHand();                                       // redraw hand
    endPlayerTradeIn();
    dealerTradeIn();
    // setTimeout(() => { updateMessage("Call or fold!") }, 2000);
}

function endPlayerTradeIn(){
    tradeInArray = [];
    playerCard1.removeEventListener("click", () => { prepareCardForTradeIn()} );
    playerCard2.removeEventListener("click", () => { prepareCardForTradeIn()} );
    playerCard3.removeEventListener("click", () => { prepareCardForTradeIn()} );
    playerCard4.removeEventListener("click", () => { prepareCardForTradeIn()} );
    playerCard5.removeEventListener("click", () => { prepareCardForTradeIn()} );
}

function dealerTradeIn() {
    if (TESTMODE === true) return;
    DEALER_HAS_TRADED_IN = true;
    buttonDisplayHand();
    let dealerScore = scoring.scoreHand(dealerHand);

    if (TESTMODE === true) {
        return;
    }
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
            if (dealerScore.result === "nearFlush") {                // near flush
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
    console.log(`Dealer traded in ${tradeInArray.length} cards.`)
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
    tradeInArray = [];
}

function call() {
    if (DEALER_HAS_TRADED_IN === false) {
        dealerTradeIn();
        setTimeout(() => { updateMessage("Call when you're ready!") }, 2000);
    }

    GAME_IN_PROGRESS = false;
    buttonDisplayShowdown();
    showDealerHand();
    const playerScore = scoring.scoreHand(playerHand);              // calculate score for each hand
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
        let text = getResultMessage(playerScore);
        console.log(`Player wins with ${text}.`);
        updateMessage("You win with " + text + "! Play again?");
    } else {
        let text = getResultMessage(dealerScore);
        console.log(`Dealer wins with ${text}.`);
        updateMessage("I win with " + text + "! Play again?");
    }
}

function fold() {
    console.log("Player folded.")
    GAME_IN_PROGRESS = false;
    playerHand, dealerHand = { };
    playerCards.parentNode.removeChild(playerCards);
    dealerCards.parentNode.removeChild(dealerCards);
    hideAllDisplayElements();
    displayInitial();
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
    GAME_IN_PROGRESS = false;
    DEALER_HAS_TRADED_IN = false;
}

function updateMessage(message) {
    messageDisplay.style.display = "block";
    messageDisplay.innerHTML = `${ message }`;
}

function hideAllDisplayElements() {
    playerHandDisplay.style.display = "none";                  // hide display elements till needed
    dealerHandDisplay.style.display = "none";
    messageDisplay.style.display = "none";
    foldButton.style.display = "none";
    tradeButton.style.display = "none";
    callButton.style.display = "none";
}

function displayInitial() {
	dealButton.style.display = "inline";
	foldButton.style.display = "none";
	callButton.style.display = "none";
    tradeButton.style.display = "none";
    settingsInactive();
}

function buttonDisplayHand() {
	dealButton.style.display = "none";
	callButton.style.display = "inline";
	foldButton.style.display = "inline";
	tradeButton.style.display = "none";
}

function buttonDisplayPlayerTradeIn() {
	dealButton.style.display = "none";
	callButton.style.display = "inline";
	foldButton.style.display = "inline";
	tradeButton.style.display = "inline";
}

function buttonDisplayDealerTradeIn() {
	dealButton.style.display = "inline";
	foldButton.style.display = "none";
	callButton.style.display = "none";
	tradeButton.style.display = "none";
}

function buttonDisplayShowdown() {
	dealButton.style.display = "inline";
	callButton.style.display = "none";
	foldButton.style.display = "none";
	tradeButton.style.display = "none";
}

function settingsActive() {
    settingsCheckbox.style.display = "inline";
    settingsLink.style.display = "none";
}

function settingsInactive() {
    settingsCheckbox.style.display = "none";
    settingsLink.style.display = "inline";
}

function muteToggle() {
    if (MUTE === true) {
        MUTE = false; 
        console.log("mute off");
    }
    else {
        MUTE = true; 
        console.log("mute on");
    }
}

function checkCardSwapMax(){
    tradeInArray = tradeInArray.filter(function (card) { return card != null; });   // clear empty indices
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
    const fourOfAKind = [ cards.spades10, cards.clubs10, cards.hearts10, cards.diamonds10, cards.spadesAce ];
    const fullHouse = [ cards.clubs10, cards.hearts10, cards.diamonds10, cards.spadesAce, cards.heartsAce ];
    const flush = [ cards.spades3, cards.spades8, cards.spadesJack, cards.spadesKing, cards.spadesAce ];
    const nearFlush = [ cards.clubs3, cards.spades6, cards.spades10, cards.spadesJack, cards.spadesAce ];
    const straight = [ cards.spades9, cards.clubs10, cards.diamondsJack, cards.heartsQueen, cards.spadesKing ];
    const nearStraight = [ cards.spades9, cards.clubs10, cards.diamondsJack, cards.heartsQueen, cards.spades2 ];
    const threeOfAKind = [ cards.spades2, cards.clubs10, cards.hearts10, cards.diamonds10, cards.spadesAce ];
    const twoPair = [ cards.spades2, cards.clubs2, cards.hearts10, cards.diamonds10, cards.spadesAce ];
    const pair = [ cards.spades2, cards.clubs2, cards.hearts7, cards.diamonds9, cards.spadesAce ];
    const highCard = [ cards.clubsQueen, cards.spadesJack, cards.spades9, cards.spadesQueen, cards.spades4 ];
    const aribtrary = [ cards.spadesAce, cards.heartsQueen, cards.hearts3, cards.hearts5, cards.diamondsJack ];

    let dealerHandToReturn = aribtrary;      // set test hand here
    return dealerHandToReturn;
}