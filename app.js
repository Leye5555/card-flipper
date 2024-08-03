const cards = [
  {
    name: "card1",
    img: "./assets/img1.jpg",
    id: 1,
  },
  {
    name: "card2",
    img: "./assets/img2.jpg",
    id: 2,
  },
  {
    name: "card3",
    img: "./assets/img3.jpg",
    id: 3,
  },
  {
    name: "card4",
    img: "./assets/img4.jpg",
    id: 4,
  },
  {
    name: "card5",
    img: "./assets/img5.jpg",
    id: 5,
  },
  {
    name: "card6",
    img: "./assets/img6.jpg",
    id: 6,
  },
  {
    name: "card7",
    img: "./assets/img7.jpg",
    id: 7,
  },
  {
    name: "card8",
    img: "./assets/img8.jpg",
    id: 8,
  },
];

// define an array randomize method

Array.prototype.randomize = function (arr) {
  const tempArr = [...this];
  const finalArr = [];
  while (tempArr.length > 0) {
    const randIndex = Math.floor(Math.random() * tempArr.length);
    finalArr.push(tempArr[randIndex]);
    tempArr.splice(randIndex, 1);
  }
  return finalArr;
};

const formattedCards = cards.concat(cards).randomize();

const placeholderSrc = "./assets/placeholder.jpg";

const gameStart = document.getElementById("start-game");

const gameSound = document.getElementById("game-sound");

const gameSoundControl = document.getElementById("sound-control");

gameSoundControl.addEventListener("click", soundControl);

const player1 = "1";
const player2 = "2";

gameStart.addEventListener("click", function start() {
  init();
});

//get game canvas
const player1Canvas = document.getElementById("player1-canvas");
const player2Canvas = document.getElementById("player2-canvas");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");

// util variables
const width = 100;
const height = 100;

// loop through cards data

//1. for

for (let i = 0; i < formattedCards.length; i++) {
  const item = formattedCards[i];
  // create card instance
  const card = document.createElement("img");
  card.setAttribute("src", placeholderSrc);
  card.setAttribute("alt", item.name);
  // card.setAttribute("width", width);
  // card.setAttribute("height", height);
  card.setAttribute("data-id", item.id);
  card.setAttribute("data-player", player1);
  player1Canvas.appendChild(card);
}

for (let k = formattedCards.length - 1; k >= 0; k--) {
  const item = formattedCards[k];
  // create card instance
  const card = document.createElement("img");
  card.setAttribute("src", placeholderSrc);
  card.setAttribute("alt", item.name);
  // card.setAttribute("width", width);
  // card.setAttribute("height", height);
  card.setAttribute("data-id", item.id);
  card.setAttribute("data-player", player2);
  player2Canvas.appendChild(card);
}

function initializePlayers(player) {
  window.localStorage.setItem(
    "player1",
    JSON.stringify({ score: 0, clickCount: 0 })
  );

  window.localStorage.setItem(
    "player2",
    JSON.stringify({ score: 0, clickCount: 0 })
  );

  if (player === "1") {
    const imgs = document.querySelectorAll("#player1-canvas img");
    imgs.forEach(addEvent);
    player1Score.textContent = 0;
  } else if (player === "2") {
    const imgs = document.querySelectorAll("#player2-canvas img");
    imgs.forEach(addEvent);
    player2Score.textContent = 0;
  }
}

function init() {
  initializePlayers(player1);
  initializePlayers(player2);
  soundControl();
}

function addEvent(img) {
  img.addEventListener("click", store);
}

let clickedCards = {
  first: null,
  second: null,
};

function store(event) {
  const dataset = event.target.dataset;
  if (!clickedCards.first) {
    clickedCards.first = event.target;
  } else {
    clickedCards.second = event.target;
  }
  if (dataset.player === player1) {
    let player1Stats = window.localStorage.getItem("player1");
    player1Stats = JSON.parse(player1Stats);
    let player2Stats = window.localStorage.getItem("player2");
    player2Stats = JSON.parse(player2Stats);

    if (Number(player1Stats.clickCount) < 2) {
      event.target.setAttribute("src", cards[event.target.dataset.id - 1].img);
      player1Stats.clickCount = Number(player1Stats.clickCount) + 1;
      player1Stats.currentId = event.target.dataset.id;
      if (!player1Stats.prevId) {
        player1Stats.prevId = event.target.dataset.id;
      } else {
        const img1 = clickedCards.first;
        const img2 = clickedCards.second;

        if (player1Stats.prevId == event.target.dataset.id) {
          player1Stats.score = Number(player1Stats.score) + 1;
          player1Score.textContent = player1Stats.score;
          setTimeout(() => {
            alert("Correct Choice");
          }, 500);

          setTimeout(() => {
            img1.removeEventListener("click", store);
            img1.style.visibility = "hidden";
            img1.style.opacity = 0;

            img2.removeEventListener("click", store);
            img2.style.visibility = "hidden";
            img2.style.opacity = 0;
            clickedCards = {};
            player1Canvas.classList.add("remove-canvas");
            player2Canvas.classList.remove("remove-canvas");
          }, 1000);
        } else {
          setTimeout(() => {
            alert("Incorrect Choice");
          }, 500);

          setTimeout(() => {
            img1.src = placeholderSrc;

            img2.src = placeholderSrc;
            clickedCards = {};
            player1Canvas.classList.add("remove-canvas");
            player2Canvas.classList.remove("remove-canvas");
          }, 1000);
        }
      }
      player2Stats.prevId = "";
      player2Stats.currentId = "";
      player2Stats.clickCount = 0;

      window.localStorage.setItem("player1", JSON.stringify(player1Stats));
      window.localStorage.setItem("player2", JSON.stringify(player2Stats));
    } else if (Number(player1Stats.clickCount) >= 2) {
      alert("It is player two's turn");
      clickedCards = {};

      player1Stats.clickCount = 0;
      player1Stats.prevId = 0;
      return;
    }

    if (Number(player1Stats.score) === 8) {
      setTimeout(() => {
        alert("player 2 wins!");
        confirm("Do you want to play again?") ? window.location.reload() : null;
      }, 1500);
    }
  } else if (dataset.player === player2) {
    let player2Stats = window.localStorage.getItem("player2");
    player2Stats = JSON.parse(player2Stats);
    let player1Stats = window.localStorage.getItem("player1");
    player1Stats = JSON.parse(player1Stats);
    if (Number(player2Stats.clickCount) < 2) {
      event.target.setAttribute("src", cards[event.target.dataset.id - 1].img);
      player2Stats.clickCount = Number(player2Stats.clickCount) + 1;
      player2Stats.currentId = event.target.dataset.id;
      if (!player2Stats.prevId) {
        player2Stats.prevId = event.target.dataset.id;
      } else {
        const img1 = clickedCards.first;
        const img2 = clickedCards.second;

        if (player2Stats.prevId == event.target.dataset.id) {
          player2Stats.score = Number(player2Stats.score) + 1;
          player2Score.textContent = player2Stats.score;
          setTimeout(() => {
            alert("Correct Choice");
          }, 500);

          setTimeout(() => {
            img1.removeEventListener("click", store);
            img1.style.visibility = "hidden";
            img1.style.opacity = 0;

            img2.removeEventListener("click", store);
            img2.style.visibility = "hidden";
            img2.style.opacity = 0;
            clickedCards = {};
            player2Canvas.classList.add("remove-canvas");
            player1Canvas.classList.remove("remove-canvas");
          }, 1000);
        } else {
          setTimeout(() => {
            alert("Incorrect Choice");
          }, 500);
          setTimeout(() => {
            img1.src = placeholderSrc;
            img2.src = placeholderSrc;
            clickedCards = {};
            player2Canvas.classList.add("remove-canvas");
            player1Canvas.classList.remove("remove-canvas");
          }, 1000);
        }
      }
      player1Stats.clickCount = 0;
      player1Stats.prevId = "";
      player1Stats.currentId = "";
      window.localStorage.setItem("player1", JSON.stringify(player1Stats));
      window.localStorage.setItem("player2", JSON.stringify(player2Stats));
    } else if (Number(player2Stats.clickCount) >= 2) {
      alert("It is player one's turn");
      clickedCards = {};

      player2Stats.clickCount = 0;
      player2Stats.prevId = 0;
      return;
    }

    if (Number(player2Stats.score) === 8) {
      setTimeout(() => {
        alert("player 2 wins!");
        confirm("Do you want to play again?") ? window.location.reload() : null;
      }, 1500);
    }
  }
}

function soundControl() {
  const img = Array.from(gameSoundControl.children)[0];
  if (gameSound.duration > 0 && gameSound.paused) {
    gameSound.play();
    img.src = "./assets/pause-circle-svgrepo-com.svg";
  } else {
    gameSound.pause();
    img.src = "./assets/play-circle-svgrepo-com.svg";
  }
}
