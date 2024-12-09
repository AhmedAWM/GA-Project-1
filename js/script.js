// -------------------------- Constants -------------------------- //
const level = [easy, normal, hard];
const randomWord = level[Math.floor(Math.random() * level.length)]; // Get random level
const wordLevelTextElement = document.querySelector(".word-level-text");
const wordTypeElement = document.querySelector("#word-type");
const triesCountElement = document.querySelector("#tries");
const lettersDivElement = document.querySelector(".letters");
const playAgainButtonElement = document.querySelector("#play-again-button");
const hangmanButtonElement = document.querySelector("#draw-hangman"); // Hangman draw button for testing

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
let randomWordIndex = Math.floor(Math.random() * level.length); // Get random index for the level difficulty
let easyWord = easy[Math.floor(Math.random() * 15)]; // Get random Easy word
let normalWord = normal[Math.floor(Math.random() * 15)]; // Get random Normal word
let hardWord = hard[Math.floor(Math.random() * 15)]; // Get random Hard word
let triesCount = 7; // Tries counter depending on the lever and word length
let letterInputsElements; // All the 'input' elements of the word will be stored in this variable
let isWinner = false;
let isLoser = false;

// -------------------------- Main code -------------------------- //
//Initialize the game
init();

// Getting a random word with random level
if (randomWordIndex === 0) {
  // Easy
  wordLevelTextElement.textContent = "word level: easy";
  wordTypeElement.textContent = easyWord.type;
  putLetters(easyWord.word.length); // Call the function responsible of displaying the amount of letters depending on the word length
  console.log(easyWord.word); // Display the word in colsole for testing purposes
} else if (randomWordIndex === 1) {
  // Normal
  wordLevelTextElement.textContent = "word level: normal";
  wordTypeElement.textContent = normalWord.type;
  putLetters(normalWord.word.length); // Call the function responsible of displaying the amount of letters depending on the word length
  console.log(normalWord.word); // Display the word in colsole for testing purposes
} else {
  // Hard
  wordLevelTextElement.textContent = "word level: hard";
  wordTypeElement.textContent = hardWord.type;
  putLetters(hardWord.word.length); // Call the function responsible of displaying the amount of letters depending on the word length
  console.log(hardWord.word); // Display the word in colsole for testing purposes
}

// ----------------------- Event Listeners ----------------------- //
// Checking of the letter entered is correct or not with keypress event listener
letterInputsElements.forEach((letter) => {
  letter.addEventListener("input", (event) => {
    // When pressing a letter it should check if the letter is correct or not
    if (letter.value === "") {
      // When the player deletes a wrong letter
      console.log("Nothing there!");
    } else if (letter.value === "h") {
      // When the user puts a correct letter it should disable that field to lock the correct answer
      letter.disabled = true;
      console.log("That's correct!");
    } else {
      updateTries(--triesCount);
      console.log("That's incorrect!");
    }
  });

  // Play again button will refresh the page so the player gets a new word
  playAgainButtonElement.addEventListener("click", () => {
    window.location.reload();
  });

  // Testing how to draw a hangman button
  hangmanButtonElement.addEventListener("click", () => {
    // Rope
    ropeElement1.classList.add("border-right");
    ropeElement2.classList.add("border-left");

    // Head
    headElement.classList.add("figure-head");

    // Body
    bodyElement1.classList.add("border-right");
    bodyElement2.classList.add("border-left");
    bodyElement3.classList.add("border-right");
    bodyElement4.classList.add("border-left");

    // Left arm
    leftArmElement.classList.add("left-arm");

    // Right arm
    rightArmElement.classList.add("right-arm");

    // Left leg
    leftLegElement.classList.add("left-leg");

    // Right leg
    rightLegElement.classList.add("right-leg");
  });
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
    lettersDivElement.appendChild(letterElement); // Add the letter to the 'letters' div
  }

  letterInputsElements = document.querySelectorAll("input"); // Get all the letter input elements
  console.log();
}

function updateTries(triesLeft) {
  // A function to update tries counter
  if (triesCount === 0) {
    // Loser
    letterInputsElements.forEach((input) => {
      input.disabled = true;
      input.style.border = "0.3rem solid red";
    });
  }

  triesCountElement.textContent = `Tries left: ${triesCount}`;
}
