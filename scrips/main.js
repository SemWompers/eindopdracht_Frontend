import {initColorTesterGrid, initMixedColorPots} from './testData.js';
import { initTestIngredients, createIngredient } from './ingredients.js';
import { createPot } from './pots.js';
import { createMachine } from './machine.js';
import { initHallSwitchButtons } from './halls.js';
import { getTriadicColors } from './colorpicker.js'

document.addEventListener('DOMContentLoaded', () => {
  initHallSwitchButtons();
  initColorTesterGrid();
  initTestIngredients();
  initMixedColorPots();

  createPot();
  createPot();

  document.getElementById("createPot").addEventListener("click", () => createPot());
  document.getElementById("createMachine").addEventListener("click", () => createMachine());
  document.getElementById("createIngredient").addEventListener("click", () => createIngredient());

  

// Attach event listeners to all cells (assuming they have class 'cell')
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const bg = window.getComputedStyle(cell).backgroundColor;
    if (!bg.startsWith('rgb')) return;

    const colors = getTriadicColors(bg);

    showTriadicColors(colors);
  });
});
});

function showTriadicColors(colors) {
  const container = document.getElementById('triadic-display');
  container.innerHTML = ''; 

  colors.forEach(color => {
    const div = document.createElement('div');
    div.className = 'triadic-color';
    div.style.backgroundColor = color;
    div.title = color;
    container.appendChild(div);
  });
}

