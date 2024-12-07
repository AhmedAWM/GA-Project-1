// -------------------------- Constants -------------------------- //
const level = [easy, normal, hard];
const randomWord = level[Math.floor(Math.random() * level.length)]; // Get random level
const wordLevelTextElement = document.querySelector(".word-level-text");
const wordTypeElement = document.querySelector("#word-type");
const triesCountElement = document.querySelector("#tries");
const lettersDivElement = document.querySelector('.letters');

// -------------------------- Variables -------------------------- //
let randomWordIndex = Math.floor(Math.random() * level.length); // Get random index for the level difficulty
let easyWord = easy[Math.floor(Math.random() * 15)]; // Get random Easy word
let normalWord = normal[Math.floor(Math.random() * 15)]; // Get random Normal word
let hardWord = hard[Math.floor(Math.random() * 15)]; // Get random Hard word
let triesCount = 0; // Tries counter depending on the lever and word length
let letterInputsElements; // All the 'input' elements of the word will be stored in this variable

// -------------------------- Main code -------------------------- //
// Getting a random word with random level
if (randomWordIndex === 0) { // Easy
  wordLevelTextElement.textContent = "word level: easy";
  wordTypeElement.textContent = easyWord.type;
  putLetters(easyWord.word.length); // Call the function responsible of displaying the amount of letters depending on the word length
  triesCount = easyWord.word.length + 7; // Number of tries is the length of the word + 7 more tries for Easy words
} else if (randomWordIndex === 1) { // Normal
  wordLevelTextElement.textContent = "word level: normal";
  wordTypeElement.textContent = normalWord.type;
  putLetters(normalWord.word.length); // Call the function responsible of displaying the amount of letters depending on the word length
  triesCount = normalWord.word.length + 5; // Number of tries is the length of the word + 5 more tries for Normal words
} else { // Hard
  wordLevelTextElement.textContent = "word level: hard";
  wordTypeElement.textContent = hardWord.type;
  putLetters(hardWord.word.length); // Call the function responsible of displaying the amount of letters depending on the word length
  triesCount = hardWord.word.length + 3; // Number of tries is the length of the word + 3 more tries Hard words
}

//Initialize the game
init();

// ----------------------- Event Listeners ----------------------- //
letterInputsElements.forEach((input) => {
  input.addEventListener("input", (event) => { // When pressing a letter it should check if the letter is correct or not
    if(input.value === '') { // When the player deletes a wrong letter
      console.log("Nothing there!");
    } else if(input.value === 'h') { // When the user puts a correct letter it should disable that field to lock the correct answer
      console.log("That's correct!");
    } else {
      console.log("That's incorrect!");
    }
  });
});

// -------------------------- Functions -------------------------- //
function init() {
  triesCountElement.textContent = `Tries left: ${triesCount}`;
}

function putLetters(wordLength) {
  for(let i = 0; i < wordLength; ++i) {
    const letterElement = document.createElement('input'); // Creating an input element for each letter
    letterElement.setAttribute('type', 'text'); // Setting the attribute to type 'text'
    letterElement.setAttribute('id', `${i}`) // Each letter index set as an id
    letterElement.setAttribute('maxLength', '1'); // Each letter has a maximum number of characters set to 1 only
    lettersDivElement.appendChild(letterElement); // Add the letter to the 'letters' div
  }

  letterInputsElements = document.querySelectorAll('input'); // Get all the letter input elements
  console.log();
}