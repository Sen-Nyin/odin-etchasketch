"use strict";

const GRID_AREA = document.querySelector(".sketch-area__grid");
const BTN_RESET_GRID = document.getElementById("resetgrid");
const BTN_SET_GRID_SIZE = document.getElementById("setgrid");
const USER_COLOR = document.querySelector(
  ".sketch-area-controls__colors-picker"
);
let gridSize = 16;
let bgColor = "red";

const initiateGrid = (gridSize) => {
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

// RESTORE GRID SIZE TO DEFAULT.
const resetGrid = () => {
  gridSize = 16;
  deleteBoxes();
  initiateGrid(gridSize);
};
initiateGrid(gridSize);

// SET BACKGROUND COLOURS

document.addEventListener("mousedown", applyColor);
document.addEventListener("mouseup", stopColor);

function applyColor() {
  const divs = document.querySelectorAll(".box");
  divs.forEach((div) => {
    div.addEventListener("mousemove", function (e) {
      this.style.backgroundColor = `${bgColor}`;
    });
  });
}

function stopColor() {
  const divs = document.querySelectorAll(".box");
  divs.forEach((div) => {
    div.replaceWith(div.cloneNode(true));
  });
}

BTN_RESET_GRID.addEventListener("click", () => resetGrid());
BTN_SET_GRID_SIZE.addEventListener("click", () => {
  gridSize = prompt(`Choose your grid size. Currently ${gridSize}`);
  deleteBoxes();
  initiateGrid(gridSize);
});

USER_COLOR.addEventListener("change", (e) => {
  bgColor = e.target.value;
  console.log(bgColor);
});
console.log(bgColor);
