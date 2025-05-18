// js/ingredients.js
let ingredientId = 0;
const ingredientColors = ['#ff0000', '#00ff00', '#0000ff'];
const textures = ['korrelig', 'glad', 'slijmerig'];
const speeds = [1, 2, 3];

export function createIngredient() {
  const div = document.createElement('div');
  const texture = document.getElementById('texture').value;
  const speed = document.getElementById('mengsnelheid').value;
  const mixtime = document.getElementById('mengtijd').value;

  div.className = 'ingredient ' + texture;
  div.draggable = true;
  div.id = 'ingredient-' + ingredientId++;
  div.dataset.speed = speed;
  div.dataset.mixtime = mixtime;
  div.style.backgroundColor = document.getElementById('kleur').value;
  div.innerText = `Speed ${speed}\nMixtime ${mixtime}`;

  div.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });

  document.getElementById('ingredients').appendChild(div);
}

export function initTestIngredients() {
  const container = document.getElementById('ingredients');

  for (let i = 0; i < 3; i++) {
    const div = document.createElement('div');
    const texture = textures[Math.floor(Math.random() * textures.length)];
    const speed = speeds[Math.floor(Math.random() * speeds.length)];
    const mixtime = Math.floor(Math.random() * 3000) + 1000;

    div.className = 'ingredient ' + texture;
    div.draggable = true;
    div.id = 'ingredient-' + ingredientId++;
    div.dataset.speed = speed;
    div.dataset.mixtime = mixtime;
    div.style.backgroundColor = ingredientColors[i];
    div.innerText = `Speed ${speed}\nMixtime ${mixtime}`;

    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
    });

    container.appendChild(div);
  }
};