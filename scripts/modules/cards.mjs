export function getShuffledDeck() { 
    var cards = Array.from(allCards);
    var currentIndex = cards.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    return cards;
}

// cards

export const spades2 = {
    name: "Two of Spades",
    img: "spades_2.png",
    suit: "spades",
    value: 2
}

export const spades3 = {
    name: "Three of Spades",
    img: "spades_3.png",
    suit: "spades",
    value: 3
}

export const spades4 = {
    name: "Four of Spades",
    img: "spades_4.png",
    suit: "spades",
    value: 4
}

export const spades5 = {
    name: "Five of Spades",
    img: "spades_5.png",
    suit: "spades",
    value: 5
}

export const spades6 = {
    name: "Six of Spades",
    img: "spades_6.png",
    suit: "spades",
    value: 6
}

export const spades7 = {
    name: "Seven of Spades",
    img: "spades_7.png",
    suit: "spades",
    value: 7
}

export const spades8 = {
    name: "Eight of Spades",
    img: "spades_8.png",
    suit: "spades",
    value: 8
}

export const spades9 = {
    name: "Nine of Spades",
    img: "spades_9.png",
    suit: "spades",
    value: 9
}

export const spades10 = {
    name: "Ten of Spades",
    img: "spades_10.png",
    suit: "spades",
    value: 10
}

export const spadesJack = {
    name: "Jack of Spades",
    img: "spades_jack.png",
    suit: "spades",
    value: 11
}

export const spadesQueen = {
    name: "Queen of Spades",
    img: "spades_queen.png",
    suit: "spades",
    value: 12
}

export const spadesKing = {
    name: "King of Spades",
    img: "spades_king.png",
    suit: "spades",
    value: 13
}

export const spadesAce = {
    name: "Ace of Spades",
    img: "spades_ace.png",
    suit: "spades",
    value: 14
}

export const clubs2 = {
    name: "Two of Clubs",
    img: "clubs_2.png",
    suit: "clubs",
    value: 2
}

export const clubs3 = {
    name: "Three of Clubs",
    img: "clubs_3.png",
    suit: "clubs",
    value: 3
}

export const clubs4 = {
    name: "Four of Clubs",
    img: "clubs_4.png",
    suit: "clubs",
    value: 4
}

export const clubs5 = {
    name: "Five of Clubs",
    img: "clubs_5.png",
    suit: "clubs",
    value: 5
}

export const clubs6 = {
    name: "Six of Clubs",
    img: "clubs_6.png",
    suit: "clubs",
    value: 6
}

export const clubs7 = {
    name: "Seven of Clubs",
    img: "clubs_7.png",
    suit: "clubs",
    value: 7
}

export const clubs8 = {
    name: "Eight of Clubs",
    img: "clubs_8.png",
    suit: "clubs",
    value: 8
}

export const clubs9 = {
    name: "Nine of Clubs",
    img: "clubs_9.png",
    suit: "clubs",
    value: 9
}

export const clubs10 = {
    name: "Ten of Clubs",
    img: "clubs_10.png",
    suit: "clubs",
    value: 10
}

export const clubsJack = {
    name: "Jack of Clubs",
    img: "clubs_jack.png",
    suit: "clubs",
    value: 11
}

export const clubsQueen = {
    name: "Queen of Clubs",
    img: "clubs_queen.png",
    suit: "clubs",
    value: 12
}

export const clubsKing = {
    name: "King of Clubs",
    img: "clubs_king.png",
    suit: "clubs",
    value: 13
}

export const clubsAce = {
    name: "Ace of Clubs",
    img: "clubs_ace.png",
    suit: "clubs",
    value: 14
}

export const diamonds2 = {
    name: "Two of Diamonds",
    img: "diamonds_2.png",
    suit: "diamonds",
    value: 2
}

export const diamonds3 = {
    name: "Three of Diamonds",
    img: "diamonds_3.png",
    suit: "diamonds",
    value: 3
}

export const diamonds4 = {
    name: "Four of Diamonds",
    img: "diamonds_4.png",
    suit: "diamonds",
    value: 4
}

export const diamonds5 = {
    name: "Five of Diamonds",
    img: "diamonds_5.png",
    suit: "diamonds",
    value: 5
}

export const diamonds6 = {
    name: "Six of Diamonds",
    img: "diamonds_6.png",
    suit: "diamonds",
    value: 6
}

export const diamonds7 = {
    name: "Seven of Diamonds",
    img: "diamonds_7.png",
    suit: "diamonds",
    value: 7
}

export const diamonds8 = {
    name: "Eight of Diamonds",
    img: "diamonds_8.png",
    suit: "diamonds",
    value: 8
}

export const diamonds9 = {
    name: "Nine of Diamonds",
    img: "diamonds_9.png",
    suit: "diamonds",
    value: 9
}

export const diamonds10 = {
    name: "Ten of Diamonds",
    img: "diamonds_10.png",
    suit: "diamonds",
    value: 10
}

export const diamondsJack = {
    name: "Jack of Diamonds",
    img: "diamonds_jack.png",
    suit: "diamonds",
    value: 11
}

export const diamondsQueen = {
    name: "Queen of Diamonds",
    img: "diamonds_queen.png",
    suit: "diamonds",
    value: 12
}

export const diamondsKing = {
    name: "King of Diamonds",
    img: "diamonds_king.png",
    suit: "diamonds",
    value: 13
}

export const diamondsAce = {
    name: "Ace of Diamonds",
    img: "diamonds_ace.png",
    suit: "diamonds",
    value: 14
}

export const hearts2 = {
    name: "Two of Hearts",
    img: "hearts_2.png",
    suit: "hearts",
    value: 2
}

export const hearts3 = {
    name: "Three of Hearts",
    img: "hearts_3.png",
    suit: "hearts",
    value: 3
}

export const hearts4 = {
    name: "Four of Hearts",
    img: "hearts_4.png",
    suit: "hearts",
    value: 4
}

export const hearts5 = {
    name: "Five of Hearts",
    img: "hearts_5.png",
    suit: "hearts",
    value: 5
}

export const hearts6 = {
    name: "Six of Hearts",
    img: "hearts_6.png",
    suit: "hearts",
    value: 6
}

export const hearts7 = {
    name: "Seven of Hearts",
    img: "hearts_7.png",
    suit: "hearts",
    value: 7
}

export const hearts8 = {
    name: "Eight of Hearts",
    img: "hearts_8.png",
    suit: "hearts",
    value: 8
}

export const hearts9 = {
    name: "Nine of Hearts",
    img: "hearts_9.png",
    suit: "hearts",
    value: 9
}

export const hearts10 = {
    name: "Ten of Hearts",
    img: "hearts_10.png",
    suit: "hearts",
    value: 10
}

export const heartsJack = {
    name: "Jack of Hearts",
    img: "hearts_jack.png",
    suit: "hearts",
    value: 11
}

export const heartsQueen = {
    name: "Queen of Hearts",
    img: "hearts_queen.png",
    suit: "hearts",
    value: 12
}

export const heartsKing = {
    name: "King of Hearts",
    img: "hearts_king.png",
    suit: "hearts",
    value: 13
}

export const heartsAce = {
    name: "Ace of Hearts",
    img: "hearts_ace.png",
    suit: "hearts",
    value: 14
}

const allCards = [spades2, spades3, spades4, spades5,
    spades6, spades7, spades8, spades9, spades10, 
    spadesJack, spadesQueen, spadesKing, spadesAce, 
    clubs2, clubs3, clubs4, clubs5,
    clubs6, clubs7, clubs8, clubs9, clubs10, 
    clubsJack, clubsQueen, clubsKing, clubsAce, 
    diamonds2, diamonds3, diamonds4, diamonds5,
    diamonds6, diamonds7, diamonds8, diamonds9, diamonds10, 
    diamondsJack, diamondsQueen, diamondsKing, diamondsAce, 
    hearts2, hearts3, hearts4, hearts5,
    hearts6, hearts7, hearts8, hearts9, hearts10, 
    heartsJack, heartsQueen, heartsKing, heartsAce];