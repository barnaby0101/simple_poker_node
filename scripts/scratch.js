"use strict";

// let array = [1, "", 3];


// if (array[1] === undefined) console.log("pass")
// else console.log("fail");

/*
        console.log("replacementCards")
        console.log(replacementCards)
*/

let playerHand = [1, 2, "noCard", 4, "noCard"];
let replacementCards = [3, 5];


for (let i = 0; i < replacementCards.length; i++) {
    for (let j = 0; j < playerHand.length; j++) {
        if (playerHand[j] === "noCard") {
            playerHand[j] = replacementCards[i];
            break;
        }
    }
}

console.log(playerHand);
