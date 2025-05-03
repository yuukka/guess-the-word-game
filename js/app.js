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
let touchDragEl = null;
let offsetX = 0;
let offsetY = 0;
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Class
// To store the quiz after generating new quiz instance, 
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
// Switch the language between English and Japanese. If language toggle is checked show the text is English, else show Japanese. 
function changeLanguage(lang) {
  if (langugeToggle.checked) {
    lang = 'en';
  } else {
    lang = 'jp';
  }
  document.documentElement.lang = lang; 
  const trans = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    element.innerHTML = trans[key];
  });
}

// Set the default language to be in Japanese when the page load
window.onload = () => {
  defaultLanguage = 'en';
  changeLanguage(defaultLanguage);
};

// Prepare to generate the quiz and call randomQ function to generate first quiz
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

// Generate random quiz from a pool of available quizzes 
function randomQ() {
  // Filter quizzes that haven't been shown yet
  availableQuizzes = quizzes.filter(quiz => !quiz.show);
  // If no quizzes left to show
  if (availableQuizzes.length === 0) {
  }
  //Assign random integer to randNumber, up to the number of available quizzes
  randNumber = Math.floor(Math.random() * availableQuizzes.length);

  // Prepare to show the selected quiz to the user
  pictureEle.src = availableQuizzes[randNumber].photo;
  discrepancy = 10 - availableQuizzes[randNumber].wordCount; 
  availableQuizzes[randNumber].show = true; 

  // Pick random hrgn and assign it to randomChoices variable, which will be used to show available choices to the user later on
  for (let i = 0; i < discrepancy; i++) {
      randNumberhrgn = Math.floor(Math.random() * 20);
      randomChoices += hrgn[randNumberhrgn];
      
  } 

  // Create elements based on the generated hrgn and raondomize the order by calling randomizeDiv Function
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

  //Create the dop elements based on the length of the answer, create new instance so that we can track the available quizzes 
  createDropDiv(availableQuizzes[randNumber].name);
  newQuiz = new currentQuiz(availableQuizzes[randNumber].name, availableQuizzes[randNumber].number, availableQuizzes[randNumber].wordCount);
  quizArray.push(newQuiz);
};

// To randomize/shuffle the pool of generated hrgn elements
function randomizeDiv() {
  const divs = Array.from(hintEle.children);

  for (let i = divs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [divs[i], divs[j]] = [divs[j], divs[i]];
  }
  // Re-append the randomized divs
  divs.forEach(div => hintEle.appendChild(div));
}

// Create the Dop div under the img, this is where the user drop the answers
function createDropDiv(answer) {
  for (let i = 0; i < answer.length; i++) {
    randomizedhrgn = randomizedhrgns[i];
    dropDiv = document.createElement('div');
    dropDiv.randomizedhrgn = randomizedhrgn;
    dropDiv.className = "dropEle";
    dropDiv.style.border = '3px solid var(--white)';
    dropDiv.style.borderRadius = "8px";
    dropDiv.style.height = '2.3rem';
    dropDiv.style.width = '2.3rem';
    dropDiv.style.textAlign = 'center';
    dropDiv.style.boxSizing = 'border-box';
    dropDiv.addEventListener("drop", dropHandler);          
    dropDiv.addEventListener("dragover", dragoverHandler);   

    dropEle.appendChild(dropDiv); 
  }
}

// Create elements per hrgn.
function createElements(randomizedhrgns, charType) {

  for (let i = 0; i < randomizedhrgns.length; i++) {
    randomizedhrgn = randomizedhrgns[i];
    div = document.createElement('div');
    div.randomizedhrgn = randomizedhrgn;
    div.textContent = `${randomizedhrgn}`;
    // div.addEventListener("dragstart", dragstartHandler);
    // div.addEventListener("touchstart", handleTouchStart, { passive: false });
    // div.addEventListener("touchmove", handleTouchMove, { passive: false });
    // div.addEventListener("touchend", handleTouchEnd, { passive: false });
    div.setAttribute("draggable", "true");
    div.setAttribute("id", `${randomizedhrgn} + ${[i]}`);
    div.style.border = '3px solid var(--white)';
    div.style.borderRadius = "8px";
    div.style.height = '2.3rem';
    div.style.width = '2.3rem';
    div.style.textAlign = 'center';
    div.style.boxSizing = 'border-box';
    hintEle.appendChild(div);
    if (isTouchDevice) {
      div.addEventListener("touchstart", handleTouchStart, { passive: false });
      div.addEventListener("touchmove", handleTouchMove, { passive: false });
      div.addEventListener("touchend", handleTouchEnd, { passive: false });
    } else {
      div.addEventListener("dragstart", dragstartHandler);
    }
    // assign class of correctChoice to later use to highlight the hrgn when the user clikc on 'hint' button
    if (charType === "Answer") {
      div.setAttribute("class", "correctChoice");
    }
  }
}

function handleTouchStart(event) {
  if (event.target.classList.contains("correctChoice") || event.target.parentElement === hintEle) {
    touchDragEl = event.target;
    const touch = event.touches[0];
    const rect = touchDragEl.getBoundingClientRect();
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
    touchDragEl.style.position = 'absolute';
    touchDragEl.style.zIndex = '1000';
    touchDragEl.style.pointerEvents = 'none'; // avoid blocking events
    document.body.appendChild(touchDragEl);
    moveAt(touch.pageX, touch.pageY);
  }
}

function handleTouchMove(event) {
  if (!touchDragEl) return;
  event.preventDefault(); // prevent scrolling
  const touch = event.touches[0];
  moveAt(touch.pageX, touch.pageY);
}

function moveAt(pageX, pageY) {
  if (touchDragEl) {
    touchDragEl.style.left = (pageX - offsetX) + 'px';
    touchDragEl.style.top = (pageY - offsetY) + 'px';
  }
}

function handleTouchEnd(event) {
  if (!touchDragEl) return;
  const touch = event.changedTouches[0];
  const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
  const validDrop = dropTarget && dropTarget.classList.contains('dropEle') && dropTarget.children.length === 0;

  if (validDrop) {
    dropTarget.appendChild(touchDragEl);
    dropTarget.style.border = "none";
    draggedText = touchDragEl.innerText;
    concatChoices += draggedText;
    validateAnswer(concatChoices);
    touchDragEl.style.position = '';
  } else {
    // Revert back to pool
    hintEle.appendChild(touchDragEl);
    touchDragEl.style.position = '';
    touchDragEl.style.left = '';
    touchDragEl.style.top = '';
    touchDragEl.style.zIndex = '';
    touchDragEl.style.pointerEvents = '';
  }

  touchDragEl = null;
}

// When an element/hrgn starts being dragged, store the ID of that element in the dataTransfer object
function dragstartHandler(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// Needed this function to be able to drop the element/hrgn
function dragoverHandler(event) {
  event.preventDefault();
}

// Run this function when the dragged hrgn is over a droppable element
function dropHandler(event) {
  event.preventDefault();
  // Because the droppable element is not dropEle but child of the dropEle. Somehow needed this
  const dropTarget = event.target.closest(".dropEle");
  // Escape if it is not a valid drop zone
  if (!dropTarget) return; 
  // Prevent dropping if already occupied
  if (dropTarget.children.length > 0) return;

  //Get the hrgn text from dataTransfer object, as in the dragged element and validate the Answer
  const data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
  event.target.style.border = "none";
  draggedElement = document.getElementById(data);
  draggedText = draggedElement.innerText;
  concatChoices += draggedText;
  validateAnswer(concatChoices);
}

// Validate the answer choices and set show the corresponding stamp, allow the user to move to the next page.
function validateAnswer(concatChoices) {
  let correctAnswer = availableQuizzes[randNumber].name;
  if(!concatChoices) {
        return;
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
      return;
    } else if (attempt === 2 && (concatChoices.length === correctAnswer.length) && (concatChoices !== correctAnswer) ) {
      attempt += 1;
      result = 2;
      tryNumber.innerText = Number(tryNumber.innerText) + 1;
      switchState();
    }  else {
      notcorrectStemps.style.display = 'inline';
      attempt += 1;
      tryNumber.innerText = Number(tryNumber.innerText) + 1;
    }  
  }
};

//Loop through the parent element of the dropped element (.dropEle) and remove all elements
function resetChoices() {
  let parentElement = document.getElementById('flex-drop'); 
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

// Generate next questions when user click next button
function generateNext() {
  resetChoices();
  reset();
  randomQ();
  tryNumber.innerText = 1;
  questionNumber.innerText = Number(questionNumber.innerText) + 1;
}

// reset all variables, attributes, styles etc.
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
  // Loop through dropped element's parent (dropTargets) and move all dropped hrgn back to the pool of hrgn where it was origially
  const dropTargets = dropEle.querySelectorAll('.dropEle');
  dropTargets.forEach(drop => {
    if (drop.firstChild) {
      hintEle.appendChild(drop.firstChild); 
    }
    // Reset the border for the drop target
    drop.style.border = '3px solid var(--white)';
  });
  // Clear answer so user can try again
  concatChoices = "";
  draggedElement = "";
  draggedText = "";
  welldoneStemps.style.display = 'none';
  notcorrectStemps.style.display = 'none';
}

// Show hint. 'correctChoice' class was assigned to the correct hrgn in createElements function
function showHint() {
  const divs = Array.from(hintEle.children);
  for (let i = 0; i <= divs.length - 1; i++) {
    if (divs[i].classList.contains("correctChoice") === true) {
      divs[i].style.borderColor = 'var(--black)';   
    }
  }
}

// Switch page 
function switchState() {
  if (state === "initial-state" || state === "") {
    initialEle.style.display = "none";
    state = "game-state";
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


// To show the Rule of the game
function openPopup(){
  popup.classList.add("open-popup");
}


// To close the Rule popup
function closePopup(){
  popup.classList.remove("open-popup");
}

// Show the result page with randomly picked pokemon if the user got all question correct, if not show 'try next time' page if the user got single quiz three times wrong consecutively
function showResult() {
  // geterate some pokemon
  if (result === 1) {
    let pickedImage = Math.floor(Math.random() * pokemons.length);
    endImg.src = `./media/Pokemon/${pokemons[pickedImage].imageUrl}`;
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

// Event Listeners
startButton.addEventListener("click", switchState);
nextButton.addEventListener("click", generateNext);
resetButton.addEventListener("click", resetDragDrop);
hintButton.addEventListener("click", showHint);
ruleButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
winButton.addEventListener("click", switchState);
backButton.addEventListener("click", switchState);
langugeToggle.addEventListener("click", changeLanguage);
