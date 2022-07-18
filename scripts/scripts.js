"use strict";

const GRID_AREA = document.querySelector(".sketch-area__grid");
const BTN_RESET_GRID = document.getElementById("resetgrid");
const BTN_SET_GRID_SIZE = document.getElementById("setgrid");
const BTN_CLEAR_CANVAS = document.getElementById("clear");
const USER_COLOR = document.querySelector(
  ".sketch-area-controls__colors-picker"
);
const RANDOMISE_COLOR = document.getElementById("randomise");
let gridSize = 16;
let bgColor = "red";
let randomise = "no";

// DEFAULT GRID

const initiateGrid = (gridSize) => {
  if (!gridSize) {
    gridSize = 16;
  }
  for (let i = 1; i <= gridSize ** 2; i++) {
    GRID_AREA.setAttribute(
      "style",
      `grid-template-columns: repeat(${gridSize}, 1fr); grid-template-rows: repeat(${gridSize}, 1fr);`
    );
    const div = document.createElement("div");
    div.classList.add("box");
    GRID_AREA.appendChild(div);
  }
};

// RESTORE GRID SIZE TO DEFAULT.

const resetGrid = () => {
  gridSize = 16;
  deleteBoxes();
  initiateGrid(gridSize);
};

// REMOVE BOXES

const deleteBoxes = (gridSize) => {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((div) => {
    GRID_AREA.removeChild(div);
  });
};

// RESET BACKGROUND COLOURS

const resetBackgrounds = () => {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((div) => {
    div.removeAttribute("style");
  });
};

// SET BACKGROUND COLOURS

document.addEventListener("mousedown", applyColor);
document.addEventListener("mouseup", stopColor);

function applyColor() {
  const divs = document.querySelectorAll(".box");
  divs.forEach((div) => {
    div.addEventListener("mousemove", function (e) {
      if (randomise === "no") {
        this.style.backgroundColor = `${bgColor}`;
      } else {
        this.style.backgroundColor = `${randomColors()}`;
      }
    });
  });
}

function stopColor() {
  const divs = document.querySelectorAll(".box");
  divs.forEach((div) => {
    div.replaceWith(div.cloneNode(true));
  });
}

// RANDOM COLOUR GENERATOR

const randomColors = () => {
  let col = "#";
  for (let i = 0; i < 6; i++) {
    const random = Math.random();
    const bit = (random * 16) | 0;
    col += bit.toString(16);
  }
  return col;
};

// EVENT LISTENERS

BTN_RESET_GRID.addEventListener("click", () => resetGrid());

BTN_SET_GRID_SIZE.addEventListener("click", () => {
  gridSize = prompt(`Choose your grid size. Currently ${gridSize}`);
  while (gridSize > 100) {
    gridSize = prompt(
      `Please choose a size less than 100. Currently: ${gridSize}`
    );
  }
  deleteBoxes();
  initiateGrid(gridSize);
});

BTN_CLEAR_CANVAS.addEventListener("click", () => resetBackgrounds());

USER_COLOR.addEventListener("change", (e) => (bgColor = e.target.value));

RANDOMISE_COLOR.addEventListener(
  "click",
  () => (randomise = `${randomise === "yes" ? "no" : "yes"}`)
);

initiateGrid(gridSize);
