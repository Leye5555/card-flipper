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

const formattedCards = randomize(cards);

const placeholderSrc = "./assets/placeholder.jpg";

const gameStart = document.getElementById("start-game");

const player1 = "1";
const player2 = "2";

gameStart.addEventListener("click", function start() {
  console.log("game started");
  init();
});

//get game canvas
const player1Canvas = document.getElementById("player1-canvas");
const player2Canvas = document.getElementById("player2-canvas");

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
  card.setAttribute("width", width);
  card.setAttribute("height", height);
  card.setAttribute("data-id", item.id);
  card.setAttribute("data-player", player1);
  player1Canvas.appendChild(card);
}

for (let i = formattedCards.length - 1; i >= 0; i--) {
  const item = formattedCards[i];
  // create card instance
  const card = document.createElement("img");
  card.setAttribute("src", placeholderSrc);
  card.setAttribute("alt", item.name);
  card.setAttribute("width", width);
  card.setAttribute("height", height);
  card.setAttribute("data-id", item.id);
  card.setAttribute("data-player", player2);
  player2Canvas.appendChild(card);
}

function randomize(array) {
  let temporaryArray = array.concat(array);
  console.log({ temporaryArray });
  let finalArray = [];

  let prev = {};

  let count = 0;
  while (count < temporaryArray.length) {
    let index = Math.floor(Math.random() * temporaryArray.length);
    let randomCard = temporaryArray[index];
    if (!randomCard) {
      continue;
    }
    if (randomCard.id === prev.id) {
      // edge case
      if (index >= temporaryArray.length - 1) {
        index = index - 1;
      } else if (index < temporaryArray.length - 1) {
        index = index + 1;
      }
      randomCard = temporaryArray[index];
      if (!randomCard) {
        continue;
      }
      finalArray.push(randomCard);
      temporaryArray.splice(index, 1);
      prev = randomCard;
    } else {
      finalArray.push(randomCard);
      temporaryArray.splice(index, 1);
      prev = randomCard;
    }
  }
  console.log({ finalArray });
  return finalArray;
}

function initializePlayers(player) {
  console.log("compare started");
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
    console.log({ imgs });
    imgs.forEach(addEvent);
  } else if (player === "2") {
    const imgs = document.querySelectorAll("#player2-canvas img");
    imgs.forEach(addEvent);
  }
}

function init() {
  initializePlayers(player1);
  initializePlayers(player2);
}

function addEvent(img) {
  img.addEventListener("click", store);
}

function store(event) {
  const dataset = event.target.dataset;
  if (dataset.player === player1) {
    let player1Stats = window.localStorage.getItem("player1");
    player1Stats = JSON.parse(player1Stats);
    if (Number(player1Stats.clickCount) < 2) {
      event.target.setAttribute("src", cards[event.target.dataset.id - 1].img);
      player1Stats.clickCount = Number(player1Stats.clickCount) + 1;
      if (!player1Stats.prevId) {
        player1Stats.prevId = event.target.dataset.id;
      } else {
        const img1 = document.querySelector(
          `[data-id='${player1Stats.prevId}']`
        );
        const img2 = document.querySelector(
          `[data-id='${event.target.dataset.id}']`
        );
        if (player1Stats.prevId == event.target.dataset.id) {
          player1Stats.score = Number(player1Stats.score) + 1;
          img1.removeEventListener("click", store);
          img2.removeEventListener("click", store);
          img1.style.css.visibility = "hidden";
          img2.style.css.visibility = "hidden";
        } else {
          // setTimeout(() => {
          //   alert("incorrect choice");
          // }, 500);
          setTimeout(() => {
            img1.setAttribute("src", placeholderSrc);
            img2.setAttribute("src", placeholderSrc);
          }, 3000);
        }
      }

      window.localStorage.setItem("player1", JSON.stringify(player1Stats));
    } else if (Number(player1Stats.clickCount) >= 2) {
      alert("It is player two's turn");
      player1Stats.clickCount = 0;
      player1Stats.prevId = 0;
      return;
    }

    console.log({ player1Stats });
  } else if (dataset.player === player2) {
    let player2Stats = window.localStorage.getItem("player2");
    player2Stats = JSON.parse(player2Stats);
    console.log({ player2Stats });
  }
}
