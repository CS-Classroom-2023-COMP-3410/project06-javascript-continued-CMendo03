/**********************
 * Game Hub Navigation
 **********************/
const mainMenu = document.getElementById('main-menu');
const matchingGameSection = document.getElementById('matching-game-section');
const rpsGameSection = document.getElementById('rps-game-section');
const blackjackGameSection = document.getElementById('blackjack-game-section');
const ticTacToeGameSection = document.getElementById('tic-tac-toe-game-section');

const matchingGameButton = document.getElementById('matching-game-button');
const rpsGameButton = document.getElementById('rps-game-button');
const blackjackGameButton = document.getElementById('blackjack-game-button');
const ticTacToeGameButton = document.getElementById('tic-tac-toe-game-button');

const backButton = document.getElementById('back-button');
const rpsBackButton = document.getElementById('rps-back-button');
const blackjackBackButton = document.getElementById('blackjack-back-button');
const ticTacToeBackButton = document.getElementById('tictactoe-back-button');

const customizeButton = document.getElementById('customize-button');
const customizationPanel = document.getElementById('customization-panel');
const bgColorPicker = document.getElementById('bg-color-picker');
const textColorPicker = document.getElementById('text-color-picker');
const fontSelect = document.getElementById('font-select');
const applyCustomization = document.getElementById('apply-customization');




function showMainMenu() {
  mainMenu.style.display = 'flex';
  matchingGameSection.style.display = 'none';
  rpsGameSection.style.display = 'none';
  blackjackGameSection.style.display = 'none';
  ticTacToeGameSection.style.display = 'none';
  clearInterval(timerInterval); // Stop matching game timer if running
}

function showMatchingGame() {
  mainMenu.style.display = 'none';
  matchingGameSection.style.display = 'block';
  rpsGameSection.style.display = 'none';
  blackjackGameSection.style.display = 'none';
  ticTacToeGameSection.style.display = 'none';
  initializeGame();
}

function showRPSGame() {
  mainMenu.style.display = 'none';
  matchingGameSection.style.display = 'none';
  rpsGameSection.style.display = 'block';
  blackjackGameSection.style.display = 'none';
  ticTacToeGameSection.style.display = 'none';
  resetRPSGame();
}

function showBlackjackGame() {
  mainMenu.style.display = 'none';
  matchingGameSection.style.display = 'none';
  rpsGameSection.style.display = 'none';
  blackjackGameSection.style.display = 'block';
  ticTacToeGameSection.style.display = 'none';
  initializeBlackjackGame();
}

function showTicTacToeGame() {
  mainMenu.style.display = 'none';
  matchingGameSection.style.display = 'none';
  rpsGameSection.style.display = 'none';
  blackjackGameSection.style.display = 'none';
  ticTacToeGameSection.style.display = 'block';
  initializeTicTacToe();
}


customizeButton.addEventListener('click', () => {
    // Toggle the visibility of the customization panel
    if (customizationPanel.style.display === 'none' || customizationPanel.style.display === '') {
      customizationPanel.style.display = 'block';
    } else {
      customizationPanel.style.display = 'none';
    }
  });
  
  applyCustomization.addEventListener('click', () => {
    // Apply background color and text color changes
    document.body.style.backgroundColor = bgColorPicker.value;
    document.body.style.color = textColorPicker.value;
    // Change font family for the body
    document.body.style.fontFamily = fontSelect.value;
  });
  
matchingGameButton.addEventListener('click', showMatchingGame);
rpsGameButton.addEventListener('click', showRPSGame);
blackjackGameButton.addEventListener('click', showBlackjackGame);
ticTacToeGameButton.addEventListener('click', showTicTacToeGame);
backButton.addEventListener('click', showMainMenu);
rpsBackButton.addEventListener('click', showMainMenu);
blackjackBackButton.addEventListener('click', showMainMenu);
ticTacToeBackButton.addEventListener('click', () => {
  ticTacToeGameSection.style.display = 'none';
  showMainMenu();
});
/**********************
 * Memory Matching Game
 * (DO NOT CHANGE ANYTHING BELOW)
 **********************/
const gameContainer = document.getElementById('game-container');
const statsElement = document.getElementById('stats');
const restartButton = document.getElementById('restart-button');

let cards = [];
let flippedCards = [];
let matches = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;

const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍍', '🥝', '🍓'];

// Shuffle the array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize the Matching Game
function initializeGame() {
  cards = shuffle([...symbols, ...symbols]); // Create pairs
  gameContainer.innerHTML = '';
  flippedCards = [];
  matches = 0;
  moves = 0;
  timer = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.symbol = symbol;
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
  });

  updateStats();
}

// Flip a card
function flipCard(event) {
  const card = event.currentTarget;
  if (card.classList.contains('flipped') || flippedCards.length === 2) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check for a match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    matches += 1;
    card1.style.backgroundColor = 'lightgreen';
    card2.style.backgroundColor = 'lightgreen';
    flippedCards = [];

    if (matches === symbols.length) {
      clearInterval(timerInterval);
      alert(`You won! Moves: ${moves}, Time: ${timer}s`);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card1.textContent = '';
      card2.classList.remove('flipped');
      card2.textContent = '';
      flippedCards = [];
    }, 1000);
  }

  moves += 1;
  updateStats();
}

// Update stats display
function updateStats() {
  statsElement.textContent = `Moves: ${moves} | Time: ${timer}s`;
}

// Update timer
function updateTimer() {
  timer += 1;
  updateStats();
}

restartButton.addEventListener('click', initializeGame);

/**********************
 * Rock Paper Scissors Game
 **********************/
const rpsButtons = document.querySelectorAll('.rps-button');
const rpsResult = document.getElementById('rps-result');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const roundNumberEl = document.getElementById('round-number');
const rpsRestartButton = document.getElementById('rps-restart-button');

let rpsRound = 1;
let playerScore = 0;
let computerScore = 0;
const totalRounds = 3;

// Mapping for moves to emoji graphics.
const moveEmojis = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

// Reset RPS game state
function resetRPSGame() {
  rpsRound = 1;
  playerScore = 0;
  computerScore = 0;
  updateRPSDisplay();
  rpsResult.innerHTML = '';
  rpsButtons.forEach(button => button.disabled = false);
}

// Update score and round display for RPS
function updateRPSDisplay() {
  playerScoreEl.textContent = `Player: ${playerScore}`;
  computerScoreEl.textContent = `Computer: ${computerScore}`;
  roundNumberEl.textContent = `Round: ${rpsRound} / ${totalRounds}`;
}

// Play a round in RPS
function playRPS(event) {
    if (rpsRound > totalRounds) return;
  
    const playerMove = event.currentTarget.dataset.move;
    const movesArray = ['rock', 'paper', 'scissors'];
    const computerMove = movesArray[Math.floor(Math.random() * movesArray.length)];
    let outcome = '';
  
    if (playerMove === computerMove) {
      outcome = "It's a tie!";
    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      outcome = 'You win this round!';
      playerScore++;
    } else {
      outcome = 'You lose this round!';
      computerScore++;
    }
  
    // Create a graphic display of moves using emojis.
    const playerGraphic = `<div class="rps-graphic">${moveEmojis[playerMove]}</div>`;
    const computerGraphic = `<div class="rps-graphic">${moveEmojis[computerMove]}</div>`;
  
    // Display a side-by-side graphic comparison and outcome.
    rpsResult.innerHTML = `
      <div class="rps-moves">
        <div class="rps-move">
          <div>You chose:</div>
          ${playerGraphic}
        </div>
        <div class="rps-move">
          <div>Computer chose:</div>
          ${computerGraphic}
        </div>
      </div>
      <div class="rps-outcome">${outcome}</div>
    `;
  
    updateRPSDisplay();
  
    rpsButtons.forEach(button => button.disabled = true);
    setTimeout(() => {
      if (rpsRound < totalRounds) {
        rpsRound++;
        rpsResult.innerHTML = '';
        rpsButtons.forEach(button => button.disabled = false);
        updateRPSDisplay();
      } else {
        let finalMessage = '';
        if (playerScore > computerScore) {
          finalMessage = 'Congratulations! You won the game!';
        } else if (computerScore > playerScore) {
          finalMessage = 'Oh no! The computer won the game!';
        } else {
          finalMessage = "It's a tie overall!";
        }
        rpsResult.innerHTML = `<div class="rps-outcome">${finalMessage}</div>`;
        rpsButtons.forEach(button => button.disabled = true);
      }
    }, 3000);
  }
  

rpsButtons.forEach(button => {
  button.addEventListener('click', playRPS);
});

rpsRestartButton.addEventListener('click', resetRPSGame);


/**********************
 * Blackjack Game
 **********************/
// Elements for Blackjack
const playerCardsEl = document.getElementById('player-cards');
const dealerCardsEl = document.getElementById('dealer-cards');
const playerTotalEl = document.getElementById('player-total');
const dealerTotalEl = document.getElementById('dealer-total');
const blackjackResultEl = document.getElementById('blackjack-result');
const dealButton = document.getElementById('deal-button'); // New Deal button
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const blackjackRestartButton = document.getElementById('blackjack-restart-button');

let deck = [];
let playerHand = [];
let dealerHand = [];
let blackjackGameOver = false;
// Controls whether the dealer’s hole card is revealed.
let dealerHoleRevealed = false;

/* Helper function to render a playing card as HTML.
   It shows the rank and suit in the top-left and bottom-right corners and the suit in the center. */
function renderCardHTML(card) {
  return `
    <div class="corner top-left">${card.rank}${card.suit}</div>
    <div class="center">${card.suit}</div>
    <div class="corner bottom-right">${card.rank}${card.suit}</div>
  `;
}

// Render a card back (for the dealer's hidden card)
function renderCardBackHTML() {
  return `<div class="card-back"></div>`;
}

// Create a deck of 52 cards
function createDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const newDeck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      let value = parseInt(rank);
      if (rank === 'A') {
        value = 11;
      } else if (['J', 'Q', 'K'].includes(rank)) {
        value = 10;
      }
      newDeck.push({ rank, suit, value });
    });
  });
  return newDeck;
}

// Shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Deal one card from the deck into a hand
function dealCard(hand) {
  const card = deck.pop();
  hand.push(card);
}

// Calculate hand total; adjust Ace value if needed
function calculateTotal(hand) {
  let total = hand.reduce((sum, card) => sum + card.value, 0);
  let aces = hand.filter(card => card.rank === 'A').length;
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}

// Update the Blackjack display
// For the dealer's hand: show the first card face up and the second card as hidden if not revealed.
function updateBlackjackDisplay() {
  // Player's cards: all face up.
  playerCardsEl.innerHTML = playerHand
    .map(card => `<div class="playing-card">${renderCardHTML(card)}</div>`)
    .join('');
  // Dealer's cards.
  dealerCardsEl.innerHTML = dealerHand
    .map((card, index) => {
      if (index === 1 && !dealerHoleRevealed) {
        // Hide the dealer's second card.
        return `<div class="playing-card">${renderCardBackHTML()}</div>`;
      }
      return `<div class="playing-card">${renderCardHTML(card)}</div>`;
    })
    .join('');
  playerTotalEl.textContent = calculateTotal(playerHand);
  // If dealer's hole card is hidden, only count the visible card.
  if (!dealerHoleRevealed && dealerHand.length > 1) {
    dealerTotalEl.textContent = dealerHand[0].value;
  } else {
    dealerTotalEl.textContent = calculateTotal(dealerHand);
  }
}

// Initialize Blackjack Game
// In this version, the game starts with empty hands (totals at 0) and no cards dealt.
function initializeBlackjackGame() {
  deck = shuffleDeck(createDeck());
  playerHand = [];
  dealerHand = [];
  blackjackGameOver = false;
  dealerHoleRevealed = false;
  blackjackResultEl.textContent = '';
  // Enable only the Deal button; disable Hit and Stand until the initial deal.
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;
  updateBlackjackDisplay();
}

// Function to deal the initial two cards to both player and dealer.
function dealInitialCards() {
  // Deal two cards for the player.
  dealCard(playerHand);
  dealCard(playerHand);
  // Deal two cards for the dealer.
  dealCard(dealerHand);
  dealCard(dealerHand);
  updateBlackjackDisplay();
  // Now enable Hit and Stand.
  hitButton.disabled = false;
  standButton.disabled = false;
  // Disable the Deal button until the round is over.
  dealButton.disabled = true;
  // Check for immediate Blackjack in player's hand.
  if (calculateTotal(playerHand) === 21 && playerHand.length === 2) {
    dealerHoleRevealed = true;
    updateBlackjackDisplay();
    blackjackGameOver = true;
    blackjackResultEl.textContent = 'Blackjack! You win at 3:2 payout!';
    hitButton.disabled = true;
    standButton.disabled = true;
  }
}

// When the player clicks "Deal"
dealButton.addEventListener('click', dealInitialCards);

// When the player clicks "Hit"
function playerHit() {
  if (blackjackGameOver) return;
  dealCard(playerHand);
  updateBlackjackDisplay();
  if (calculateTotal(playerHand) > 21) {
    dealerHoleRevealed = true;
    updateBlackjackDisplay();
    endBlackjackGame();
  }
}
hitButton.addEventListener('click', playerHit);

// When the player clicks "Stand":
// Reveal the dealer's hole card and let the dealer draw until reaching at least 17.
function playerStand() {
  hitButton.disabled = true;
  standButton.disabled = true;
  dealerHoleRevealed = true;
  updateBlackjackDisplay();
  dealerTurn();
}
standButton.addEventListener('click', playerStand);

// Dealer's turn: draw cards until dealer's total is 17 or more.
function dealerTurn() {
  let dealerTotal = calculateTotal(dealerHand);
  if (dealerTotal < 17) {
    setTimeout(() => {
      dealCard(dealerHand);
      updateBlackjackDisplay();
      dealerTurn();
    }, 1000);
  } else {
    endBlackjackGame();
  }
}

// End the Blackjack game and determine the outcome.
function endBlackjackGame() {
  blackjackGameOver = true;
  hitButton.disabled = true;
  standButton.disabled = true;
  dealerHoleRevealed = true;
  updateBlackjackDisplay();
  const playerTotal = calculateTotal(playerHand);
  const dealerTotal = calculateTotal(dealerHand);
  let result = '';
  if (playerTotal > 21) {
    result = 'You busted! Dealer wins.';
  } else if (dealerTotal > 21) {
    result = 'Dealer busted! You win!';
  } else if (playerTotal > dealerTotal) {
    result = 'You win!';
  } else if (playerTotal < dealerTotal) {
    result = 'Dealer wins!';
  } else {
    result = "It's a push! Your bet remains.";
  }
  blackjackResultEl.textContent = result;
}

blackjackRestartButton.addEventListener('click', initializeBlackjackGame);

/**********************
 * Tic Tac Toe Game
 **********************/
const ticTacToeBoard = document.getElementById('tictactoe-board');
const ticTacToeResult = document.getElementById('tictactoe-result');
const ticTacToeRestartButton = document.getElementById('tictactoe-restart-button');

let tttBoardState = Array(9).fill(null); // 9 cells for a 3x3 board
let tttActive = true;  // Game active flag
// Human is 'X' and computer is 'O'
const humanPlayer = 'X';
const computerPlayer = 'O';

function initializeTicTacToe() {
  tttBoardState = Array(9).fill(null);
  tttActive = true;
  ticTacToeResult.textContent = '';
  renderTicTacToeBoard();
}

function renderTicTacToeBoard() {
  ticTacToeBoard.innerHTML = tttBoardState
    .map((cell, index) => `<div class="tictactoe-cell" data-index="${index}">${cell ? cell : ''}</div>`)
    .join('');
  document.querySelectorAll('.tictactoe-cell').forEach(cell => {
    cell.addEventListener('click', handleTicTacToeCellClick);
  });
}

function handleTicTacToeCellClick(e) {
  const index = e.target.dataset.index;
  if (!tttActive || tttBoardState[index]) return;
  
  // Human move
  tttBoardState[index] = humanPlayer;
  renderTicTacToeBoard();
  if (checkWinner(tttBoardState, humanPlayer)) {
    tttActive = false;
    ticTacToeResult.textContent = 'You win!';
    return;
  }
  if (isBoardFull(tttBoardState)) {
    tttActive = false;
    ticTacToeResult.textContent = "It's a draw!";
    return;
  }
  // Computer's turn using minimax
  setTimeout(computerTicTacToeMove, 300);
}

function computerTicTacToeMove() {
  if (!tttActive) return;
  const bestMoveIndex = getBestMove(tttBoardState);
  if (bestMoveIndex !== -1) {
    tttBoardState[bestMoveIndex] = computerPlayer;
    renderTicTacToeBoard();
    if (checkWinner(tttBoardState, computerPlayer)) {
      tttActive = false;
      ticTacToeResult.textContent = 'Computer wins!';
      return;
    }
    if (isBoardFull(tttBoardState)) {
      tttActive = false;
      ticTacToeResult.textContent = "It's a draw!";
      return;
    }
  }
}

// Check if the board is full (draw condition)
function isBoardFull(board) {
  return board.every(cell => cell !== null);
}

// Winning combinations
const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // columns
  [0,4,8], [2,4,6]            // diagonals
];

// Check for a winner for a given player
function checkWinner(board, player) {
  return winConditions.some(condition =>
    condition.every(index => board[index] === player)
  );
}

// Minimax algorithm implementation for Tic Tac Toe
function minimax(board, depth, isMaximizing) {
  if (checkWinner(board, computerPlayer)) {
    return { score: 10 - depth };
  }
  if (checkWinner(board, humanPlayer)) {
    return { score: depth - 10 };
  }
  if (isBoardFull(board)) {
    return { score: 0 };
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = computerPlayer;
        const result = minimax(board, depth + 1, false);
        board[i] = null;
        if (result.score > bestScore) {
          bestScore = result.score;
          bestMove = i;
        }
      }
    }
    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = humanPlayer;
        const result = minimax(board, depth + 1, true);
        board[i] = null;
        if (result.score < bestScore) {
          bestScore = result.score;
          bestMove = i;
        }
      }
    }
    return { score: bestScore, move: bestMove };
  }
}

// Get the best move for the computer using minimax
function getBestMove(board) {
  const { move } = minimax(board, 0, true);
  return typeof move === 'number' ? move : -1;
}

ticTacToeRestartButton.addEventListener('click', initializeTicTacToe);


/**********************
Flappy bird
 **********************/


function openFlappyBirdGame() {
  document.getElementById("game-hub").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  gameLoop(); // Start the game loop
}



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 320;
canvas.height = 480;

const GRAVITY = 0.6;
const FLAP = -12;
const SPAWN_RATE = 90;
const PIPE_WIDTH = 50;
const PIPE_SPACING = 150;

let birdY = canvas.height / 2;
let birdVelocity = 0;
let birdFlap = false;
let birdRadius = 12;
let gameOver = false;

let pipes = [];
let score = 0;

document.addEventListener("keydown", () => {
    document.getElementById("playFlappyBirdButton").addEventListener("click", openFlappyBirdGame);

    if (!gameOver) {
        birdVelocity = FLAP;
        birdFlap = true;
    }
});

document.addEventListener("click", () => {
    if (!gameOver) {
        birdVelocity = FLAP;
        birdFlap = true;
    }
});

function createPipe() {
    let pipeHeight = Math.floor(Math.random() * (canvas.height - PIPE_SPACING));
    pipes.push({
        x: canvas.width,
        top: pipeHeight,
        bottom: pipeHeight + PIPE_SPACING
    });
}

function drawBird() {
    ctx.fillStyle = "#ff0";
    ctx.beginPath();
    ctx.arc(50, birdY, birdRadius, 0, Math.PI * 2);
    ctx.fill();
}

function drawPipes() {
    ctx.fillStyle = "#00ff00";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, PIPE_WIDTH, canvas.height - pipe.bottom);
    });
}

function updatePipes() {
    pipes.forEach((pipe, index) => {
        pipe.x -= 2;
        if (pipe.x + PIPE_WIDTH < 0) {
            pipes.splice(index, 1);
            score++;
        }
    });
}

function checkCollisions() {
    // Collision with pipes
    pipes.forEach(pipe => {
        if (
            50 + birdRadius > pipe.x &&
            50 - birdRadius < pipe.x + PIPE_WIDTH &&
            (birdY - birdRadius < pipe.top || birdY + birdRadius > pipe.bottom)
        ) {
            gameOver = true;
        }
    });

    // Collision with the ground or top
    if (birdY + birdRadius > canvas.height || birdY - birdRadius < 0) {
        gameOver = true;
    }
}

function updateBird() {
    if (birdFlap) {
        birdVelocity = FLAP;
        birdFlap = false;
    }

    birdVelocity += GRAVITY;
    birdY += birdVelocity;
}

function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function restartGame() {
    birdY = canvas.height / 2;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
}

function gameLoop() {
    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000";
        ctx.font = "36px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
        ctx.font = "24px Arial";
        ctx.fillText("Click to Restart", canvas.width / 2 - 90, canvas.height / 2 + 40);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    drawPipes();
    drawScore();
    updateBird();
    updatePipes();
    checkCollisions();

    if (Math.random() < 1 / SPAWN_RATE) {
        createPipe();
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();



/**********************
 * Initialize Hub
 **********************/
showMainMenu();





