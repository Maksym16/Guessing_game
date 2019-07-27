/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

const hintNums = document.querySelector('.hint-nums');
const submit = document.getElementById('submit');
const mess = document.querySelector('.message')
const reset = document.getElementById('reset-btn');
const hint = document.getElementById('hint-btn');
const inputGuess = document.getElementById('inputGuess');
const guessedNums = document.getElementById('guessList')


function getRandomNum() {
    return Math.floor(Math.random() * (100 - 1 + 1) + 1);
}

var Game = function() {
    this.playersGuess = null;
    this.winningNumber = getRandomNum();
    this.pastGuesses = []; 
    this.useHint = true;
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber)
}

Game.prototype.playersGuessSubmission = function(inputGuess){
    let guess = parseInt(inputGuess.value);
    
    if (isNaN(guess) || (guess < 1 || guess > 100)) {
        setMessage('That is an invalid guess. Please enter a number between 1 and 100', 'red');
        setTimeout(setMessage, 2000);
        inputGuess.value = ''
    } else {
        game.playersGuess = guess
        let myGuess = game.playersGuess
        game.checkGuess(myGuess);
    }
}

Game.prototype.checkGuess = function (myGuess){
    inpColorBorder(myGuess)
   
    if (myGuess === game.winningNumber) {   
        setMessage(`You won!!! The winning number is ${game.winningNumber}`, 'green')
    } else if (count === 5) {
        console.log(this.pastGuesses.length)
        setMessage(`Sorry, you lost. The Answer is ${game.winningNumber}. Good Bye.`, 'red')
        inputGuess.value = ''
    } else if (game.pastGuesses.indexOf(myGuess) !== -1){
        setMessage('You have already tried this number. Try again', 'red')
    } else if (game.difference() < 20){
        alreadyGuess(myGuess)  
        setMessage(`${myGuess} is not correct. You are supper close.`, 'red')
        setTimeout(setMessage, 2000);
    } else if (game.difference() < 45){
        alreadyGuess(myGuess)
        setMessage(`${myGuess} is not correct. But it's warm.`, '#f5eee8')
        setTimeout(setMessage, 2000);
        
    } else if (game.difference() < 65){
        alreadyGuess(myGuess)  
        setMessage(`${myGuess} is not correct. Cooooold`, '#f5eee8')
        setTimeout(setMessage, 2000);
    } else {
        alreadyGuess(myGuess)
        setMessage(`${myGuess} is not correct. Hey dude, you can do better`, '#f5eee8')
        setTimeout(setMessage, 2000);
    }
    console.log(game.pastGuesses)
    console.log(count)
}

Game.prototype.provideHint = function(){
    let hints = shuffle([
        getRandomNum(),
        getRandomNum(),
        getRandomNum(), 
        game.winningNumber,
        getRandomNum(),
        getRandomNum(),
    ]).forEach(num => {
        const li = document.createElement('li');
        li.className = 'hint-num';
        li.appendChild(document.createTextNode(num));
        hintNums.appendChild(li);
    })
    setTimeout(clear, 4000)
    
}
    

let game = new Game;
let count = 0;

function setMessage(msg, color) {
    mess.style.color = color;
    mess.textContent = msg;
}

function inpColorBorder(myGuess){
    if (game.winningNumber > myGuess) {
        inputGuess.style.borderColor = 'blue'
    } else if (game.winningNumber < myGuess) {
        inputGuess.style.borderColor = 'red'
    } else {
        inputGuess.style.borderColor = 'green'
    }
}

function alreadyGuess(myGuess){
    game.pastGuesses.push(myGuess)
    count += 1;
    game.pastGuesses.forEach(num => {
        const li = document.createElement('li');
        li.className = 'guessLists';
        li.appendChild(document.createTextNode(num));
        guessedNums.appendChild(li);
        inputGuess.value = ''
    });
    game.pastGuesses = []
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function clear(){
    document.querySelector(".hint-nums").style.display = "none"; 
}
function clearMsg() {
    mess.value = ''
}

reset.addEventListener('click', function (e) {
    if (e.target.id === 'reset-btn') {
        window.location.reload(); 
    }
});

submit.addEventListener('click', function(){
    game.playersGuessSubmission(inputGuess);
})

hint.addEventListener('click', function(){
    if (game.useHint === true){
        game.provideHint();
    }
    return game.useHint = false;
})

console.log(game.useHint)