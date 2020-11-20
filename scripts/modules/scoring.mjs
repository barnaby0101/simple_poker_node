/*
    The two primary functions are scoreHand() and computeScoreValue(). scoreHand() figures
    out what kind of hand it is and writes the result to the object `score`. 

    computeScoreValue() calculates a numerical value from the score for comparison. The value
    is of the form XXYY where XX is a ranked value for the hand type (e.g. three of a kind is 40, pair is 20)
    and YY is the card value of the highCard, which is not the highest card in the hand, but the value of
    the determining card (e.g.if you have three 7s, high card is 7). So the score for three-of-a kind 7s is 4007, 
    three-of-a-kind 6s is 4006, and a pair of kings is 2013. 
*/


export function scoreHand(hand){
    var valuesArray = [];
    var suitsArray = [];
    var cardCounts = {};
    
    var score = {
        royalStraightFlush: false,
        straightFlush: false,
        fourOfAKind: false, 
        fullHouse: false,
        flush: true,
        straight: true,
        threeOfAKind: false,
        twoPair: false,
        highCard: false,        // if you have three 7s, this is 7. If you're queen-high, this is 12.
        secondHighCard: false,  // for resolving two pair vs. two pair
        pair: false,
        result: false,
        value: 0
    }

    for (let i = 0; i < hand.length; i++) {             // creates arrays of suits and values
        valuesArray.push(hand[i].value);                // in hand
        suitsArray.push(hand[i].suit);
    }

    for (var i = 0; i < valuesArray.length; i++) {      // creates cardCounts object that stores counts of 2s, 3s, etc in hand
        var num = valuesArray[i];                       // example: {7: 1, 8: 1, 10: 2, 13: 1} is pair of 10s, king, 8, 7
        cardCounts[num] = cardCounts[num] ? cardCounts[num] + 1 : 1;
      }

    valuesArray.sort((a, b) => a-b);                    // reorder valuesArray in ascending order
    
    for (let i = 0; i < valuesArray.length-1; i++) {    // test for straight
        if (valuesArray[i+1] - valuesArray[i] !== 1) {
            score.straight = false;
        } else { score.highCard = valuesArray[valuesArray.length-1]; }
    }

    for (let i = 0; i < suitsArray.length-1; i++) {     // test for flush
        if (suitsArray[i+1] !== suitsArray[i]) {
            score.flush = false;
        } else { score.highCard = valuesArray[valuesArray.length-1]; }
    }

    if (score.straight === true && score.flush === true ) { score.straightFlush = true };                     // straight flush
    if (score.straightFlush === true && score.highCard === 14) { score.royalStraightFlush = true };           // royal straight flush

    let cardCountArray = Object.values(cardCounts);                            // four of a kind
    if (cardCountArray.includes(4)) { 
        score.fourOfAKind = true;
        score.highCard = getHighValue(cardCounts, 4);
    }                                        
    else if (cardCountArray.includes(3) && cardCountArray.includes(2)) {        // full house
        score.fullHouse = true;
        score.highCard = getHighValue(cardCounts, 3);
    }
    else if (cardCountArray.includes(3) && !cardCountArray.includes(2)) {      // three of a kind
        score.threeOfAKind = true;
        score.highCard = getHighValue(cardCounts, 3); }
    else if (cardCountArray.includes(2) && !cardCountArray.includes(3)) {      // pair or two pair
        let count = 0;                       // TODO this is kind of a hack
        for (let value of cardCountArray) {                                 // two pair
            if (value === 2) count++;
        }
        if (count === 2) {score.twoPair = true}                             // pair
            else {
                score.pair = true; 
                score.highCard = getHighValue(cardCounts, 2);
            };
    }
    else score.highCard = valuesArray[valuesArray.length-1];                // high card in hand;

    for (const [key, value] of Object.entries(score)) {                     // return hand result
        if (value === true) { score.result = key }
    }
    
    console.count("Object values: " + Object.values(score));
    if (!Object.values(score).includes(true)) {                             // if nothing, declare high card
        score.result = setHighCardResult(score.highCard);
    }

    score = computeScoreValue(score);                                       // calculate hand score.value
    return score;
}

function computeScoreValue(score){
    score.value += parseInt(score.highCard);
    switch(score.result) {
        case "pair": 
            score.value += 2000;
            break;
        case "twoPair": 
            score.value += 3000;
            break;
        case "threeOfAKind": 
            score.value += 4000;
            break;
        case "straight": 
            score.value += 5000;
            break;
        case "flush": 
            score.value += 6000;
            break;
        case "fullHouse": 
            score.value += 7000;
            break;
        case "fourOfAKind": 
            score.value += 8000;
            break;
        case "straightFlush": 
            score.value += 9000;
            break;
        case "royalStraightFlush": 
            score.value += 2000;
            break;
        default:				    // high-card hands
            score.value += 1000;
            break;
    }
    return score;
}



// Utilities etc.

function getHighValue(cardCounts, numberCardsInWinningPattern){         // eg for the value of a three of a kind, second argument is 3
    for (let [key, value] of Object.entries(cardCounts)) {
        if (value === numberCardsInWinningPattern) { return key }
    }
}

function setHighCardResult(c) {
    switch(c) {
        case 6:
            return "6 High";
            break;
        case 7:
            return "7 High";
            break;
        case 8:
          return "8 High";
          break;
        case 9:
          return "9 High";
          break;
        case 10:
            return "10 High";
            break;
        case 11:
            return "Jack High";
            break;
        case 12:
            return "Queen High";
            break;
        case 13:
            return "King High";
            break;
        case 14:
            return "Ace High";
            break;
      }
}

