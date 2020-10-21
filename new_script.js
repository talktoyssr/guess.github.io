let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses')
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const impText = document.querySelector('.impText');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField')
guessField.focus();

let guessCount = 1;
let resetButton;
let chancesUsed = 0;

function checkGuess() {
    chancesUsed++;
    let value = Number(guessField.value);

    if (guessCount === 1) { guesses.textContent = 'Previous Guesses : '; }
    guesses.textContent += value + ' ';

    if (value === randomNumber) {
        impText.textContent = 'you got it in ' + chancesUsed + ' chances';
        lastResult.textContent = 'Congratulations!!! ' + value + ' is the correct answer';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = ' ';
        setGameOver();
    }
    else if (guessCount === 10) {
        impText.textContent = 'Better Luck next time!! Try guessing within 10 attempts';
        lastResult.textContent = '!!!GAME OVER';
        lowOrHi.textContent = ' ';
        setGameOver();
    }
    else {
        impText.textContent = 'You got ' + (10 - chancesUsed) + ' chances left';
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (value < randomNumber) {
            lowOrHi.textContent = 'Move Higher';
        }
        else {
            lowOrHi.textContent = 'Dive Deeper';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start a new game';
    document.body.append(resetButton);
    resetButton.addEventListener('click',resetGame);
}


function resetGame() {
    chancesUsed = 0;
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}