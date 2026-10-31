/**
 * ============================================================================
 * JOGO DA MEMÓRIA — KINGDOM HEARTS
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// NÍVEL 1: 5 Imagens (Geram 5 pares = 10 cartas no tabuleiro)
// ----------------------------------------------------------------------------
const symbolsLevel1 = [
  { name: 'Coroa do Sora', image: 'assets/img/crown.webp' },
  { name: 'Heartless', image: 'assets/img/heartless.webp' },
  { name: 'Kingdom Hearts', image: 'assets/img/hearts.png' },
  { name: 'Nobody', image: 'assets/img/nobody.webp' },
  { name: 'Símbolo do Roxas', image: 'assets/img/roxas.webp' },
];

// ----------------------------------------------------------------------------
// NÍVEL 2: 10 Imagens (Geram 10 pares = 20 cartas no tabuleiro)
// ----------------------------------------------------------------------------
const symbolsLevel2 = [
  { name: 'Coroa do Sora', image: 'assets/img/crown.webp' },
  { name: 'Heartless', image: 'assets/img/heartless.webp' },
  { name: 'Kingdom Hearts', image: 'assets/img/hearts.png' },
  { name: 'Nobody', image: 'assets/img/nobody.webp' },
  { name: 'Símbolo do Roxas', image: 'assets/img/roxas.webp' },
  { name: 'Chi-Blade', image: 'assets/img/chi.png' },
  { name: 'Carta de Luxord', image: 'assets/img/luxord.png' },
  { name: 'Rei Mickey', image: 'assets/img/mickey.png' },
  { name: 'Keyblade Oathkeeper', image: 'assets/img/oathkeeper.png' },
  { name: 'Keyblade Oblivion', image: 'assets/img/oblivion.png' },
];

// ============================================================================
// LÓGICA DO JOGO DA MEMÓRIA
// ============================================================================

// Elementos do DOM
const board = document.querySelector('#game-board');
const movesDisplay = document.querySelector('#moves');
const pairsDisplay = document.querySelector('#pairs');
const message = document.querySelector('#message');
const restartButton = document.querySelector('#restart');
const modalRestartBtn = document.querySelector('#modalRestartBtn');

// Identifica o nível atual (via data-level no body ou id/classe do board)
function getCurrentLevel() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramLevel = urlParams.get('level');
  if (paramLevel === '2') return 2;
  if (paramLevel === '1') return 1;

  const bodyLevel = document.body.dataset.level;
  if (bodyLevel === '2') return 2;

  const boardLevel = board?.dataset.level;
  if (boardLevel === '2') return 2;

  return 1;
}

const currentLevel = getCurrentLevel();
const activeSymbols = currentLevel === 2 ? symbolsLevel2 : symbolsLevel1;
const totalPairs = activeSymbols.length;

// Estado da partida
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

/**
 * Embaralha um array usando o algoritmo Fisher-Yates
 */
function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Cria o elemento HTML da carta com estrutura 3D (frente e verso)
 */
function createCard(symbol, index) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'memory-card';
  card.dataset.symbol = symbol.name;
  card.setAttribute('aria-label', `Carta ${index + 1}, fechada`);

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front" aria-hidden="true">
        <span>?</span>
      </div>
      <div class="card-back">
        <img src="${symbol.image}" alt="${symbol.name}" loading="lazy">
        <span class="card-fallback" style="display:none;">${symbol.name}</span>
      </div>
    </div>
  `;

  // Fallback caso a imagem não exista ou não carregue
  const img = card.querySelector('img');
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const fallback = card.querySelector('.card-fallback');
    if (fallback) fallback.style.display = 'block';
  });

  card.addEventListener('click', () => flipCard(card, symbol));
  return card;
}

/**
 * Ação de virar a carta ao clicar
 */
function flipCard(card, symbol) {
  // Impede cliques se o tabuleiro estiver bloqueado, se clicou na mesma carta ou se já combinou
  if (lockBoard || card === firstCard || card.classList.contains('is-matched')) {
    return;
  }

  // Revela a carta
  card.classList.add('is-revealed');
  card.setAttribute('aria-label', `${symbol.name}, revelada`);

  // Primeiro clique da rodada
  if (!firstCard) {
    firstCard = card;
    message.textContent = 'Agora clique na segunda carta para tentar formar o par.';
    return;
  }

  // Segundo clique da rodada
  secondCard = card;
  moves++;
  movesDisplay.textContent = moves;

  checkMatch();
}

/**
 * Verifica se as duas cartas abertas combinam
 */
function checkMatch() {
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

/**
 * Trata o acerto de um par (as cartas permanecem abertas)
 */
function handleMatch() {
  firstCard.classList.add('is-matched');
  secondCard.classList.add('is-matched');
  firstCard.disabled = true;
  secondCard.disabled = true;

  firstCard.setAttribute('aria-label', `${firstCard.dataset.symbol}, par encontrado`);
  secondCard.setAttribute('aria-label', `${secondCard.dataset.symbol}, par encontrado`);

  matchedPairs++;
  pairsDisplay.textContent = `${matchedPairs}/${totalPairs}`;

  resetTurn();

  // Verifica se o jogador venceu
  if (matchedPairs === totalPairs) {
    message.textContent = `🎉 Parabéns! Você encontrou todos os ${totalPairs} pares em ${moves} movimentos!`;
    showVictoryModal();
  } else {
    message.textContent = '✨ Par encontrado! Continue assim.';
  }
}

/**
 * Trata o erro (vira as cartas de volta após um pequeno delay)
 */
function handleMismatch() {
  lockBoard = true;
  firstCard.classList.add('is-wrong');
  secondCard.classList.add('is-wrong');
  message.textContent = 'Não combinou. Memorize as posições e tente novamente!';

  window.setTimeout(() => {
    if (firstCard && secondCard) {
      firstCard.classList.remove('is-revealed', 'is-wrong');
      secondCard.classList.remove('is-revealed', 'is-wrong');
      firstCard.setAttribute('aria-label', 'Carta fechada');
      secondCard.setAttribute('aria-label', 'Carta fechada');
    }
    resetTurn();
    message.textContent = 'Escolha duas cartas para continuar.';
  }, 850);
}

/**
 * Reinicia o estado do turno atual
 */
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

/**
 * Exibe o modal de vitória do Bootstrap com as estatísticas
 */
function showVictoryModal() {
  const finalMovesSpan = document.querySelector('#finalMoves');
  if (finalMovesSpan) {
    finalMovesSpan.textContent = moves;
  }

  const modalEl = document.querySelector('#winModal');
  if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance.show();
  }
}

/**
 * Inicializa ou reinicia o tabuleiro do jogo
 */
function startGame() {
  if (!board) return;

  board.replaceChildren();
  resetTurn();
  moves = 0;
  matchedPairs = 0;

  movesDisplay.textContent = '0';
  pairsDisplay.textContent = `0/${totalPairs}`;
  message.textContent = 'Escolha duas cartas para começar a jogar!';

  // Duplica os símbolos para formar os pares e embaralha
  const deck = shuffle([...activeSymbols, ...activeSymbols]);

  deck.forEach((symbol, index) => {
    board.appendChild(createCard(symbol, index));
  });
}

// Ouvintes de eventos
if (restartButton) {
  restartButton.addEventListener('click', startGame);
}

if (modalRestartBtn) {
  modalRestartBtn.addEventListener('click', startGame);
}

// Inicia o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', startGame);
