let element1 = "foo";
let element2 = "bar";
let element3 = "pig";

// console.log(element1), console.log(element2), etc. 

// for (let x = 1; x < 4; x++) {
//     let myReference = "element" + x;    
//     var f = new Function("console.log(" + myReference + ");");
// }

let myReference = "element" + x;    
var f = new Function("console.log("foo")");
// var f = new Function("console.log(" + myReference + ");");
console.log(f);

    // console.log(myReference);
    // console.log(element${x});



// var f = new Function('name', 'return alert("hello, " + name + "!");');
// f('erick');

// for (let x = 1; x < 4; x++) {
//     let myReference = "element" + x;
//     console.log(myReference);
//     // console.log(element${x});
// }

// var createFunction = () => { 
//     return function () {
//         console.log("You are that pig.");
//     }
//  }

//  createFunction();
//  generatedFunction();


/*
var f = new Function('name', 'return alert("hello, " + name + "!");');
f('erick');


You create a function that returns a function:

function createStateManager(playerId) {
    return function (newState) {
        ytpStateHelper(playerId , newState);
    }
}
Then you call your function factory when setting up the event listener:

var player = document.getElementById(playerId);
player.addEventListener("onStateChange", createStateManager(playerId));
*/