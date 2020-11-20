// else if (cardCountArray.includes(2) && !cardCountArray.includes(3)) {   // pair or two pair
//   for (let value of cardCountArray) {                                 
//       let s = new Set;
//       if (value === 2) {
//           s.add(value);
//       }
//       if (s.size === 2) {                                             // two pair
//           score.twoPair = true;
//           score.highCard = s[0];
//           score.secondHighCard = s[1];
//       }
//       else {                                                          // pair
//           score.pair = true; 
//           score.highCard = getHighValue(cardCounts, 2);
//       };
// }

let set = new Set;
set.add("foo");
set.add("bar");
let setValues = set.values();
console.log(setValues.next().value);
console.log(setValues.next().value);