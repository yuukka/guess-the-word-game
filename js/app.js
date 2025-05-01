import { quizzes, hrgn, states, translations, pokemons} from './data.js';

// Variables
let initialEle = document.getElementById("initial-state");
let gameEle = document.getElementById("game-state");
let winEle = document.getElementById("win-state");
let endEle = document.getElementById("end-state");
let startButton =  document.getElementById("start");
let ruleButton =  document.getElementById("rule");
let popup = document.getElementById("popup");
let closeButton =  document.getElementById("close-button");
let hintEle = document.getElementById("random-options");
let dropEle = document.getElementById("flex-drop");
let pictureEle = document.getElementById("picture");
let returnButton = document.getElementById("return-button");
let hintButton = document.getElementById("hint-button");
let chkanswertButton = document.getElementById("chkanswer-button");
let nextButton = document.getElementById("next-button");
let resetButton = document.getElementById("reset-button");
let answerEle = document.getElementById("answer-input");
let welldoneStemps = document.getElementById("welldone-stemp");
let notcorrectStemps = document.getElementById("notcorrect-stemp");
let questionNumber = document.getElementById("question-number");
let tryNumber = document.getElementById("try-number");
let winButton = document.getElementById("win-button");
let endImg = document.getElementById("end-img");
let getCharacter = document.getElementById("get-character");
let winCharacter = document.getElementById("win-character");
let endCharacter = document.getElementById("end-character");
let winMessage = document.getElementById("win-message-div");
let endMessage = document.getElementById("end-message-div");
let backButton = document.getElementById("win-back-button");
let board = document.getElementById("board");
let langugeToggle = document.getElementById("language-toggle");
let langugeToggleJP = document.getElementsByClassName("on");
let langugeToggleEN = document.getElementsByClassName("off");
let originalAns
let currentQuiz1;
let randNumber;
let randomizedhrgn;
let div;
let dropDiv;
let currentQ;
let result = 0;
let discrepancy = 0;
let attempt = 0;
let state = "";
let hintList = "";
let answer = "";
let randomChoices = "";
let randNumberhrgn;
let characters = "";
let randomizedhrgns = "";
let quizArray = [];
let newQuiz;
let availableQuizzes;
let concatChoices = "";
let defaultLanguage = "";
let draggedElement = "";
let draggedText = "";


// Class
class currentQuiz {
  constructor(name, number, wordCount) {
    this.name = name;
    this.number = number;
    this.wordCount = wordCount;
  }
  resetCurrentQuiz() {
    this.name = null;
    this.number = null;
    this.wordCount = null;
  }
}


// Functions
function changeLanguage(lang) {
  if (langugeToggle.checked) {
    lang = 'en';
  } else {
    lang = 'jp';
    console.log("lan jp");
  }
  document.documentElement.lang = lang; 
  const trans = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    element.innerHTML = trans[key];
  });
}

window.onload = () => {
  defaultLanguage = 'en';
  changeLanguage(defaultLanguage);
};


function init() {
  questionNumber.innerText = 1;
  tryNumber.innerText = 1;
  result = 0;
  for (let i = 0; i < quizzes.length; i++ ) {
    quizzes[i].show = false;
  }
      nextButton.style.display = "block";
      winButton.style.display = "none"
  randomQ();
};


function randomQ() {
    // Filter quizzes that haven't been shown yet
    availableQuizzes = quizzes.filter(quiz => !quiz.show);
    // If no quizzes left to show
    if (availableQuizzes.length === 0) {
          console.log("No new quiz");
    }

    randNumber = Math.floor(Math.random() * availableQuizzes.length);

    pictureEle.src = availableQuizzes[randNumber].photo;
    discrepancy = 10 - availableQuizzes[randNumber].wordCount; 
    availableQuizzes[randNumber].show = true; 

    for (let i = 0; i < discrepancy; i++) {
        randNumberhrgn = Math.floor(Math.random() * 20);
        randomChoices += hrgn[randNumberhrgn];
        
    } 

    answer = availableQuizzes[randNumber].name;
    createElements(answer, "Answer");
    createElements(randomChoices, "randomChoices");
    randomizeDiv() 
    answer += randomChoices;
    answer = answer.split("");

    for (let i = answer.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [answer[i], answer[j]] = [answer[j], answer[i]]; // Swap
      }

    randomizedhrgns = answer.join("");
    createDropDiv(availableQuizzes[randNumber].name);
    newQuiz = new currentQuiz(availableQuizzes[randNumber].name, availableQuizzes[randNumber].number, availableQuizzes[randNumber].wordCount);
    quizArray.push(newQuiz);
};


function randomizeDiv() {
  const divs = Array.from(hintEle.children);
  // Shuffle 
  for (let i = divs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [divs[i], divs[j]] = [divs[j], divs[i]];
  }
  // Re-append the shuffled divs
  divs.forEach(div => hintEle.appendChild(div));
}


function createDropDiv(answer) {
  for (let i = 0; i < answer.length; i++) {
    randomizedhrgn = randomizedhrgns[i];
    dropDiv = document.createElement('div');
    dropDiv.randomizedhrgn = randomizedhrgn;
    dropDiv.setAttribute("ondrop", "dropHandler(event)");
    dropDiv.setAttribute("ondragover", "dragoverHandler(event)");
    dropDiv.setAttribute("class", "dropEle");
    dropDiv.style.border = '3px solid var(--white)';
    dropDiv.style.borderRadius = "8px";
    dropDiv.style.height = '2.3rem';
    dropDiv.style.width = '2.3rem';
    dropDiv.style.textAlign = 'center';
    dropDiv.style.boxSizing = 'border-box';
    dropEle.appendChild(dropDiv); 
  }
}


function createElements(randomizedhrgns, charType) {

  for (let i = 0; i < randomizedhrgns.length; i++) {
    randomizedhrgn = randomizedhrgns[i];
    div = document.createElement('div');
    div.randomizedhrgn = randomizedhrgn;
    div.textContent = `${randomizedhrgn}`;
    div.setAttribute("draggable", "true");
    div.setAttribute("ondragstart", "dragstartHandler(event)");
    div.setAttribute("id", `${randomizedhrgn} + ${[i]}`);
    div.style.border = '3px solid var(--white)';
    div.style.borderRadius = "8px";
    div.style.height = '2.3rem';
    div.style.width = '2.3rem';
    div.style.textAlign = 'center';
    div.style.boxSizing = 'border-box';
    hintEle.appendChild(div);
    console.log("div: "+ div);
    console.log("hintEle: "+ hintEle);
    if (charType === "Answer") {
      div.setAttribute("class", "correctChoice");
    }
  }
}


function dragstartHandler(event) {
  event.dataTransfer.setData("text", event.target.id);
}


function dragoverHandler(event) {
  event.preventDefault();
}


function dropHandler(event) {
  event.preventDefault();
  const dropTarget = event.target.closest(".dropEle");
  // Not a valid drop zone
  if (!dropTarget) return; 
  // Prevent drop if already occupied
  if (dropTarget.children.length > 0) return;
    const data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    event.target.style.border = "none";
    draggedElement = document.getElementById(data);
    draggedText = draggedElement.innerText;
    concatChoices += draggedText;
    validateAnswer(concatChoices);
    console.log("data: " + data);
    console.log("draggedElement: " + draggedElement);
    console.log("draggedText: " + draggedText);
    console.log("concatChoices: " + concatChoices);
}


function validateAnswer(concatChoices) {
  let correctAnswer = availableQuizzes[randNumber].name;
  if(!concatChoices) {
        console.log("No value!");   
  } else {
      if (questionNumber.innerText === "5" && (concatChoices.length === correctAnswer.length) && (concatChoices === correctAnswer) && notcorrectStemps.style.display !== "inline"){
      result = 1;
      welldoneStemps.style.display = 'inline';
      resetButton.setAttribute("disabled","");
      resetButton.style.backgroundColor = 'var(--gray)';
      nextButton.style.display = "none";
      winButton.style.display = "block"
    } else if (questionNumber.innerText === "5" && (concatChoices.length === correctAnswer.length) && (concatChoices === correctAnswer) && notcorrectStemps.style.display === "inline") {
      result = 1;
      notcorrectStemps.style.display = 'none';
      welldoneStemps.style.display = 'inline';
      resetButton.setAttribute("disabled","");
      resetButton.style.backgroundColor = 'var(--gray)';
      nextButton.style.display = "none";
      winButton.style.display = "block"
    } else if ((concatChoices.length === correctAnswer.length) && (concatChoices === correctAnswer) && notcorrectStemps.style.display !== "inline"){
      welldoneStemps.style.display = 'inline';
      resetButton.setAttribute("disabled","");
      resetButton.style.backgroundColor = 'var(--gray)';
      nextButton.removeAttribute('disabled');
      nextButton.style.backgroundColor = 'var(--green)';
    } else if ((concatChoices.length === correctAnswer.length) && (concatChoices === correctAnswer) && notcorrectStemps.style.display === "inline") {
      notcorrectStemps.style.display = 'none';
      welldoneStemps.style.display = 'inline';
      resetButton.setAttribute("disabled","");
      resetButton.style.backgroundColor = 'var(--gray)';
      nextButton.removeAttribute('disabled');
      nextButton.style.backgroundColor = 'var(--green)';
    } else if (concatChoices.length !== correctAnswer.length) {
      console.log("not done yet");
    } else if (attempt === 2 && (concatChoices.length === correctAnswer.length) && (concatChoices !== correctAnswer) ) {
      attempt += 1;
      result = 2;
      tryNumber.innerText = Number(tryNumber.innerText) + 1;
      switchState();
    }  else {
      notcorrectStemps.style.display = 'inline';
      attempt += 1;
      tryNumber.innerText = Number(tryNumber.innerText) + 1;
      console.log(attempt);
    }  
  }
};


function resetChoices() {
  let parentElement = document.getElementById('flex-drop'); // Replace 'parentElement' with the actual ID
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}


function generateNext() {
  resetChoices();
  reset();
  randomQ();
  tryNumber.innerText = 1;
  questionNumber.innerText = Number(questionNumber.innerText) + 1;
}


function reset(){
  discrepancy = 0;
  randNumber = "";
  randNumberhrgn = "";
  randomChoices = "";
  answer = "";
  randomizedhrgns = "";
  hintEle.innerText = "";
  attempt = 0;
  welldoneStemps.style.display = 'none';
  concatChoices = "";
  draggedElement = "";
  draggedText = "";
  nextButton.setAttribute("disabled", "");
  nextButton.style.backgroundColor = 'var(--gray)';
  resetButton.removeAttribute("disabled", "");
  resetButton.style.backgroundColor = 'var(--green)';
} 


function resetDragDrop() {
  // Move all children from dropEle back to hintEle
  const dropTargets = dropEle.querySelectorAll('.dropEle');
  dropTargets.forEach(drop => {
    if (drop.firstChild) {
      hintEle.appendChild(drop.firstChild); // Move draggable back
    }
    // Reset the border for the drop target
    drop.style.border = '3px solid var(--white)';
  });
  // Clear answer so player can try again
  concatChoices = "";
  draggedElement = "";
  draggedText = "";
  welldoneStemps.style.display = 'none';
  notcorrectStemps.style.display = 'none';
}


function showHint() {
  const divs = Array.from(hintEle.children);
  for (let i = 0; i <= divs.length - 1; i++) {
    if (divs[i].classList.contains("correctChoice") === true) {
      divs[i].style.borderColor = 'var(--black)';   
    }
  }
}


function switchState() {
  if (state === "initial-state" || state === "") {
    initialEle.style.display = "none";
    state = "game-state";
    console.log("ここ通過")
    init();
    gameEle.style.display = "block";

  } else if (state === "game-state" && result === 1) {
    initialEle.style.display = "none";
    gameEle.style.display = "none";
    state = "win-state";
    showResult();

  } else if (state === "game-state" && result === 2) {
    state = "end-state";
    initialEle.style.display = "none";
    gameEle.style.display = "none";
    showResult();
  } else if (state === "win-state" || state === "end-state") {
    state = "initial-state";
    initialEle.style.display = "";
    gameEle.style.display = "none";
    winEle.style.display = "none";
    quizArray.forEach(quiz => quiz.resetCurrentQuiz());
    generateNext();
    for (let i = 0; i < quizzes.length; i++) {
      quizzes[i].show = false;
    }
  }
}


function openPopup(){
  popup.classList.add("open-popup");
  console.log("hello");
}


function closePopup(){
  popup.classList.remove("open-popup");
}


function showResult() {
  // geterate some pokemon
  if (result === 1) {
    let pickedImage = Math.floor(Math.random() * pokemons.length);
    console.log(pickedImage);
    endImg.src = `./media/pokemon/${pokemons[pickedImage].imageUrl}`;
    endMessage.style.display = "none";
    if(langugeToggle.checked) {
      winCharacter.innerText = `${pokemons[pickedImage].englishName}`;
    } else {
      winCharacter.innerText = `${pokemons[pickedImage].name}`;
    }
  } else {
    let lastQuize = quizArray.length - 1;
    endImg.src = "./media/nexttime.png";
    endCharacter.innerText = `${quizArray[lastQuize].name}`;
    winMessage.style.display = "none";
  }
  winEle.style.display = "block";
}


function pickImage() {
  Math.floor(Math.random() *  imageFiles.length);
}


// Event Listeners
startButton.addEventListener("click", switchState);
nextButton.addEventListener("click", generateNext);
resetButton.addEventListener("click", resetDragDrop);
hintButton.addEventListener("click", showHint);
ruleButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
winButton.addEventListener("click", switchState);
backButton.addEventListener("click", switchState);
langugeToggle.addEventListener("click", changeLanguage)