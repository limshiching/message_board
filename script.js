const ATTEMPT_COUNT = 5

const wordGuessContainer = document.getElementById("guessed-word");
const guessedLettersContainer = document.getElementById("guessed-letter");
const newGameButton = document.getElementById("new-game-button");
const guessLetterForm = document.getElementById("guess-form");
const remainingGuess = document.getElementById("remaining-guesses")
const wordsToGuess = [
  "banana",
  "pineapple",
  "lemon",
  "apple",
  "orange",
  "pear",
  "peach",
  "coconut",
  "durian"
];

let attemptCount = ATTEMPT_COUNT
let chosenWord = "";
let allLettersGuessed = [];
let spaces

function initialWordSetup(word) {
  spaces = word.split("").map(function(letter) {
    return "_";
  });
  wordGuessContainer.innerHTML = spaces.join(" ");
}

function startNewGame() {
  allLettersGuessed = []
  guessLetterForm.classList.remove("d-none");
  remainingGuess.innerHTML = attemptCount
  wordGuessContainer.innerHTML = "";
  guessedLettersContainer.innerHTML = "";
  chosenWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
  initialWordSetup(chosenWord);
  console.log(chosenWord);
};

function showResult(message) {
  guessLetterForm.classList.add('d-none')
  wordGuessContainer.innerHTML = message
};

function checkWin() {
  if (spaces.join("") === chosenWord) {
    showResult('<h1>WIN!</h1>')
  }
};

function checkLose() {
  if (attemptCount <= 0) {
    showResult('<h1>LOSE!</h1>')
  }
};

newGameButton.onclick = function() {
  startNewGame();
};

guessLetterForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let guessedLetter = event.target.firstElementChild.value;
  // perform a check if you have already guessed the letter before
  if (allLettersGuessed.includes(guessedLetter)) {
    alert("Pick another letter");
  } else {
    let guessCorrectly = false
    chosenWord.split("").forEach(function(letter, index) {
      if (letter == guessedLetter) {
        // alert("found one letter");
        spaces[index] = guessedLetter
        wordGuessContainer.innerHTML = spaces.join(" ")
        guessCorrectly = true
      }
    });

    if (!guessCorrectly) {
      attemptCount--
      remainingGuess.innerHTML = attemptCount
    }
    
    // Add the current guessed letter into and array
    allLettersGuessed.push(guessedLetter);
    const li = document.createElement('li')
    li.innerText = guessedLetter
    guessedLettersContainer.appendChild(li)
  }

  guessLetterForm.reset() // clear the form input
  checkWin()
  checkLose()

});

// Replace the letter on the screen
// Add the letter into the guesses letters list
