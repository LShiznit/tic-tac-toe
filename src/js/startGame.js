const starting = document.querySelector('.state-start')
const playing = document.querySelector('.game-board')

const btnCPU = document.querySelector('.btn.newg.cpu')
const btnPlayer = document.querySelector('.btn.newg.player')
const currentGame = {
  gameType: '',
  playerChoice: 'x',
  gameResult: 't',
}
// starting game
starting.classList.add('active')
playing.classList.remove('active')

// defaul player 1 pick
const optionX = document.querySelector('.player-mark.type-x')
const optionO = document.querySelector('.player-mark.type-o')
optionX.style.filter = 'brightness = 1'
optionO.style.filter = 'brightness = 1'
optionX.addEventListener('mouseover', function () {
  let offStyles = `
  background-color: #1a2a33;
  `
  optionO.style.cssText = offStyles
})
optionX.addEventListener('mouseleave', function () {
  let offStyles = `
  background-color: #a8bfc9;
  `
  optionO.style.cssText = offStyles
})
optionO.addEventListener('mouseover', function () {
  if (document.querySelector('.player-mark.type-x img') != null) {
    let img = document.querySelector('.player-mark.type-x img')
    img.remove()
  }
})
optionO.addEventListener('mouseleave', function () {
  let imgX = document.querySelector('.player-mark.type-x')
  imgX.append(document.createElement('img'))
  let img = document.querySelector('.player-mark.type-x img')
  img.src = './assets/icon-x-grey.svg'
})
optionX.addEventListener('click', function () {
  currentGame.playerChoice = 'x'
  let interval = setInterval(function () {
    blinker(optionX)
  }, 120)
  setTimeout(() => {
    clearInterval(interval)
    // optionX.style.filter = 'brightness( 1 )'
  }, 500)
})
optionO.addEventListener('click', function () {
  currentGame.playerChoice = 'o'
  optionX.style.filter = 'brightness( 1 )'
  let interval = setInterval(function () {
    blinker(optionO)
  }, 120)
  setTimeout(() => {
    clearInterval(interval)
  }, 500)
})
function blinker(element) {
  element.style.opacity = 0
  element.style.filter = 'brightness = 1'
  setTimeout(function () {
    element.style.opacity = 1
    element.style.filter = 'brightness(1.3)'
  }, 30)
}
btnPlayer.addEventListener('click', function () {
  currentGame.gameType = 'player'
  cssGameSwitch()
  drawPlayer()
  startGame(currentGame)
})
btnCPU.addEventListener('click', function () {
  currentGame.gameType = 'cpu'
  cssGameSwitch()
  drawPlayer()
  startGame(currentGame)
})
function cssGameSwitch() {
  starting.classList.remove('active')
  playing.classList.add('active')
}
function getStorage() {
  if (localStorage.length > 2) {
    scores.scoreX = localStorage.scoreX
    scores.ties = localStorage.ties
    scores.scoreO = localStorage.scoreO
  } else {
    scores = { scoreX: 0, ties: 0, scoreO: 0 }
  }
}
function pushStorage() {
  localStorage.setItem('scoreX', scores.scoreX)
  localStorage.setItem('ties', scores.ties)
  localStorage.setItem('scoreO', scores.scoreO)
}
function drawScores() {
  document.querySelector('.scoreX .score-value').innerText = scores.scoreX
  document.querySelector('.scoreTies .score-value').innerText = scores.ties
  document.querySelector('.scoreO .score-value').innerText = scores.scoreO
}
function drawPlayer() {
  const userX = document.querySelector('.scoreX .current-mark')
  const userO = document.querySelector('.scoreO .current-mark')
  if (currentGame.playerChoice == 'x') {
    userX.innerText = 'X (YOU)'
    if (currentGame.gameType == 'player') {
      userO.innerText = 'O (Player 2)'
    } else if (currentGame.gameType == 'cpu') {
      userO.innerText = 'O (CPU)'
    }
  } else if (currentGame.playerChoice == 'o') {
    userO.innerText = 'O (YOU)'
    if (currentGame.gameType == 'player') {
      userX.innerText = 'O (Player 2)'
    } else if (currentGame.gameType == 'cpu') {
      userX.innerText = 'O (CPU)'
    }
  }
}
