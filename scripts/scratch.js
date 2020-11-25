function prepareTradeIn() {
    playerCard1 = document.querySelector("#playerCard1");
    playerCard2 = document.querySelector("#playerCard2");
    playerCard3 = document.querySelector("#playerCard3");
    playerCard4 = document.querySelector("#playerCard4");
    playerCard5 = document.querySelector("#playerCard5");

    playerCard1.addEventListener("click", () => {           // click to remove <li> and card
        tradeButton.style.display = "inline";
        if (checkCardSwapMax() === false) return;           // TODO if you select four, you can't deselect one
        if (playerCard1.className === "selectedForDiscard") {
            playerCard1.classList.remove("selectedForDiscard");
            tradeInArray.pop();                             // TODO deselecting a selected card only works if you undo what you've just selected
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

var newFunction = new Function ('bar', 'console.log("foo" + `${bar}`)');

newFunction("bar");


// function createPrepareTradeInFunction(card) {
//     let new function {
//         console.log("You are that " + ${card});
//     }
// }

// console.log(createPrepareTradeInFunction("pig"));