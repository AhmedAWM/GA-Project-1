// -------------------------- Constants -------------------------- //
const level = [easy, normal, hard];
const randomWord = level[Math.floor(Math.random() * level.length)]; // Get random level
const wordLevelTextElement = document.querySelector(".word-level-text");
const wordTypeElement = document.querySelector("#word-type");
const triesCountElement = document.querySelector("#tries");
const lettersDivElement = document.querySelector(".letters");
const playAgainButtonElement = document.querySelector("#play-again-button");
const hangmanButtonElement = document.querySelector("#draw-hangman"); // Hangman draw button for testing
const winLoseElement = document.querySelector('.win-lose-text');
const keyboard = document.querySelectorAll('.key');

// Hangman figure elements (as for the rope or body, no need for element constants)
const ropeElement1 = document.querySelector(".c1-r1");
const ropeElement2 = document.querySelector(".c2-r1");
const headElement = document.querySelector(".c1-r2-sub");
const bodyElement1 = document.querySelector(".c1-r3");
const bodyElement2 = document.querySelector(".c2-r3");
const bodyElement3 = document.querySelector(".c1-r4");
const bodyElement4 = document.querySelector(".c2-r4");
const leftArmElement = document.querySelector(".c1-r3");
const rightArmElement = document.querySelector(".c2-r3");
const leftLegElement = document.querySelector(".c1-r5");
const rightLegElement = document.querySelector(".c2-r5");

// -------------------------- Variables -------------------------- //
let wordArray = [];
let randomWordIndex = Math.floor(Math.random() * level.length); // Get random index for the level difficulty
let easyWord = easy[Math.floor(Math.random() * 15)]; // Get random Easy word
let normalWord = normal[Math.floor(Math.random() * 15)]; // Get random Normal word
let hardWord = hard[Math.floor(Math.random() * 15)]; // Get random Hard word
let triesCount = 7; // Tries counter depending on the lever and word length
let letterInputsElements; // All the 'input' elements of the word will be stored in this variable
let letterExistArray = []; // Stores all the indexes of the letter if exists, if the array is empty by the end of the tries, then the player loses!
let letterExists = false;

// -------------------------- Main code -------------------------- //
//Initialize the game
init();

// Getting a random word with random level
if (randomWordIndex === 0) {
  // Easy
  wordLevelTextElement.textContent = "word level: easy";
  wordTypeElement.textContent = easyWord.type;
  wordArray = easyWord.word.split(''); // Store the word in an array of characters
  putLetters(easyWord.word.length); // Call the function responsible of displaying the amount of letters depending on the word length
  console.log(wordArray); // Display the word in colsole for testing purposes
} else if (randomWordIndex === 1) {
  // Normal
  wordLevelTextElement.textContent = "word level: normal";
  wordTypeElement.textContent = normalWord.type;
  wordArray = normalWord.word.split(''); // Store the word in an array of characters
  putLetters(normalWord.word.length); // Call the function responsible of displaying the amount of letters depending on the word length
  console.log(wordArray); // Display the word in colsole for testing purposes
} else {
  // Hard
  wordLevelTextElement.textContent = "word level: hard";
  wordTypeElement.textContent = hardWord.type;
  wordArray = hardWord.word.split(''); // Store the word in an array of characters
  putLetters(hardWord.word.length); // Call the function responsible of displaying the amount of letters depending on the word length
  console.log(wordArray); // Display the word in colsole for testing purposes
}

// ----------------------- Event Listeners ----------------------- //
// On-Screen keyboard event listener
keyboard.forEach((key) => {
  key.addEventListener('click', (event) => {
    for(let i = 0; i < wordArray.length; ++i) {
      if(event.target.textContent === wordArray[i]) {
        let object = {index: i, letter: event.target.textContent};
        letterExistArray.push(object); // Add the letter and index to this array
        letterExists = true;
        key.style.border = '0.4rem solid green';
      }
    }

    checkWinning(letterExistArray.length, letterInputsElements.length);

    if(!letterExists) {
      updateTries(--triesCount);
      key.style.border = '0.4rem solid red';
    }

    letterExists = false; // Resets the letterExists to false

    for(let j = 0; j < letterExistArray.length; ++j) { // Put letter in every box that exists in
      if(letterExistArray.length !== 0) {
        letterInputsElements[letterExistArray[j].index].value = letterExistArray[j].letter;
      }
    }

    key.disabled = true;
    //key.style.border = '0.4rem solid #3a639b'; // Changes the border color to primary blue color to determine that the letter has already been chosen

    console.log(letterExistArray);

    console.log(event.target.textContent);
  });
});

// Play again button will refresh the page so the player gets a new word
playAgainButtonElement.addEventListener("click", () => {
  window.location.reload();
});

// -------------------------- Functions -------------------------- //
function init() {
  triesCount = 7;
  triesCountElement.textContent = `Tries left: ${triesCount}`;
}

function putLetters(wordLength) {
  for (let i = 0; i < wordLength; ++i) {
    const letterElement = document.createElement("input"); // Creating an input element for each letter
    letterElement.setAttribute("type", "text"); // Setting the attribute to type 'text'
    letterElement.setAttribute("id", `${i}`); // Each letter index set as an id
    letterElement.setAttribute("maxLength", "1"); // Each letter has a maximum number of characters set to 1 only
    letterElement.setAttribute("disabled", true); // Each letter input is disabled so player cannot type the letter using physical keyboard
    lettersDivElement.appendChild(letterElement); // Add the letter to the 'letters' div
  }

  letterInputsElements = document.querySelectorAll("input"); // Get all the letter input elements
}

function checkWinning(words, letters) { // Checking if the player wins
  if(words === letters) {
    letterInputsElements.forEach((input) => { // Make all input letters border green, as an indication of winning
      input.style.border = "0.3rem solid green";
    });

    keyboard.forEach((key) => { // Disable the keyboard
      key.disabled = true;
    });

    winLoseElement.textContent = 'You Won!' // Adding a text for winning
    winLoseElement.style.color = 'green' // Winning text in green
  }
}

function updateTries(triesLeft) { // Update tries counter and check for losing
  switch(triesLeft) {
    case 6: // Draw rope
      ropeElement1.classList.add("border-right");
      ropeElement2.classList.add("border-left");
      break;

    case 5: // Draw head
      headElement.classList.add("figure-head");
      break;

    case 4: // Draw body
      bodyElement1.classList.add("border-right");
      bodyElement2.classList.add("border-left");
      bodyElement3.classList.add("border-right");
      bodyElement4.classList.add("border-left");
      break;

    case 3: // Draw right arm
      rightArmElement.classList.add("right-arm");
      break;

    case 2: // Draw left arm
      leftArmElement.classList.add("left-arm");
      break;

    case 1: // Draw right leg
      rightLegElement.classList.add("right-leg");
      break;

    case 0: // Draw left leg
      leftLegElement.classList.add("left-leg");
      break;
  }

  if (triesCount === 0) { // If the player consumes all the tries
    letterInputsElements.forEach((input) => { // Make all input letters border red, as an indication of losing
      input.style.border = "0.3rem solid red";
    });

    keyboard.forEach((key) => { // Disable the keyboard
      key.disabled = true;
    });

    winLoseElement.textContent = 'You lost!'  // Adding a text for losing
    winLoseElement.style.color = 'red' // Losing text in red
  }

  triesCountElement.textContent = `Tries left: ${triesCount}`;
}