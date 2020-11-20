"use strict";

// import modules 
import * as cards from "./modules/cards.mjs";
import * as scoring from "./modules/scoring.mjs";

// global variables 
const dealButton = document.querySelector("#dealButton");
const foldButton = document.querySelector("#foldButton");
const callButton = document.querySelector("#callButton");
// const testButton = document.querySelector("#testButton"); // TODO remove
const playerHandDisplay = document.querySelector("#playerHandDisplay");
const dealerHandDisplay = document.querySelector("#dealerHandDisplay");
const messageDisplay = document.querySelector("#messageDisplay");

var deck = cards.getShuffledDeck();
var playerHand, dealerHand = [];
var GAMEINPROGRESS = false; // maybe update to multiple status


// event listeners
dealButton.addEventListener("click", () => { playGame(); } );   
foldButton.addEventListener("click", () => { fold(); } );
callButton.addEventListener("click", () => { call(); } );
// testButton.addEventListener("click", () => { test(); } ); // TODO remove

// page setup 
hideAllDisplayElements();

function playGame() {
    if (GAMEINPROGRESS === true) {
        if (confirm('Do you want to start a new hand?') === true) { 
            fold();
        } else { return; };
    }

    GAMEINPROGRESS = true;
    console.log("New game started.");

    foldButton.style.display = "inline";
    deal();
    // setTimeout(() => { updateMessage("Would you like to trade in cards?") }, 1700)
    initializeTradeIn();
    
}

function deal() {
    playerHand = new cards.createHand();
    showPlayerHand();

    dealerHand = new cards.createHand();
    showDealerHandHidden();
}

function showPlayerHand() {
    playerHandDisplay.style.display = "block";             // display hidden element
    let handList = document.createElement("ul");
    playerHandDisplay.appendChild(handList);
    handList.id="playerCards";

    for (let i = 0; i < playerHand.length; i++) {
        let listItem = handList.appendChild(document.createElement("li"));
        // creates image refs and ids for card1 through card5
        listItem.innerHTML = "<img src=.\\img\\cards\\" + playerHand[i].img + " id=\"card" + [i+1] + "\">";
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
        listItem.innerHTML = "<img src=.\\img\\cards\\back.png>";
        dealerCards.appendChild(listItem);
    }   
}

function showDealerHand() {
    dealerCards.parentNode.removeChild(dealerCards);        // erase what's there
    let handList = document.createElement("ul");
    dealerHandDisplay.appendChild(handList);
    handList.id="dealerCards";

    for (let i = 0; i < dealerHand.length; i++) {
        let listItem = handList.appendChild(document.createElement("li"));
        // creates image ref and id="card1" through "card5"
        listItem.innerHTML = "<img src=.\\img\\cards\\" + dealerHand[i].img + " id=\"card" + [i+1] + "\">";
        dealerCards.appendChild(listItem);
    }
}

function updateMessage(message) {
    messageDisplay.style.display = "block";
    messageDisplay.innerHTML = `${ message }`;
}

function initializeTradeIn() {
    const card1 = document.querySelector("#card1");
    const card2 = document.querySelector("#card2");
    const card3 = document.querySelector("#card3");
    const card4 = document.querySelector("#card4");
    const card5 = document.querySelector("#card5");

    card1.addEventListener("click", () => { 
        delete playerHand.firstCard; 
        // TODO remove card image
    })
}

function fold() {
    if (GAMEINPROGRESS === false) return;
    // if (confirm('Are you sure you want to fold?') === true) { 
    //     // do nothing
    // } else { return; };
    console.log("Player folded.")
    console.log("Player hand: " + playerHand);      // TODO remove
    scoring.scoreHand(playerHand);                  // TODO remove
    
    GAMEINPROGRESS = false;
    playerHand, dealerHand = { };
    playerCards.parentNode.removeChild(playerCards);
    dealerCards.parentNode.removeChild(dealerCards);
    hideAllDisplayElements();
}

function hideAllDisplayElements() {
    playerHandDisplay.style.display = "none";                  // hide display elements till needed
    dealerHandDisplay.style.display = "none";
    messageDisplay.style.display = "none";
    foldButton.style.display = "none";
}

function call() {
    showDealerHand();
    const playerScore = scoring.scoreHand(playerHand); 
    const dealerScore = scoring.scoreHand(dealerHand);

    if (playerScore.value > dealerScore.value ) {
        updateMessage("You win with " + getResultMessage(playerScore) + "! Play again?");
    } else updateMessage("I win with " + getResultMessage(dealerScore) + "! Play again?");

    // TODO add yes/no buttons for play again option

    console.log("Player hand: ")
    console.log(scoring.scoreHand(playerHand));
    console.log("Dealer hand: ")
    console.log(scoring.scoreHand(dealerHand));
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
        default:				    // high-card hands
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
        case 6: 
            return " six";
            break;
        case 7: 
            return " seven";
            break;
        case 8: 
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

// function test() {       // TODO remove
//     let straight = [cards.heartsJack, cards.clubs10, cards.hearts9, cards.spades8, cards.hearts7];
//     let twoPair = [cards.heartsJack, cards.clubs10, cards.hearts10, cards.spades3, cards.hearts3];
//     let pair = [cards.heartsJack, cards.clubs10, cards.hearts10, cards.spades3, cards.heartsAce];
//     let threeOfAKind = [cards.heartsJack, cards.clubs10, cards.hearts10, cards.spades10, cards.heartsAce];
//     let fullHouse = [cards.spadesAce, cards.clubs10, cards.hearts10, cards.spades10, cards.heartsAce];
//     scoring.scoreHand(twoPair);
// }