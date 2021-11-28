const botaoCriarTarefa = document.querySelector('#criar-tarefa');
const listaOrdenada = document.querySelector('#lista-tarefas');
const botaoApagaTudo = document.querySelector('#apaga-tudo');
const botaoApagaFinalizados = document.querySelector('#remover-finalizados');
const botaoSalvarTarefas = document.querySelector('#salvar-tarefas');
const botaoMoverParaBaixo = document.querySelector('#mover-baixo');
const botaoMoverParaCima = document.querySelector('#mover-cima');
const botaoApagaSelecionados = document.querySelector('#remover-selecionado');
const textoTarefa = document.querySelector('#texto-tarefa');

function adicionaTarefa() {
  const textoDaTarefa = document.querySelector('#texto-tarefa');
  const itemDaLista = document.createElement('li');
  itemDaLista.textContent = textoDaTarefa.value;
  itemDaLista.classList.add('mb-2');
  listaOrdenada.appendChild(itemDaLista);
  textoDaTarefa.value = '';
}

botaoCriarTarefa.addEventListener('click', adicionaTarefa);

function adicionaTarefaComEnter(event) {
  if (event.key === 'Enter') {
    const itemDaLista = document.createElement('li');
    itemDaLista.textContent = textoTarefa.value;
    itemDaLista.classList.add('mb-2');
    listaOrdenada.appendChild(itemDaLista);
    textoTarefa.value = '';
  }
}

textoTarefa.addEventListener('keyup', adicionaTarefaComEnter);

function destacaItemSelecionado(event) {
  const removeCorDoElementoAnterior = document.querySelector('.selecionado');
  const elementoClicado = event.target;
  if (elementoClicado.id !== 'lista-tarefas') {
    if (removeCorDoElementoAnterior !== null) {
      removeCorDoElementoAnterior.classList.remove('selecionado');
      elementoClicado.classList.add('selecionado');
    } else {
      elementoClicado.classList.add('selecionado');
    }
  }
}

listaOrdenada.addEventListener('click', destacaItemSelecionado);

function adicionaOuRemoveTachado(event) {
  const elementoClicado = event.target;
  if (elementoClicado.id !== 'lista-tarefas') {
    elementoClicado.classList.toggle('completed');
  }
}

listaOrdenada.addEventListener('dblclick', adicionaOuRemoveTachado);

function apagaLista() {
  listaOrdenada.innerHTML = '';
}

botaoApagaTudo.addEventListener('click', apagaLista);

function removeFinalizados() {
  const itemDaLista = document.querySelectorAll('li');
  for (let index = 0; index < itemDaLista.length; index += 1) {
    if (itemDaLista[index].classList.contains('completed')) {
      itemDaLista[index].remove();
    }
  }
}

botaoApagaFinalizados.addEventListener('click', removeFinalizados);

function salvarTarefas() {
  const listaDeTarefasParaSalvar = document.querySelector('#lista-tarefas');
  const tarefasSalvas = (JSON.stringify(listaDeTarefasParaSalvar.innerHTML));
  localStorage.setItem('tarefas', tarefasSalvas);
}

botaoSalvarTarefas.addEventListener('click', salvarTarefas);

const capturaTarefasSalvasNoLocalStorage = localStorage.getItem('tarefas');
listaOrdenada.innerHTML = JSON.parse(capturaTarefasSalvasNoLocalStorage);

// https://www.ti-enxame.com/pt/javascript/mover-um-elemento-um-lugar-para-cima-ou-para-baixo-na-arvore-do-dom-com-javascript/822635469/
// https://developer.mozilla.org/en-US/docs/Web/API/Node
function capturaItemSelecionado() {
  const itemSelecionado = document.querySelector('.selecionado');
  return itemSelecionado;
}

function moverTarefaBaixo() {
  const itemSelecionado = capturaItemSelecionado();
  if (itemSelecionado !== null && itemSelecionado.nextSibling) {
    itemSelecionado.parentNode.insertBefore(itemSelecionado.nextSibling, itemSelecionado);
  }
}

botaoMoverParaBaixo.addEventListener('click', moverTarefaBaixo);

function moverTarefaCima() {
  const itemSelecionado = capturaItemSelecionado();
  if (itemSelecionado !== null && itemSelecionado.previousSibling) {
    itemSelecionado.parentNode.insertBefore(itemSelecionado, itemSelecionado.previousSibling);
  }
}

botaoMoverParaCima.addEventListener('click', moverTarefaCima);

function removeSelecionados() {
  const itemSelecionado = capturaItemSelecionado();
  itemSelecionado.remove();
}

botaoApagaSelecionados.addEventListener('click', removeSelecionados);
