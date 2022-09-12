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
const turnPlace = []
let scores = { scoreX: 0, ties: 0, scoreO: 0 }
let oTurn
startGame()
function startGame() {
  oTurn = false
  drawScores()
  swapTurnMsg()
  spaces.forEach((space) => {
    space.addEventListener('click', handleClick, { once: true })
  })
  spaces.forEach((space) => {
    space.classList.remove('place-x', 'place-o', 'clicked')
  })
}
function drawScores() {
  document.querySelector('.scoreX .score-value').innerText = scores.scoreX
  document.querySelector('.scoreTies .score-value').innerText = scores.ties
  document.querySelector('.scoreO .score-value').innerText = scores.scoreO
}
function handleClick(e) {
  const space = e.target
  const currentTurn = oTurn ? TURN_O : TURN_X
  placeMark(space, currentTurn)
  checkDraw()
  if (checkWin(currentTurn) && currentTurn == 'place-o') {
    anounceWin(currentTurn)
  } else if (checkWin(currentTurn) && currentTurn == 'place-x') {
    anounceWin(currentTurn)
  } else if (checkDraw()) {
    anounceDraw(checkDraw())
  }
  swapTurns()
}
function placeMark(space, currentTurn) {
  space.classList.add(currentTurn)
  space.classList.add('clicked')
}
function swapTurns() {
  oTurn = !oTurn
  const turnWho = document.querySelector('.container-card.game-board').classList
  oTurn ? turnWho.remove('x') : turnWho.add('x')
  swapTurnMsg()
}
function swapTurnMsg() {
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
function checkDraw() {
  return [...spaces].every((space) => {
    return space.classList.contains(TURN_O) || space.classList.contains(TURN_X)
  })
}
function anounceDraw(tie) {
  if ((tie = true)) {
    const newDiv = document.createElement('div')
    body.appendChild(newDiv).classList.add('conclusion-strip', 'draw')
    const strip = document.querySelector('.conclusion-strip')
    strip.innerHTML = `
      <div class="conclusion-strip draw">
      <div class="msg">ROUND TIED</div>
      <div class="select-next">
        <div class="btn no">QUIT</div>
        <div class="btn yes">NEXT ROUND</div>
      </div>
      </div>
    `
    body.style.backgroundColor = '#141f26'
    document.querySelector('.game-board').style.filter = 'brightness(.45)'
    spaces.forEach((space) => {
      space.removeEventListener('click', handleClick, { once: true })
    })
    const nextRound = document.querySelector('.yes')
    scores.ties++
    nextRound.addEventListener('click', () => {
      startGame()
      strip.remove()
      body.style.backgroundColor = '#1a2a33'
      document.querySelector('.game-board').style.filter = 'brightness(1)'
    })
  }
}
function anounceWin(currentTurn) {
  const newDiv = document.createElement('div')
  if (currentTurn == 'place-x') {
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
    document.querySelector('.game-board').style.filter = 'brightness(.45)'
    spaces.forEach((space) => {
      space.removeEventListener('click', handleClick, { once: true })
    })
    const nextRound = document.querySelector('.yes')
    scores.scoreX++
    nextRound.addEventListener('click', () => {
      startGame()
      strip.remove()
      body.style.backgroundColor = '#1a2a33'
      document.querySelector('.game-board').style.filter = 'brightness(1)'
    })
  } else if (currentTurn == 'place-o') {
    body.appendChild(newDiv).classList.add('conclusion-strip', 'owins')
    const strip = document.querySelector('.conclusion-strip')
    strip.innerHTML = `
      <div class="msg">
        <img src="./assets/icon-o.svg" alt="winner-o" /> TAKES THE ROUND
      </div>
      <div class="select-next">
        <div class="btn no">QUIT</div>
        <div class="btn yes">NEXT ROUND</div>
      </div>
    `
    body.style.backgroundColor = '#141f26'
    document.querySelector('.game-board').style.filter = 'brightness(.45)'
    spaces.forEach((space) => {
      space.removeEventListener('click', handleClick, { once: true })
    })
    const nextRound = document.querySelector('.yes')
    scores.scoreO++
    nextRound.addEventListener('click', () => {
      startGame()
      strip.remove()
      body.style.backgroundColor = '#1a2a33'
      document.querySelector('.game-board').style.filter = 'brightness(1)'
    })
  }
}
