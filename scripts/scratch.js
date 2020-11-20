// var text = "You are that pig.";
// let result = text.match(/pig/);

// let string = array.join();
// let pattern = /(\d,){2}/;
// let result = string.match(pattern);
// console.count(result);


// var array =  [2, 3, 3, 7, 7]; // two pair
// var array2 = [2, 2, 4, 8, 8]; // two pair
// var array3 = [2, 3, 4, 4, 4]; // three of a kind
// var array4 = [2, 2, 2, 2, 4]; // four of a kind

// test(array2);

// function test(input){
//     let count = 0; 
//     for (let i = 0; i<input.length; i++) {
//         if (input[i] === input[i+1]) {++count};
//     }
//     if (count === 3) {
//         fourOfAKind = true;
//         return;
//     }
//     if (count === 2) {
//         threeOfAKind = true;
//         return;
//     }
//     if (count === 1) {
//         pair = true;
//     }
// }

// console.log([fourOfAKind, threeOfAKind, twoPair, pair]);

// TODO test for full house, two pair

var fourOfAKind = false;
var threeOfAKind = false;
var pair = false;
var twoPair = false; 

var array =  [2, 3, 3, 7, 7]; // two pair
var array2 = [2, 2, 4, 8, 8]; // two pair
var array3 = [2, 3, 4, 4, 4]; // three of a kind
var array4 = [2, 2, 2, 2, 4]; // four of a kind

var counts = {};
for (var i = 0; i < array.length; i++) {
  var num = array[i];
  counts[num] = counts[num] ? counts[num] + 1 : 1;
}

console.log( counts);

// if (countMap.has(4)) { fourOfAKind = true };
// if (countMap.has(3) && countMap.has(2)) { fullHouse = true };

// console.log([fourOfAKind, threeOfAKind, twoPair, pair]);