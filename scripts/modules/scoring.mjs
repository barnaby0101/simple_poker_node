/*
    The two primary functions are scoreHand() and computeScoreValue(). 
    
    scoreHand() figures out what kind of hand it is and writes the result to the object `score`. 

    computeScoreValue() calculates a numerical value from the score for comparison. The value
    is of the form XXYY where XX is a ranked value for the hand type (e.g. three of a kind is 40, pair is 20)
    and YY is the card value of the highCard, which is not the highest card in the hand, but the value of
    the determining card (e.g.if you have three 7s, high card is 7). So the score for three-of-a kind 7s is 4007, 
    three-of-a-kind 6s is 4006, and a pair of kings is 2013. 
*/


export function scoreHand(hand){
    var valuesArray = new Array;
    var suitsArray = new Array;
    var cardCounts = new Object;
    var suitCounts = new Object;
    
    var score = {
        royalStraightFlush: false,
        straightFlush: false,
        fourOfAKind: false, 
        fullHouse: false,
        flush: false,
        straight: false,
        threeOfAKind: false,
        twoPair: false,
        pair: false,
        highCard: false,        // For queen-high, this is 12. For three 7s, this is 7. 
        
        nearFlush: false,       // four cards same suit
        nearFlushSuit: false,
        nearStraight: false,    // four cards in sequence
        secondHighCard: false,  // for resolving two pair vs. two pair
        
        result: false,
        value: 0                // set by computeScoreValue()
    }

    // setup - create various structures for testing

    for (let i = 0; i < hand.length; i++) {
        valuesArray.push(hand[i].value);                    // array of card values in hand (for straights, etc)
        suitsArray.push(hand[i].suit);                      // array of card suits in hand (for flushes, etc)
    }
    valuesArray.sort((a, b) => a-b);                        // sorts valuesArray in ascending order

    score.highCard = valuesArray[valuesArray.length-1];     // sets high card initial value

    for (var i = 0; i < valuesArray.length; i++) {          // cardCounts objects stores counts of each value
            var num = valuesArray[i];                       // example: {2: 1, 5: 1, 10: 2, 13: 1} = pair of 10s
            cardCounts[num] = cardCounts[num] ? cardCounts[num] + 1 : 1;
        }

    const cardCountArray = Object.values(cardCounts);       // used for four of a kind, three of a kind, etc.

    for (var i = 0; i < suitsArray.length; i++) {           // suitCounts object stores counts of each suit
        var suit = suitsArray[i];                           // used to identify what to discard in a near flush
        suitCounts[suit] = suitCounts[suit] ? suitCounts[suit] + 1 : 1;
    }

    // first tests
    // the first set of tests check for royal straight flush, straight flush, flush, straight,
    // near flush, or near straight

    for (let [key, value] of Object.entries(suitCounts)) {          // test for flush or near flush
        if (value === 5) {
            score.flush = true;
        }
        if (value === 4) {
            score.nearFlush = true;
            score.nearFlushSuit = key;
        }
    }  

    let vLen = valuesArray.length-1;                                // straight or near straight
    let straightCountIndex = 0;

    for (let i = 0; i < vLen; i++) {                 
        if (valuesArray[i+1] - valuesArray[i] === 1) {
            straightCountIndex++;
            if (straightCountIndex === 3) {
                if (score.flush !== true) {                         // if we have a flush, we don't care about 
                score.nearStraight = true                           // near straights
                }
            };
            if (straightCountIndex === 4) {
                score.straight = true
                score.nearStraight = false;                         // straight trumps near straight
                score.nearFlush = false;                            // no longer care
            };
        } else {
            straightCountIndex = 0;
        }
    }
    if (score.straight === true && score.flush === true ) {                     // straight flush
        score.straightFlush = true 
        score.flush = false;
        score.straight = false;
    }
    if (score.straightFlush === true && parseInt(score.highCard) === 14) {     // royal straight flush
        score.royalStraightFlush = true;
        score.straightFlush = false;
        score.flush = false;
        score.straight = false;
    }
    if (score.result === "nearStraight") {              // For near straight, set highCard to the card dealer will trade in.
        if ((valuesArray[1] - valuesArray[0]) > 1) {    // Because the array is sorted, the non-matching card will always be
            score.highCard = valuesArray[0];            // either first or last.
        } else score.highCard = valuesArray[4];
    }    

    // second tests
    // the second set of tests check for four of a kind, full house, three of a kind, two pair,
    // pair, or high card

    else if (cardCountArray.includes(4)) {                                      // four of a kind
        score.fourOfAKind = true;
        score.highCard = getHighValue(cardCounts, 4);
    }                                        
    else if (cardCountArray.includes(3) && cardCountArray.includes(2)) {        // full house
        score.fullHouse = true;
        score.highCard = getHighValue(cardCounts, 3);
    }
    else if (cardCountArray.includes(3) && !cardCountArray.includes(2)) {       // three of a kind
        score.threeOfAKind = true;
        score.highCard = getHighValue(cardCounts, 3); }
    else if (cardCountArray.includes(2) && !cardCountArray.includes(3)) {       // pair or two pair
        let s = new Set;
        for (let [key, value] of Object.entries(cardCounts)) {
            if (value === 2) {
                s.add(key);
            }
        }
        if (s.size === 2) {                                         // two pair
            score.twoPair = true;
            let sValues = s.values();
            let a = Array.from(s);
            a.sort((a, b) => a-b);
            score.secondHighCard = a[0];
            score.highCard = a[1];
        }
        else {                                                      // pair
            score.pair = true; 
            score.highCard = getHighValue(cardCounts, 2);
        }
    } 
    else score.highCard = valuesArray[valuesArray.length-1];        // high card in hand;

    for (const [key, value] of Object.entries(score)) {             // set hand result in score object
        if (value === true) { score.result = key }
    }
    
    if (!Object.values(score).includes(true)) {                     // if nothing, declare high card
        score.result = setHighCardResult(score.highCard);
    }

    score = computeScoreValue(score);               // calculate score.value for hand
    return score;
}

function computeScoreValue(score){                  // see top of file for description
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
            score.value += 10000;
            break;
        default:				    // high-card hands
            score.value += 1000;
            break;
    }
    return score;
}



// Utilities etc.

function getHighValue(cardCounts, numberCardsInWinningPattern){         // eg for the value of a three of a kind, 
    for (let [key, value] of Object.entries(cardCounts)) {              // second argument is 3
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

