let tarefas = [];
let filtroAtual = 'todas';

function adicionarTarefa() {
  const input = document.getElementById('entradaTarefa');
  const texto = input.value.trim();
  if (texto === '') return;

  tarefas.push({ texto: texto, concluida: false });
  input.value = '';
  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById('listaTarefas');
  lista.innerHTML = '';

  let tarefasFiltradas = tarefas;
  if (filtroAtual === 'pendentes') {
    tarefasFiltradas = tarefas.filter(t => !t.concluida);
  } else if (filtroAtual === 'concldas') {
    tarefasFiltradas = tarefas.filter(t => t.concluida);
  }

  tarefasFiltradas.forEach((tarefa, i) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = tarefa.texto;
    if (tarefa.concluida) {
      li.style.textDecoration = 'line-through';
      li.style.color = 'gray';
    }
    li.onclick = () => {
    tarefas[i].concluida = !tarefas[i].concluida;
    atualizarLista();
    };
    lista.appendChild(li);
  }
);

  atualizarBotoesFiltro();
}

function atualizarBotoesFiltro() {
  const botoes = document.querySelectorAll('.btn-group.filtros button');
  botoes.forEach(botao => botao.classList.remove('active'));
  if (filtroAtual === 'todas') botoes[0].classList.add('active');
  if (filtroAtual === 'pendentes') botoes[1].classList.add('active');
  if (filtroAtual === 'concluidas') botoes[2].classList.add('active');
}

function limparConcluidas() {
  tarefas = tarefas.filter(t => !t.concluida);
  atualizarLista();
}
atualizarLista();