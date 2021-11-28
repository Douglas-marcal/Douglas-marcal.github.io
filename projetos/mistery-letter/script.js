const botaoCriarCarta = document.querySelector('#criar-carta');
const containerDaCartaGerada = document.querySelector('#carta-gerada');
const textoDaCarta = document.querySelector('#carta-texto');
const containerContadorDePalavras = document.querySelector('#carta-contador');

function gerarCartaMisteriosa() {
  if (textoDaCarta.value.trim() !== '') {
    containerDaCartaGerada.innerHTML = '';
    const arrayDePalavras = textoDaCarta.value.split(' ');
    for (let index = 0; index < arrayDePalavras.length; index += 1) {
      const criaSpan = document.createElement('span');
      criaSpan.textContent = arrayDePalavras[index];
      containerDaCartaGerada.appendChild(criaSpan);
    }
  } else {
    containerDaCartaGerada.textContent = 'Por favor, digite o conteúdo da carta.';
  }
}

botaoCriarCarta.addEventListener('click', gerarCartaMisteriosa);

const grupoEstilo = ['newspaper', 'magazine1', 'magazine2'];
const grupoTamanho = ['medium', 'big', 'reallybig'];
const grupoRotacao = ['rotateleft', 'rotateright'];
const grupoInclinacao = ['skewleft', 'skewright'];

function adicionarClassesAleatorias() {
  const capturaAsSpans = document.querySelectorAll('span');
  for (let index = 0; index < capturaAsSpans.length; index += 1) {
    const estiloAleatorio = Math.floor(Math.random() * 3);
    const tamanhoAleatorio = Math.floor(Math.random() * 3);
    const rotacaoAleatoria = Math.floor(Math.random() * 2);
    const inclinacaoAleatoria = Math.floor(Math.random() * 2);
    capturaAsSpans[index].classList.add(`${grupoEstilo[estiloAleatorio]}`);
    capturaAsSpans[index].classList.add(`${grupoTamanho[tamanhoAleatorio]}`);
    capturaAsSpans[index].classList.add(`${grupoRotacao[rotacaoAleatoria]}`);
    capturaAsSpans[index].classList.add(`${grupoInclinacao[inclinacaoAleatoria]}`);
  }
}

botaoCriarCarta.addEventListener('click', adicionarClassesAleatorias);

function alteraEstiloDaCartaAoClicar(event) {
  const elementoClicado = event.target;
  const estiloAleatorio = Math.floor(Math.random() * 3);
  const tamanhoAleatorio = Math.floor(Math.random() * 3);
  const rotacaoAleatoria = Math.floor(Math.random() * 2);
  const inclinacaoAleatoria = Math.floor(Math.random() * 2);
  elementoClicado.className = '';
  elementoClicado.classList.add(`${grupoEstilo[estiloAleatorio]}`);
  elementoClicado.classList.add(`${grupoTamanho[tamanhoAleatorio]}`);
  elementoClicado.classList.add(`${grupoRotacao[rotacaoAleatoria]}`);
  elementoClicado.classList.add(`${grupoInclinacao[inclinacaoAleatoria]}`);
}

containerDaCartaGerada.addEventListener('click', alteraEstiloDaCartaAoClicar);

function acionaContadorDePalavras() {
  const quantidadeDePalavras = document.querySelectorAll('span').length;
  containerContadorDePalavras.textContent = quantidadeDePalavras;
}

botaoCriarCarta.addEventListener('click', acionaContadorDePalavras);

function adicionaCartaComEnter(event) {
  if (event.key === 'Enter') {
    gerarCartaMisteriosa();
    adicionarClassesAleatorias();
    acionaContadorDePalavras();
  }
}

textoDaCarta.addEventListener('keyup', adicionaCartaComEnter);
