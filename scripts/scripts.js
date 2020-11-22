"use strict";

import * as cards from "./modules/cards.mjs";
import * as scoring from "./modules/scoring.mjs";

// global variables 
const dealButton = document.querySelector("#dealButton");
const foldButton = document.querySelector("#foldButton");
const callButton = document.querySelector("#callButton");
const continueButton = document.querySelector("#continueButton");
const playerHandDisplay = document.querySelector("#playerHandDisplay");
const dealerHandDisplay = document.querySelector("#dealerHandDisplay");
const messageDisplay = document.querySelector("#messageDisplay");

var deck, playerHand, dealerHand, tradeInArray = new Array;
var playerCard1, playerCard2, playerCard3, playerCard4, playerCard5;

var GAMEINPROGRESS = false;
var MUTE = false;

// test mode
const TESTMODE = false;   // if true, forces dealerHand and playerHand to test values
const testPlayerHand = [ cards.spades3, cards.hearts3, cards.spades8, cards.hearts8, cards.clubs10 ]
const testDealerHand = [ cards.spades2, cards.hearts2, cards.spades8, cards.hearts8, cards.clubs3 ]

// button event listeners
dealButton.addEventListener("click", () => { playGame(); } );   
foldButton.addEventListener("click", () => { fold(); } );
callButton.addEventListener("click", () => { call(); } );
continueButton.addEventListener("click", () => { continueTradeIn(); } );

// setup

hideAllDisplayElements();
const shuffleSoundEffect = new Audio("media/shuffle.wav");



// Game Play

function playGame() {
    if (GAMEINPROGRESS === true) {
        if (confirm('Do you want to start a new hand?') === true) { 
            fold();
        } else { return; };
    }

    GAMEINPROGRESS = true;
    console.log("New game started.");
    deck = cards.getShuffledDeck();
    foldButton.style.display = "inline";
    deal();
    // setTimeout(() => { updateMessage("Would you like to trade in cards?") }, 1700)
    updateMessage("Click up to four cards to trade in and click \"continue\".");
    initializeTradeIn();   
}

function deal() {
    if (MUTE === false){
        let dealSoundEffect = shuffleSoundEffect.cloneNode()
        dealSoundEffect.addEventListener("ended", () => {console.log("Audio finished!");} );
        dealSoundEffect.play();
    }

    if  (document.querySelector("#playerCards")) {          // if hand already exists, erase it
        playerCards.parentNode.removeChild(playerCards);
        dealerCards.parentNode.removeChild(dealerCards);
        messageDisplay.innerHTML = "";
    }

    callButton.style.display = "inline";

    if (TESTMODE === true) {                                // testmode forces dealer hand to testHand just before scoring
        dealerHand = testDealerHand;
        playerHand = testPlayerHand;
    }
    else {
    playerHand = createHand(5);    
    dealerHand = createHand(5);
    }
    showPlayerHand();
    showDealerHandHidden();
}

function createHand(numCards) {                             // creates n-card hands
    var hand = new Array;
    for (let i = 0; i < numCards; i++ ) {
        hand.push(deck.pop());
    }
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
    dealerCards.parentNode.removeChild(dealerCards);        // erase hidden hand
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

function initializeTradeIn() {
    playerCard1 = document.querySelector("#playerCard1");
    playerCard2 = document.querySelector("#playerCard2");
    playerCard3 = document.querySelector("#playerCard3");
    playerCard4 = document.querySelector("#playerCard4");
    playerCard5 = document.querySelector("#playerCard5");

    playerCard1.addEventListener("click", () => {           // click to remove <li> and card
        if (checkCardSwapMax() === false) return;
        if (playerCard1.className === "selectedForDiscard") {
            playerCard1.classList.remove("selectedForDiscard");
            tradeInArray.pop();
        } else {
            playerCard1.className="selectedForDiscard";
            tradeInArray.push(playerCard1);
            console.log("playerCard1.className: " + playerCard1.className);
        }
    })
    playerCard2.addEventListener("click", () => { 
        if (checkCardSwapMax() === false) return;
        if (playerCard2.className === "selectedForDiscard") {
            playerCard2.classList.remove("selectedForDiscard");
            tradeInArray.pop();
        } else {
            playerCard2.className="selectedForDiscard";
            tradeInArray.push(playerCard2);
            console.log("playerCard1.className: " + playerCard2.className);
        }
    })
    playerCard3.addEventListener("click", () => { 
                if (checkCardSwapMax() === false) return;
        if (playerCard3.className === "selectedForDiscard") {
            playerCard3.classList.remove("selectedForDiscard");
            tradeInArray.pop();
        } else {
            playerCard3.className="selectedForDiscard";
            tradeInArray.push(playerCard3);
            console.log("playerCard1.className: " + playerCard3.className);
        }
    })
    playerCard4.addEventListener("click", () => { 
                if (checkCardSwapMax() === false) return;
        if (playerCard4.className === "selectedForDiscard") {
            playerCard4.classList.remove("selectedForDiscard");
            tradeInArray.pop();
        } else {
            playerCard4.className="selectedForDiscard";
            tradeInArray.push(playerCard4);
            console.log("playerCard1.className: " + playerCard4.className);
        }
    })
    playerCard5.addEventListener("click", () => { 
                if (checkCardSwapMax() === false) return;
        if (playerCard5.className === "selectedForDiscard") {
            playerCard5.classList.remove("selectedForDiscard");
            tradeInArray.pop();
        } else {
            playerCard5.className="selectedForDiscard";
            tradeInArray.push(playerCard5);
            console.log("playerCard1.className: " + playerCard5.className);
        }
    })
}

function continueTradeIn() {
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
    tradeInArray = [];
    dealerTradeIn();
}

function dealerTradeIn(){
    let dealerScore = scoring.scoreHand(dealerHand);
    console.log(dealerScore);
}



function checkCardSwapMax(){
    if (tradeInArray.length === 4) {
        updateMessage("You've traded in the maximum number of cards - please click \"continue\".");
        return false;
    }
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

    console.log("Player hand: ")
    console.log(scoring.scoreHand(playerHand));
    console.log("Dealer hand: ")
    console.log(scoring.scoreHand(dealerHand));
}

function hideAllDisplayElements() {
    playerHandDisplay.style.display = "none";                  // hide display elements till needed
    dealerHandDisplay.style.display = "none";
    messageDisplay.style.display = "none";
    foldButton.style.display = "none";
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