const cards = [
  {
    name: "card1",
    img: "./assets/img1.jpg",
    number: 1,
  },
  {
    name: "card2",
    img: "./assets/img2.jpg",
    number: 2,
  },
  {
    name: "card3",
    img: "./assets/img3.jpg",
    number: 3,
  },
  {
    name: "card4",
    img: "./assets/img4.jpg",
    number: 4,
  },
  {
    name: "card5",
    img: "./assets/img5.jpg",
    number: 5,
  },
  {
    name: "card6",
    img: "./assets/img6.jpg",
    number: 6,
  },
  {
    name: "card7",
    img: "./assets/img7.jpg",
    number: 7,
  },
  {
    name: "card8",
    img: "./assets/img8.jpg",
    number: 8,
  },
];

//get game canvas
const player1Canvas = document.getElementById("player1-canvas");
const player2Canvas = document.getElementById("player2-canvas");

// util variables
const width = 100;
const height = 100;

// loop through cards data

//1. for

for (let i = 0; i < cards.length; i++) {
  const item = cards[i];
  // create card instance
  const card = document.createElement("img");
  card.setAttribute("src", item.img);
  card.setAttribute("alt", item.name);
  card.setAttribute("width", width);
  card.setAttribute("height", height);
  player1Canvas.appendChild(card);
}

for (let i = 0; i < cards.length; i++) {
  const item = cards[i];
  // create card instance
  const card = document.createElement("img");
  card.setAttribute("src", item.img);
  card.setAttribute("alt", item.name);
  card.setAttribute("width", width);
  card.setAttribute("height", height);

  player2Canvas.appendChild(card);
}

function init() {}

init();
