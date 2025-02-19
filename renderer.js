// filepath: /c:/Users/Aline/OneDrive/Documentos/Equilibrio_Mentis/renderer.js
const { login, register } = require('./firebase-config.js');

// Login
document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});

// Registro (adicione um botão no HTML)
document.getElementById('register-button').addEventListener('click', () => {
  const email = prompt("Digite seu e-mail:");
  const password = prompt("Digite sua senha:");
  register(email, password);
});

// CÓDIGO JS HABITOS
let habitos = JSON.parse(localStorage.getItem('habitos')) || [];

function adicionarHabito() {
  const novoHabito = document.getElementById('novo-habito').value;
  habitos.push({ nome: novoHabito, concluido: false });
  localStorage.setItem('habitos', JSON.stringify(habitos));
  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById('lista-habitos');
  lista.innerHTML = '';
  habitos.forEach((habito, index) => {
    lista.innerHTML += `
      <li>
        <input type="checkbox" ${habito.concluido ? 'checked' : ''} onchange="marcarHabito(${index})">
        ${habito.nome}
        <button onclick="removerHabito(${index})">🗑️</button>
      </li>
    `;
  });
}

function marcarHabito(index) {
  habitos[index].concluido = !habitos[index].concluido;
  localStorage.setItem('habitos', JSON.stringify(habitos));
  atualizarLista();
}

function removerHabito(index) {
  habitos.splice(index, 1);
  localStorage.setItem('habitos', JSON.stringify(habitos));
  atualizarLista();
}

// Carrega a lista ao iniciar
atualizarLista();

// CÓDIGO JS DIETA
let refeicoes = JSON.parse(localStorage.getItem('refeicoes')) || [];

function adicionarRefeicao() {
  const refeicao = document.getElementById('refeicao').value;
  const alimento = document.getElementById('alimento').value;
  const calorias = document.getElementById('calorias').value;

  refeicoes.push({ refeicao, alimento, calorias });
  localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
  atualizarListaRefeicoes();
}

function atualizarListaRefeicoes() {
  const lista = document.getElementById('lista-refeicoes');
  lista.innerHTML = '';
  refeicoes.forEach((item, index) => {
    lista.innerHTML += `
      <li>
        ${item.refeicao}: ${item.alimento} (${item.calorias} kcal)
        <button onclick="removerRefeicao(${index})">🗑️</button>
      </li>
    `;
  });
}

function removerRefeicao(index) {
  refeicoes.splice(index, 1);
  localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
  atualizarListaRefeicoes();
}

// Carrega a lista ao iniciar
atualizarListaRefeicoes();

// CÓDIGO JS TREINO
let exercicios = JSON.parse(localStorage.getItem('exercicios')) || [];

function adicionarExercicio() {
  const exercicio = document.getElementById('exercicio').value;
  const series = document.getElementById('series').value;
  const repeticoes = document.getElementById('repeticoes').value;

  exercicios.push({ exercicio, series, repeticoes });
  localStorage.setItem('exercicios', JSON.stringify(exercicios));
  atualizarListaExercicios();
}

function atualizarListaExercicios() {
  const lista = document.getElementById('lista-exercicios');
  lista.innerHTML = '';
  exercicios.forEach((item, index) => {
    lista.innerHTML += `
      <li>
        ${item.exercicio}: ${item.series} séries de ${item.repeticoes} repetições
        <button onclick="removerExercicio(${index})">🗑️</button>
      </li>
    `;
  });
}

function removerExercicio(index) {
  exercicios.splice(index, 1);
  localStorage.setItem('exercicios', JSON.stringify(exercicios));
  atualizarListaExercicios();
}

// Carrega a lista ao iniciar
atualizarListaExercicios();

// CÓDIGO JS DIÁRIO
let diario = JSON.parse(localStorage.getItem('diario')) || [];

function salvarDiario() {
  const texto = document.getElementById('entrada-diario').value;
  const data = new Date().toLocaleDateString();
  diario.push({ data, texto });
  localStorage.setItem('diario', JSON.stringify(diario));
  atualizarListaDiario();
}

function atualizarListaDiario() {
  const lista = document.getElementById('lista-diario');
  lista.innerHTML = '';
  diario.forEach((item, index) => {
    lista.innerHTML += `
      <li>
        <strong>${item.data}</strong>: ${item.texto}
        <button onclick="removerEntradaDiario(${index})">🗑️</button>
      </li>
    `;
  });
}

function removerEntradaDiario(index) {
  diario.splice(index, 1);
  localStorage.setItem('diario', JSON.stringify(diario));
  atualizarListaDiario();
}

// Carrega a lista ao iniciar
atualizarListaDiario();

// CÓDIGO JS OSCILAÇÕES DE HUMOR
let humor = JSON.parse(localStorage.getItem('humor')) || [];

function registrarHumor() {
  const humorSelecionado = document.getElementById('humor-selecionado').value;
  const data = new Date().toLocaleDateString();
  humor.push({ data, humor: humorSelecionado });
  localStorage.setItem('humor', JSON.stringify(humor));
  atualizarGraficoHumor();
}

function atualizarGraficoHumor() {
  const ctx = document.getElementById('grafico-humor').getContext('2d');
  const datas = humor.map(item => item.data);
  const humores = humor.map(item => item.humor);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: datas,
      datasets: [{
        label: 'Humor',
        data: humores,
        borderColor: '#64B6AC',
        fill: false,
      }]
    },
  });
}

// Carrega o gráfico ao iniciar
atualizarGraficoHumor();

// CÓDIGO JS MEDICAÇÕES
let medicacoes = JSON.parse(localStorage.getItem('medicacoes')) || [];

function adicionarMedicamento() {
  const medicamento = document.getElementById('medicamento').value;
  const horario = document.getElementById('horario').value;

  medicacoes.push({ medicamento, horario });
  localStorage.setItem('medicacoes', JSON.stringify(medicacoes));
  atualizarListaMedicacoes();
}

function atualizarListaMedicacoes() {
  const lista = document.getElementById('lista-medicacoes');
  lista.innerHTML = '';
  medicacoes.forEach((item, index) => {
    lista.innerHTML += `
      <li>
        ${item.medicamento} às ${item.horario}
        <button onclick="removerMedicamento(${index})">🗑️</button>
      </li>
    `;
  });
}

function removerMedicamento(index) {
  medicacoes.splice(index, 1);
  localStorage.setItem('medicacoes', JSON.stringify(medicacoes));
  atualizarListaMedicacoes();
}

// Carrega a lista ao iniciar
atualizarListaMedicacoes();

// CÓDIGO JS TAREFAS PESSOAIS
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function adicionarTarefa() {
  const novaTarefa = document.getElementById('nova-tarefa').value;
  tarefas.push({ tarefa: novaTarefa, concluida: false });
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  atualizarListaTarefas();
}

function atualizarListaTarefas() {
  const lista = document.getElementById('lista-tarefas');
  lista.innerHTML = '';
  tarefas.forEach((item, index) => {
    lista.innerHTML += `
      <li>
        <input type="checkbox" ${item.concluida ? 'checked' : ''} onchange="marcarTarefa(${index})">
        ${item.tarefa}
        <button onclick="removerTarefa(${index})">🗑️</button>
      </li>
    `;
  });
}

function marcarTarefa(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  atualizarListaTarefas();
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  atualizarListaTarefas();
}

// Carrega a lista ao iniciar
atualizarListaTarefas();

// CÓDIGO JS RECEITAS
let receitas = JSON.parse(localStorage.getItem('receitas')) || [];

function adicionarReceita() {
  const nome = document.getElementById('nome-receita').value;
  const ingredientes = document.getElementById('ingredientes').value;
  const modoPreparo = document.getElementById('modo-preparo').value;

  receitas.push({ nome, ingredientes, modoPreparo });
  localStorage.setItem('receitas', JSON.stringify(receitas));
  atualizarListaReceitas();
}

function atualizarListaReceitas() {
  const lista = document.getElementById('lista-receitas');
  lista.innerHTML = '';
  receitas.forEach((item, index) => {
    lista.innerHTML += `
      <li>
        <strong>${item.nome}</strong><br>
        <em>Ingredientes:</em> ${item.ingredientes}<br>
        <em>Modo de Preparo:</em> ${item.modoPreparo}
        <button onclick="removerReceita(${index})">🗑️</button>
      </li>
    `;
  });
}

function removerReceita(index) {
  receitas.splice(index, 1);
  localStorage.setItem('receitas', JSON.stringify(receitas));
  atualizarListaReceitas();
}

// Carrega a lista ao iniciar
atualizarListaReceitas();