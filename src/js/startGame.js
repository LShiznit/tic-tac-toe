const starting = document.querySelector('.state-start')
const playing = document.querySelector('.game-board')

const btnCPU = document.querySelector('.btn.newg.cpu')
const btnPlayer = document.querySelector('.btn.newg.player')

var player_choice = 'x'
var game_type

// starting game
starting.classList.add('active')
playing.classList.remove('active')

// defaul player 1 pick
const optionX = document.querySelector('.player-mark.type-x')
const optionO = document.querySelector('.player-mark.type-o')
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
  player_choice = 'x'
  let interval = setInterval(function () {
    blinker(optionX)
  }, 120)
  setTimeout(() => {
    clearInterval(interval)
    // optionX.style.filter = 'brightness( 1 )'
  }, 500)
})
optionO.addEventListener('click', function () {
  player_choice = 'o'
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
btnCPU.addEventListener('click', function () {
  game_type = 'cpu'
  cssGameSwitch()
})
btnPlayer.addEventListener('click', function () {
  game_type = 'player'
  cssGameSwitch()
})
function cssGameSwitch() {
  starting.classList.remove('active')
  playing.classList.add('active')
}
