// Função para salvar o nome do usuário e entrar na página principal
function salvarNomeUsuario() {
  const nomeUsuario = document.getElementById('input-nome-usuario').value;
  if (nomeUsuario) {
      localStorage.setItem('nomeUsuario', nomeUsuario);
      document.getElementById('nome-usuario').innerText = nomeUsuario;
      document.getElementById('tela-inicial').style.display = 'none';
      document.getElementById('pagina-principal').style.display = 'block';
  }
}

// Carregar o nome do usuário ao iniciar
document.addEventListener('DOMContentLoaded', () => {
  const nomeUsuario = localStorage.getItem('nomeUsuario');
  if (nomeUsuario) {
      document.getElementById('nome-usuario').innerText = nomeUsuario;
      document.getElementById('tela-inicial').style.display = 'none';
      document.getElementById('pagina-principal').style.display = 'block';
  }
});

// Botão de menu ☰
function toggleMenu() {
  document.querySelector('.aba-lateral').classList.toggle('active');
}

function navegarPara(pagina) {
  // Esconde todas as páginas
  document.querySelectorAll('.pagina').forEach(p => {
    p.style.display = 'none';
  });
  
  // Mostra a página solicitada
  document.getElementById(`pagina-${pagina}`).style.display = 'block';
  
  // Atualiza o menu
  toggleMenu();
}

// Funções para mostrar as seções de Configurações, Perfil e Sobre Nós
function mostrarConfiguracoes() {
  navegarPara('configuracoes');
}

function mostrarPerfil() {
  navegarPara('perfil');
}

function mostrarSobreNos() {
  navegarPara('sobre');
}

function esconderTodasSecoes() {
    document.querySelectorAll('.secao').forEach(secao => {
        secao.style.display = 'none';
    });
}

// Função para salvar as configurações
function salvarConfiguracoes() {
  const apelidoApp = document.getElementById('apelido-app').value;
  const modoTema = document.getElementById('modo-tema').value;

  // Salva no localStorage
  localStorage.setItem('apelidoApp', apelidoApp);
  localStorage.setItem('modoTema', modoTema);

  // Alterna a classe do body para o modo escuro/claro
  document.body.classList.toggle('dark-theme', modoTema === 'escuro');

  alert('Configurações salvas!');
}

// Ao carregar a página, aplicar o tema salvo
document.addEventListener('DOMContentLoaded', () => {
  const modoTemaSalvo = localStorage.getItem('modoTema');
  if (modoTemaSalvo) {
      document.body.classList.toggle('dark-theme', modoTemaSalvo === 'escuro');
  }
});

// Função para salvar o perfil
function salvarPerfil() {
    const nomeCompleto = document.getElementById('nome-completo').value;
    const apelido = document.getElementById('apelido').value;
    const nomeUsuario = document.getElementById('nome-usuario-perfil').value;
    const idade = document.getElementById('idade').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    localStorage.setItem('nomeCompleto', nomeCompleto);
    localStorage.setItem('apelido', apelido);
    localStorage.setItem('nomeUsuario', nomeUsuario);
    localStorage.setItem('idade', idade);
    localStorage.setItem('peso', peso);
    localStorage.setItem('altura', altura);
    alert('Perfil salvo!');
}

// Funções para adicionar e atualizar listas (exemplo para hábitos)
function adicionarHabito() {
    const novoHabito = document.getElementById('novo-habito').value;
    let habitos = JSON.parse(localStorage.getItem('habitos')) || [];
    habitos.push({ nome: novoHabito, concluido: false });
    localStorage.setItem('habitos', JSON.stringify(habitos));
    atualizarListaHabitos();
}

function atualizarListaHabitos() {
    const lista = document.getElementById('lista-habitos');
    lista.innerHTML = '';
    let habitos = JSON.parse(localStorage.getItem('habitos')) || [];
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
    let habitos = JSON.parse(localStorage.getItem('habitos')) || [];
    habitos[index].concluido = !habitos[index].concluido;
    localStorage.setItem('habitos', JSON.stringify(habitos));
    atualizarListaHabitos();
}

function removerHabito(index) {
    let habitos = JSON.parse(localStorage.getItem('habitos')) || [];
    habitos.splice(index, 1);
    localStorage.setItem('habitos', JSON.stringify(habitos));
    atualizarListaHabitos();
}

// Carregar listas ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    atualizarListaHabitos();
    // Adicione chamadas para atualizar outras listas aqui
});

// Mapeamento de humores para emojis e cores
const emojiMap = {
  "Alegria": "😀", "Felicidade": "😊", "Euforia": "🤩", "Exultação": "🥳",
  "Otimismo": "🙂", "Entusiasmo": "😆", "Satisfação": "😌", "Gratidão": "🙏",
  "Amor": "❤️", "Carinho": "🤗", "Admiração": "😍", "Confiança": "😎",
  "Esperança": "🤞", "Serenidade": "🕊️", "Calma": "😇", "Tranquilidade": "🧘",
  "Tristeza": "😢", "Melancolia": "😔", "Depressão": "😞", "Angústia": "😫",
  "Desespero": "😱", "Frustração": "😤", "Raiva": "😡", "Cólera": "🤬",
  "Irritabilidade": "😒", "Indignação": "😠", "Aversão": "🤢", "Desânimo": "😩",
  "Solidão": "😪", "Culpa": "😓", "Vergonha": "😳", "Humilhação": "😭",
  "Ressentimento": "😑", "Ciúmes": "😒", "Inveja": "🤨", "Arrependimento": "😞",
  "Surpresa": "😲", "Espanto": "😮", "Assombro": "😯", "Curiosidade": "🤔",
  "Alerta": "⚠️", "Ansiedade": "😰", "Nervosismo": "😬", "Medo": "😨",
  "Pânico": "😵", "Insegurança": "😕", "Preocupação": "😟", "Desconfiança": "😑",
  "Deprimido": "😩", "Melancólico": "😔", "Angustiado": "😣", "Desconsolado": "😭",
  "Excitado": "😆", "Eufórico": "🤩", "Maníaco": "🤪", "Culpado": "😞",
  "Frustrado": "😤", "Nostálgico": "🥺", "Contente": "🙂", "Energizado": "⚡",
  "Motivado": "💪", "Inspirado": "🌟", "Aliviado": "😌", "Orgulhoso": "😎",
  "Reconfortado": "🤗", "Desolado": "😩", "Atordoado": "😵", "Estressado": "😫",
  "Apático": "😐", "Tediado": "😑", "Sarcástico": "😏", "Irônico": "😉",
  "Bem-humorado": "😄", "Divertido": "😂", "Brincalhão": "😜"
};

const moodColorMap = {
  "Alegria": "#FFF700", "Felicidade": "#FFD700", "Euforia": "#FF4500", "Exultação": "#FFB300",
  "Otimismo": "#87CEEB", "Entusiasmo": "#FF8C00", "Satisfação": "#98FB98", "Gratidão": "#FFB6C1",
  "Amor": "#8B0000", "Carinho": "#FFDAB9", "Admiração": "#9370DB", "Confiança": "#000080",
  "Esperança": "#66CDAA", "Serenidade": "#B0E0E6", "Calma": "#40E0D0", "Tranquilidade": "#C0C0C0",
  "Tristeza": "#708090", "Melancolia": "#778899", "Depressão": "#2F4F4F", "Angústia": "#800080",
  "Desespero": "#660000", "Frustração": "#FF6347", "Raiva": "#FF0000", "Cólera": "#FF2400",
  "Irritabilidade": "#FF8C69", "Indignação": "#9932CC", "Aversão": "#556B2F", "Desânimo": "#A9A9A9",
  "Solidão": "#B0C4DE", "Culpa": "#8B4513", "Vergonha": "#FF91A4", "Humilhação": "#4B0082",
  "Ressentimento": "#006400", "Ciúmes": "#228B22", "Inveja": "#9ACD32", "Arrependimento": "#4682B4",
  "Surpresa": "#FF00FF", "Espanto": "#00BFFF", "Assombro": "#D3D3D3", "Curiosidade": "#FFA07A",
  "Alerta": "#FFFF00", "Ansiedade": "#D8BFD8", "Nervosismo": "#FF69B4", "Medo": "#ADD8E6",
  "Pânico": "#B22222", "Insegurança": "#696969", "Preocupação": "#CD853F", "Desconfiança": "#6B8E23",
  "Deprimido": "#191970", "Melancólico": "#5F9EA0", "Angustiado": "#9400D3", "Desconsolado": "#808080",
  "Excitado": "#FF7F50", "Eufórico": "#F4C430", "Maníaco": "#8A2BE2", "Culpado": "#8B4513",
  "Frustrado": "#CD5C5C", "Nostálgico": "#BA55D3", "Contente": "#FAFAD2", "Energizado": "#ADFF2F",
  "Motivado": "#1E90FF", "Inspirado": "#DA70D6", "Aliviado": "#90EE90", "Orgulhoso": "#DAA520",
  "Reconfortado": "#FFC0CB", "Desolado": "#36454F", "Atordoado": "#6E7B8B", "Estressado": "#FF7256",
  "Apático": "#F5F5DC", "Tediado": "#BEBEBE", "Sarcástico": "#E6E6FA", "Irônico": "#AFEEEE",
  "Bem-humorado": "#7FFFD4", "Divertido": "#FFFFE0", "Brincalhão": "#FFB347"
};

// Variáveis globais para o gráfico e calendário
let humorChart = null;
let calendar = null;

// CÓDIGO JS OSCILAÇÕES DE HUMOR
let humores = JSON.parse(localStorage.getItem('humores')) || [];

function registrarHumor() {
  const humorSelecionado = document.getElementById('humor-selecionado').value;
  const data = new Date();
  
  humores.push({
      humor: humorSelecionado,
      data: data.toISOString(),
      emoji: emojiMap[humorSelecionado] || "❓",
      cor: getHumorColor(humorSelecionado)
  });
  
  localStorage.setItem('humores', JSON.stringify(humores));
  atualizarDashboardHumor();
  atualizarGraficoHumor();
  calendar.refetchEvents();
}

function getHumorColor(humor) {
  return moodColorMap[humor] || "#9E9E9E";
}

function atualizarDashboardHumor() {
  const listaHumores = document.getElementById('lista-humores');
  listaHumores.innerHTML = '';

  humores.slice(-10).reverse().forEach(entry => { // Mostrar últimos 10 registros
      const li = document.createElement('li');
      li.className = 'humor-item';
      li.style.backgroundColor = entry.cor;
      li.innerHTML = `
          <span>${entry.emoji} ${entry.humor}</span>
          <small>${new Date(entry.data).toLocaleDateString()}</small>
      `;
      listaHumores.appendChild(li);
  });
}

function atualizarGraficoHumor() {
  const moodCounts = humores.reduce((acc, entry) => {
    acc[entry.humor] = (acc[entry.humor] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(moodCounts);
  const data = Object.values(moodCounts);
  const colors = labels.map(mood => moodColorMap[mood] || "#808080");

  const ctx = document.getElementById('grafico-humor').getContext('2d');
  if (humorChart) humorChart.destroy();

  humorChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Frequência de Humores',
        data: data,
        backgroundColor: colors,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Inicializa o calendário
document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendario-humor');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    events: humores.map(entry => ({
      title: `${entry.emoji} ${entry.humor}`,
      start: entry.data,
      color: entry.cor
    })),
    eventContent: function(info) {
      return {
        html: `<div style="font-size:1.2em">${info.event.title}</div>`
      };
    }
  });
  calendar.render();
});

// Carrega dados iniciais
atualizarDashboardHumor();
atualizarGraficoHumor();

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