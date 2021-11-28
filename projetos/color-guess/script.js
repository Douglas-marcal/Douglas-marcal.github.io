const displayRgbColor = document.querySelector('#rgb-color');
const colorGuessContainer = document.querySelector('#color-guess-container');
const answer = document.querySelector('#answer');
const buttonResetGame = document.querySelector('#reset-game');
const score = document.querySelector('#score');

function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 6);
  return randomNumber;
}

function createRandomColorRgb() {
  const random1 = Math.floor(Math.random() * 256);
  const random2 = Math.floor(Math.random() * 256);
  const random3 = Math.floor(Math.random() * 256);
  return `rgb(${random1}, ${random2}, ${random3})`;
}

function createColorGuessOnScreen() {
  for (let index = 0; index < 6; index += 1) {
    const createCircleColor = document.createElement('div');
    createCircleColor.classList.add('ball');
    createCircleColor.style.backgroundColor = createRandomColorRgb();
    colorGuessContainer.appendChild(createCircleColor);
  }
}

createColorGuessOnScreen();

function selectCorrectColor() {
  const arrayColors = [];
  const colors = document.querySelectorAll('.ball');
  for (let index = 0; index < colors.length; index += 1) {
    arrayColors.push(colors[index]);
  }
  const randomNumber = generateRandomNumber();
  const colorCorrect = arrayColors[randomNumber];
  colorCorrect.id = 'correct';
  displayRgbColor.textContent = colorCorrect.style.backgroundColor;
  return colorCorrect.style.backgroundColor;
}

selectCorrectColor();
let count = 0;
function verifyCondition(event) {
  const eventTarget = event.target;
  if (eventTarget.id === 'correct') {
    answer.textContent = 'Acertou!';
    count += 3;
    score.textContent = `Placar: ${count}`;
    colorGuessContainer.innerHTML = '';
    createColorGuessOnScreen();
    selectCorrectColor();
  } else {
    answer.textContent = 'Errou! Tente novamente!';
    count = 0;
    score.textContent = `Placar: ${count}`;
  }
}

colorGuessContainer.addEventListener('click', verifyCondition);

function gameReset() {
  colorGuessContainer.innerHTML = '';
  createColorGuessOnScreen();
  selectCorrectColor();
  answer.textContent = 'Escolha uma cor';
}

buttonResetGame.addEventListener('click', gameReset);
