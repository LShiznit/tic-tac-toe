class UI {
  constructor() {
    this.render = document.querySelector('body')
  }
  renderGame() {
    var gameState = {
      playerChoice: '',
      vsWho: '',
      winner: '',
    }
    if (gameState.playerChoice == '') {
      rNewGame(this.render)
    }
    function rNewGame(render) {
      let output = `
        <div class="container-card state-start">
          <div class="header">
            <div id="logo">
              <img src="./assets/icon-x.svg" alt="logo-x-icon" />
              <img src="./assets/icon-o.svg" alt="logo-o-icon" />
            </div>
          </div>
          <div class="player-select">
            <div class="selection-message">PICK PLAYER 1'S MARK</div>
            <div class="user-marks">
              <div class="btn player-mark type-x">
                <img src="./assets/icon-x-grey.svg" alt="select-x-icon" />
              </div>
              <div class="btn player-mark type-o">
                <img src="./assets/icon-o-dark.svg" alt="select-o-icon" />
              </div>
            </div>
            <div class="selection-reminder">REMEMBER: X GOES FIRST</div>
          </div>

          <div class="btn newg cpu"></div>
          <div class="btn newg player"></div>
        </div>
        `
      // RENDER OUTPUT
      render.innerHTML = output
      // backdrop reset
      render.style.backgroundColor = '#1a2a33'
      document.querySelector('.container-card').style.filter = 'brightness(1)'
      // CHOOSE MARK
      const btnUserX = document.querySelector('.player-mark.type-x')
      const btnUserO = document.querySelector('.player-mark.type-o')
      btnUserX.addEventListener('click', function () {
        // >>style flicker
        gameState.playerChoice = 'x'
        document.querySelector('.selection-reminder').innerHTML =
          'Player 1 goes first'
      })
      btnUserO.addEventListener('click', function () {
        // >>style flicker
        gameState.playerChoice = 'o'
        document.querySelector('.selection-reminder').innerHTML =
          'Player 1 goes second'
      })
      // CHOOSE & LAUNCH GAME TYPE
      const btnCPU = document.querySelector('.btn.newg.cpu')
      const btnPlayer = document.querySelector('.btn.newg.player')
      // SELECT VS CPU
      btnCPU.addEventListener('click', function () {
        gameState.vsWho = 'CPU'

        return rCPU(render)
      })
      // SELECT VS PLAYER
      btnPlayer.addEventListener('click', function () {
        gameState.vsWho = 'Player 2'

        return rPlayer(render)
      })
    }
    function rBoard(render) {
      let output = `
        <div class="container-card game-board">
          <div class="header">
            <div id="logo">
              <img src="./assets/icon-x.svg" alt="logo-x-icon" />
              <img src="./assets/icon-o.svg" alt="logo-o-icon" />
            </div>
            <div class="display-turn">
              <img src="./assets/icon-x-grey.svg" alt="turn-x" />
              <div>'s TURN</div>
            </div>
            <div class="btn restart">
              <img src="./assets/icon-restart.svg" alt="restart-icon" />
            </div>
          </div>
          <div class="game-board-grid">
            <div class="space1 place-x">1</div>
            <div class="space2 place-o">2</div>
            <div class="space3 available">3</div>
            <div class="space4 available">4</div>
            <div class="space5 available">5</div>
            <div class="space6 available">6</div>
            <div class="space7 available">7</div>
            <div class="space8 available">8</div>
            <div class="space9 available">9</div>
          </div>
          <div class="record-scores">
            <div class="score record-you">
              <div class="current-mark">X (YOU)</div>
              <div class="score-you">0</div>
            </div>
            <div class="score record-ties">
              <div>TIES</div>
              <div class="score-ties">0</div>
            </div>
            <div class="score record-cpu">
              <div class="current-mark-toggle">O (CPU)</div>
              <div class="score-cpu">0</div>
            </div>
            <div class="score record-player2">
              <div class="current-mark-toggle">O (Player 2)</div>
              <div class="score-player2">0</div>
            </div>
          </div>
        </div>
      `
      // backdrop reset
      render.style.backgroundColor = '#1a2a33'
      document.querySelector('.container-card').style.filter = 'brightness(1)'
      // RENDER OUTPUT
      render.innerHTML = output
    }
    function rCPU(render) {
      rBoard(render)
      // >>While Loop turns until win >> turn or random CPU move >>save player positions and turn count

      // RESTART GAME
      const btnRestart = document.querySelector('.btn.restart')
      btnRestart.addEventListener('click', function () {
        let output = `
        <div class="conclusion-strip">
          <div class="player-msg">RESTART GAME??</div>
          <div class="winner-msg"><img src="./assets/icon-o.svg" alt="winner-o" > TAKES THE ROUND</div>
          <div class="select-next">
            <div class="btn no">NO, CANCEL</div>
            <div class="btn yes">YES, RESTART</div>
          </div>
        </div>
        `
        render.innerHTML += output
        // backdrop darken
        render.style.backgroundColor = '#141f26'
        document.querySelector('.container-card').style.filter =
          'brightness(.5)'
        const btnCancel = document.querySelector('.btn.no')
        const btnRestart = document.querySelector('.btn.yes')
        btnCancel.addEventListener('click', function () {
          return rBoard(render)
          // >> remember last game state
        })
        btnRestart.addEventListener('click', function () {
          return rNewGame(render)
          // >> fresh board
        })
      })
    }
    function rPlayer(render) {
      rBoard(render)
      const boardMoves = []

      const space1 = document.querySelector('.space1')
      const space2 = document.querySelector('.space2')
      const space3 = document.querySelector('.space3')
      const space4 = document.querySelector('.space4')
      const space5 = document.querySelector('.space5')
      const space6 = document.querySelector('.space6')
      const space7 = document.querySelector('.space7')
      const space8 = document.querySelector('.space8')
      const space9 = document.querySelector('.space9')

      for (let i = 0; i < 4; i++) {
        space1.addEventListener('click', function (e) {
          // e.preventDefault
          if (space1.classList.contains('available')) {
            space1.classList.remove('available')
            space1.classList.add('place-x')
            boardMoves.push('x')
            console.log(boardMoves)
            i++
            i++
            console.log(i)
            // return boardMoves
          }
        })
        space2.addEventListener('click', function (e) {
          // e.preventDefault
          if (space2.classList.contains('available')) {
            space2.classList.remove('available')
            space2.classList.add('place-x')
            boardMoves.push('x')
            console.log(boardMoves)
            i++
            console.log(i)
            // return boardMoves
          }
        })
        space3.addEventListener('click', function (e) {
          // e.preventDefault
          if (space3.classList.contains('available')) {
            space3.classList.remove('available')
            space3.classList.add('place-x')
            boardMoves.push('x')
            console.log(boardMoves)
            i++
            console.log(i)
            // return boardMoves
          }
        })
        space4.addEventListener('click', function (e) {
          // e.preventDefault
          if (space4.classList.contains('available')) {
            space4.classList.remove('available')
            space4.classList.add('place-x')
            boardMoves.push('x')
            console.log(boardMoves)
            i++
            console.log(i)
            // return boardMoves
          }
        })
        space5.addEventListener('click', function (e) {
          // e.preventDefault
          if (space5.classList.contains('available')) {
            space5.classList.remove('available')
            space5.classList.add('place-x')
            boardMoves.push('x')
            console.log(boardMoves)
            i++
            console.log(i)
            // return boardMoves
          }
        })
        space6.addEventListener('click', function (e) {
          // e.preventDefault
          if (space6.classList.contains('available')) {
            space6.classList.remove('available')
            space6.classList.add('place-x')
            boardMoves.push('x')
            console.log(boardMoves)
            i++
            console.log(i)
            // return boardMoves
          }
        })
        space7.addEventListener('click', function (e) {
          // e.preventDefault
          if (space7.classList.contains('available')) {
            space7.classList.remove('available')
            space7.classList.add('place-x')
            boardMoves.push('x')
            console.log(boardMoves)
            i++
            console.log(i)
            // return boardMoves
          }
        })
        space8.addEventListener('click', function (e) {
          // e.preventDefault
          if (space8.classList.contains('available')) {
            space8.classList.remove('available')
            space8.classList.add('place-x')
            boardMoves.push('x')
            console.log(boardMoves)
            i++
            console.log(i)
            // return boardMoves
          }
        })
        space9.addEventListener('click', function (e) {
          // e.preventDefault
          if (space9.classList.contains('available')) {
            space9.classList.remove('available')
            space9.classList.add('place-x')
            boardMoves.push('x')
            console.log(boardMoves)
            i++
            console.log(i)
            // return boardMoves
          }
        })
        console.log(i)
      }

      // >>While Loop turns until win >> user turn >>save player positions and turn count
      // for (let i = 0; i <= 9; i++) {
      //   rMove(boardMoves)
      //   console.log(boardMoves)
      // }

      // RESTART GAME
      const btnRestart = document.querySelector('.btn.restart')
      btnRestart.addEventListener('click', function () {
        let output = `
        <div class="conclusion-strip">
          <div class="player-msg">RESTART GAME??</div>
          <div class="winner-msg"><img src="./assets/icon-o.svg" alt="winner-o" > TAKES THE ROUND</div>
          <div class="select-next">
            <div class="btn no">NO, CANCEL</div>
            <div class="btn yes">YES, RESTART</div>
          </div>
        </div>
        `
        render.innerHTML += output
        // backdrop darken
        render.style.backgroundColor = '#141f26'
        document.querySelector('.container-card').style.filter =
          'brightness(.5)'
        const btnCancel = document.querySelector('.btn.no')
        const btnRestart = document.querySelector('.btn.yes')
        btnCancel.addEventListener('click', function () {
          return rBoard(render)
          // >> remember last game state
        })
        btnRestart.addEventListener('click', function () {
          return rNewGame(render)
          // >> fresh board
        })
      })
    }
  }
}
