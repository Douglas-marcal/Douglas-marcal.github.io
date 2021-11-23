const pixelBoard = document.querySelector('#pixel-board');
const colorPalette = document.querySelector('#color-palette');
const buttonClear = document.querySelector('#clear-board');
const buttonChangeBoardSize = document.querySelector('#generate-board');
const newColors = document.querySelector('#new-colors');

for (let index = 1; index <= 25; index += 1) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.classList.add('border');
  pixelBoard.appendChild(pixel);
}

function selectPalette(event) {
  if (event.target.id !== 'color-palette') {
    const elementSelected = document.querySelector('.selected');
    elementSelected.classList.remove('selected');
    event.target.classList.add('selected');
  }
}

colorPalette.addEventListener('click', selectPalette);

// Encontrei como capturar a cor com "getComputedStyle" aqui: https://www.ti-enxame.com/pt/javascript/obtenha-um-valor-de-css-com-javascript/972561989/

function changeColorOnClick(event) {
  if (event.target.id !== 'pixel-board') {
    const elementSelected = document.querySelector('.selected');
    const eventTarget = event.target;
    const colorValue = window.getComputedStyle(elementSelected).backgroundColor;
    eventTarget.style.backgroundColor = colorValue;
  }
}

pixelBoard.addEventListener('click', changeColorOnClick);

function clearBoard() {
  const allPixel = document.querySelectorAll('.pixel');
  for (let index = 0; index < allPixel.length; index += 1) {
    allPixel[index].style.backgroundColor = 'white';
  }
}

buttonClear.addEventListener('click', clearBoard);

function checkInterval(number) {
  if (number < 5) {
    return 5;
  } if (number > 50) {
    return 50;
  }
  return number;
}

function generateNewBoard() {
  const getInputValue = document.querySelector('#board-size');
  if (getInputValue.value !== '') {
    const number = checkInterval(getInputValue.value);
    pixelBoard.innerHTML = '';
    pixelBoard.style.width = `${number * 42}px`;
    pixelBoard.style.height = `${number * 42}px`;
    for (let index = 1; index <= number ** 2; index += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.classList.add('border');
      pixelBoard.appendChild(pixel);
    }
  } else {
    alert('Board inválido!');
  }
  getInputValue.value = '';
}

buttonChangeBoardSize.addEventListener('click', generateNewBoard);

function generateRandomColor() {
  const random1 = Math.floor(Math.random() * 256);
  const random2 = Math.floor(Math.random() * 256);
  const random3 = Math.floor(Math.random() * 256);
  return `rgb(${random1}, ${random2}, ${random3})`;
}

function randomColor() {
  const pickColorPalette = document.querySelectorAll('.color');
  for (let index = 1; index < pickColorPalette.length; index += 1) {
    pickColorPalette[index].style.backgroundColor = generateRandomColor();
  }
}

randomColor();

newColors.addEventListener('click', randomColor);
