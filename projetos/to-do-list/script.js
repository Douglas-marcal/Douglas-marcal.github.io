const botaoCriarTarefa = document.querySelector('#criar-tarefa');
const listaOrdenada = document.querySelector('#lista-tarefas');
const botaoApagaTudo = document.querySelector('#apaga-tudo');
const botaoApagaFinalizados = document.querySelector('#remover-finalizados');
const botaoSalvarTarefas = document.querySelector('#salvar-tarefas');
const botaoMoverParaBaixo = document.querySelector('#mover-baixo');
const botaoMoverParaCima = document.querySelector('#mover-cima');
const botaoApagaSelecionados = document.querySelector('#remover-selecionado');
const textoTarefa = document.querySelector('#texto-tarefa');

function criaElementoLi() {
  const itemDaLista = document.createElement('li');
  itemDaLista.textContent = textoTarefa.value;
  itemDaLista.classList.add('list-group-item');
  listaOrdenada.appendChild(itemDaLista);
}

function capturaItemSelecionado() {
  const itemSelecionado = document.querySelector('.selecionado');
  return itemSelecionado;
}

function adicionaTarefa() {
  if (textoTarefa.value.trim() !== '') {
    criaElementoLi();
    textoTarefa.value = '';
  } else {
    // const myModal = document.querySelector('div.modal');
    // const objModal = new bootstrap.Modal(myModal);
    // objModal.show();
    alert('Campo de texto vazio!');
  }
}

botaoCriarTarefa.addEventListener('click', adicionaTarefa);

function adicionaTarefaComEnter(event) {
  if (textoTarefa.value.trim() !== '' && event.key === 'Enter') {
    criaElementoLi();
    textoTarefa.value = '';
  }
}

textoTarefa.addEventListener('keyup', adicionaTarefaComEnter);

function destacaItemSelecionado(event) {
  const itemSelecionado = capturaItemSelecionado();
  const elementoClicado = event.target;
  if (elementoClicado.id !== 'lista-tarefas') {
    if (itemSelecionado !== null) {
      itemSelecionado.classList.remove('selecionado');
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
  const listaDeTarefasParaSalvar = document.querySelector('#lista-tarefas').innerHTML;
  localStorage.setItem('tarefas', listaDeTarefasParaSalvar);
}

botaoSalvarTarefas.addEventListener('click', salvarTarefas);

function aparecerListaSalva() {
  const capturaTarefasSalvasNoLocalStorage = localStorage.getItem('tarefas');
  listaOrdenada.innerHTML = capturaTarefasSalvasNoLocalStorage;
}

aparecerListaSalva();

// https://www.ti-enxame.com/pt/javascript/mover-um-elemento-um-lugar-para-cima-ou-para-baixo-na-arvore-do-dom-com-javascript/822635469/
// https://developer.mozilla.org/en-US/docs/Web/API/Node

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
