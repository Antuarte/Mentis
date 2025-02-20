// Configurações Gerais
const STORAGE_KEYS = {
  USER: 'nomeUsuario',
  THEME: 'modoTema',
  MOODS: 'humores',
  HABITS: 'habitos',
  DIET: 'refeicoes',
  EXERCISES: 'exercicios',
  DIARY: 'diario',
  MEDS: 'medicacoes',
  TASKS: 'tarefas',
  RECIPES: 'receitas'
};

// Helpers Genéricos
const DOM = {
  get: (id) => document.getElementById(id),
  hide: (...els) => els.forEach(el => el.style.display = 'none'),
  show: (el, display = 'block') => el.style.display = display
};

const Storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)) || [],
  set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  update: (key, callback) => Storage.set(key, callback(Storage.get(key)))
};

// Sistema de Listas Genérico
const createListManager = (config) => ({
  add: () => {
    const inputs = config.inputs.map(([id, transform]) => 
      transform(DOM.get(id).value)
    );
    Storage.update(config.key, items => [...items, ...inputs]);
    config.update();
  },
  remove: (index) => {
    Storage.update(config.key, items => items.filter((_, i) => i !== index));
    config.update();
  },
  update: () => {
    DOM.get(config.listId).innerHTML = Storage.get(config.key)
      .map((item, index) => config.template(item, index))
      .join('');
  }
});

// Inicialização
const init = () => {
  // Autenticação
  const nomeUsuario = localStorage.getItem(STORAGE_KEYS.USER);
  if (nomeUsuario) {
    DOM.hide(DOM.get('tela-inicial'));
    DOM.show(DOM.get('pagina-principal'));
    DOM.get('nome-usuario').textContent = nomeUsuario;
  }

  // Tema
  document.body.classList.toggle(
    'dark-theme', 
    localStorage.getItem(STORAGE_KEYS.THEME) === 'escuro'
  );

  // Inicializar todas as listas
  Object.values(listConfigs).forEach(({manager}) => manager.update());
};

// Configurações de Listas
const listConfigs = {
  habits: {
    key: STORAGE_KEYS.HABITS,
    listId: 'lista-habitos',
    template: (habito, index) => `
      <li>
        <input type="checkbox" ${habito.concluido ? 'checked' : ''} 
          onchange="toggleItem('habits', ${index})">
        ${habito.nome}
        <button onclick="listConfigs.habits.manager.remove(${index})">🗑️</button>
      </li>
    `,
    inputs: [['novo-habito', v => ({ nome: v, concluido: false })]]
  },
  // Adicione configurações para outras listas seguindo o mesmo padrão
};

// Inicializar managers
Object.values(listConfigs).forEach(config => {
  config.manager = createListManager(config);
});

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
DOM.get('modo-tema').addEventListener('change', () => {
  localStorage.setItem(STORAGE_KEYS.THEME, DOM.get('modo-tema').value);
  document.body.classList.toggle('dark-theme', DOM.get('modo-tema').value === 'escuro');
});

// Sistema de Humor (Otimizado)
const moodSystem = {
  emojiMap: {/* ... */},
  colorMap: {/* ... */},
  
  add: () => {
    const humor = DOM.get('humor-selecionado').value;
    Storage.update(STORAGE_KEYS.MOODS, items => [...items, {
      humor,
      data: new Date().toISOString(),
      emoji: this.emojiMap[humor] || "❓",
      cor: this.colorMap[humor] || "#9E9E9E"
    }]);
    this.updateUI();
  },

  updateUI: () => {
    const humores = Storage.get(STORAGE_KEYS.MOODS).slice(-10).reverse();
    DOM.get('lista-humores').innerHTML = humores
      .map(entry => `
        <li class="humor-item" style="background-color: ${entry.cor}">
          <span>${entry.emoji} ${entry.humor}</span>
          <small>${new Date(entry.data).toLocaleDateString()}</small>
        </li>
      `).join('');
    
    // Atualizar gráfico (código similar otimizado)
  }
};

// Interface Pública
window.toggleMenu = () => document.querySelector('.aba-lateral').classList.toggle('active');
window.navegarPara = (pagina) => {
  document.querySelectorAll('.pagina').forEach(p => DOM.hide(p));
  DOM.show(DOM.get(`pagina-${pagina}`));
};
window.salvarNomeUsuario = () => {/* ... */};
window.registrarHumor = () => moodSystem.add();