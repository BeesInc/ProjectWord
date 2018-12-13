class Letter {
  constructor (l) {
    this.letter = l; //What letter this is
    this.trueValue = 0; //True value
    this.guessValue = 0; //User guessed value
  }

  getTrueValue() {
    let repeats = true; //True = there is a repeat, false = there isn't one
    let newValue; //Random value

    while (repeats) {
      newValue = Math.ceil(Math.random() * 26); //generates number
      for (let n in letters) {
        if (letters[n].trueValue == newValue) { //Found a repeat
          repeats = true;
          break;
        }
        else { //No repeats
          repeats = false;
        }
      }
    }
    this.trueValue = newValue;
  }

}

class Word {
  constructor (w) {
    this.word = w; //Word
    this.value = 0; //Value
  }

  validWord() { //checks if the word only uses letters in the alphabet & is long enough
    //If the word is long enough
    if (this.word.length < MIN_WORD_LENGTH) {
      alert("Input is not long enough");
      return false;
    }
    //If the word is in the english alphabet
    for (let n in dict) { //All numbers in the Dictionary array
      if (this.word == dict[n]) { //If the word is there, output true
        return true;
      }
    }
    alert("Input is not a valid English Word");
    return false; //If it isn't output false
  }

  getWordValue() { //Gets word value
    let tempValue = 0; //Value that will be added up
    for (let i = 0; i < this.word.length; i++) {
      for (let n in letters) { //Goes through all letters
        if (this.word.charAt(i) == letters[n].letter) {
          tempValue += letters[n].trueValue;
          break;
        }
      }
    }
    this.value = tempValue;
  }

  updateTable() { //Update table w/ word and value
    let mainTable = document.getElementById("wordList"); //Makes the table easily referencable
    let row = document.createElement("tr"); //Creating row
    //For the word
    let column = document.createElement("td"); //Creating text
    let text = document.createTextNode(this.word); //Text for word
      column.appendChild(text); //Adding the elements
      row.appendChild(column);
    //For the point value
    column = document.createElement("td"); //Creating text
    text = document.createTextNode(this.value); //Text for value
      column.appendChild(text); //Adding the elements
      row.appendChild(column);
    mainTable.appendChild(row);
  }

}

let words = []; //All words inputted
let MIN_WORD_LENGTH = 3; //Minimum word length needed to be valid
let letters = []; //Letters
let usedOnlyForReference = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //Letters in corresponding array positions
//For spell check use dict[];
//Which is a reference to englishDict.js,
//and I got the list of English words from https://github.com/dwyl/english-words words_alpha.txt

main(); //Main function that runs on startup

function main() {
  generateLetters();
  console.log(letters);
}

function generateLetters() {
  for (i = 0; i < 26; i++) {
    letters.push(new Letter(usedOnlyForReference[i]));
    letters[i].getTrueValue();
  }
}

function submitWord() { //Word submission process
  let currentWord = document.getElementById("inputWord").value; //Getting the new word
  currentWord = currentWord.toString().toLowerCase(); //Converting to a String and all lowercase
  words.push(new Word(currentWord));
  if (words[words.length - 1].validWord()) { //Checks if word only uses alphabet characters
    words[words.length - 1].getWordValue(); //Gets value
    words[words.length - 1].updateTable(); //Updates table
  }
  else { //Deletes b/c not a valid word
    words.pop();
  }
}
