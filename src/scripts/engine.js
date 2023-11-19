const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    timerId: null,
    // timerId: setInterval(randomSquare, 1000);,
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    playSound("vgdeathsound.wav",1);
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    // alert("Game Over! o seu resultado foi: " + state.values.result);
  }
}

// function playSound() {
//   let audio = new Audio("./src/audios/hit.mp3");
//   audio.volume = 0.1;
//   audio.play();
// }

function playSound(audioName,volume) {
  let audio = new Audio(`./src/audios/${audioName}`);
  audio.volume = volume;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}
//posso comentar e colocar o set interval dentro do state.values
function moveEnemy() {
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  playSound("Theme Song 8-bit V1 _looping.wav",0.07);
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit.wav",0.5);
      }
    });
  });
}

// init, main ou initialize...
function initialize() {
  moveEnemy();
  addListenerHitBox();
}
initialize();
