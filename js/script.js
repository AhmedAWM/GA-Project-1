// -------------------------- Constants -------------------------- //
const level = [easy, normal, hard];
const randomWord = level[Math.floor(Math.random() * level.length)]; // Get random level
const wordLevelTextElement = document.querySelector(".word-level-text");

// -------------------------- Variables -------------------------- //
let randomWordIndex = Math.floor(Math.random() * level.length); // Get random index for the level difficulty
let easyWord = easy[Math.floor(Math.random() * 15)];
let normalWord = normal[Math.floor(Math.random() * 15)];
let hardWord = hard[Math.floor(Math.random() * 15)];

// -------------------------- Main code -------------------------- //
// Getting the word randomly depending on the level
if (randomWordIndex === 0) {
  wordLevelTextElement.textContent = "word level: easy";
  console.log(`This word is Easy`);
  console.log(`Word: ${easyWord.word}`);
} else if (randomWordIndex === 1) {
  wordLevelTextElement.textContent = "word level: normal";
  console.log(`This word is Normal`);
  console.log(`Word: ${normalWord.word}`);
} else {
  wordLevelTextElement.textContent = "word level: hard";
  console.log(`This word is Hard`);
  console.log(`Word: ${hardWord.word}`);
}

// ----------------------- Event Listeners ----------------------- //

// -------------------------- Functions -------------------------- //
