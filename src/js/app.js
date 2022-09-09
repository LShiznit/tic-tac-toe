const body = document.querySelector('body')
const spaces = document.querySelectorAll('.space')
const TURN_X = 'place-x'
const TURN_O = 'place-o'
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
const board = document.getElementById('board')
const winningMessageElement = document.querySelector('.conclusion-strip')

let oTurn

startGame()

function startGame() {
  oTurn = false
  spaces.forEach((space) => {
    space.addEventListener('click', handleClick, { once: true })
  })
  // setBoardHoverClass()
}

function handleClick(e) {
  const space = e.target
  const currentTurn = oTurn ? TURN_O : TURN_X
  placeMark(space, currentTurn)

  // Check for Win
  if (checkWin(currentTurn)) {
    anounceWin()
    // Check for Draw
    // endGame(false)
  }
  // Switch Turns
  swapTurns()
}

function placeMark(space, currentTurn) {
  space.classList.add(currentTurn)
  space.classList.add('clicked')
}

function swapTurns() {
  oTurn = !oTurn
  // switches mark for placement
  const turnWho = document.querySelector('.container-card.game-board').classList
  oTurn ? turnWho.remove('x') : turnWho.add('x')

  // switches turn prompt on game board
  const turnMsg = document.querySelector('.display-turn').classList
  oTurn ? turnMsg.remove('x') : turnMsg.add('x')
}

function checkWin(currentTurn) {
  return WINNING_COMBOS.some((combination) => {
    return combination.every((index) => {
      return spaces[index].classList.contains(currentTurn)
    })
  })
}

function anounceWin() {
  const newDiv = document.createElement('div')
  body.appendChild(newDiv).classList.add('conclusion-strip', 'xwins')

  const strip = document.querySelector('.conclusion-strip')
  strip.innerHTML = `
  <div class="msg">
    <img src="./assets/icon-x.svg" alt="winner-x" /> TAKES THE ROUND
  </div>
  <div class="select-next">
    <div class="btn no">QUIT</div>
    <div class="btn yes">NEXT ROUND</div>
  </div>
  `
  body.style.backgroundColor = '#141f26'
  document.querySelector('.container-card').style.filter = 'brightness(.5)'
}
