
let ingredientId = 0;
const ingredientColors = ['#ff0000', '#00ff00', '#0000ff'];
const textures = ['korrelig', 'glad', 'slijmerig'];
const speeds = [1, 2, 3];

export class Ingredient {
  constructor({ color, texture, speed, mixtime }) {
    this.id = `ingredient-${ingredientId++}`;
    this.color = color;
    this.texture = texture;
    this.speed = speed;
    this.mixtime = mixtime;
    this.element = this.createElement();
  }

  createElement() {
    const div = document.createElement('div');
    div.className = `ingredient ${this.texture}`;
    div.draggable = true;
    div.id = this.id;
    div.dataset.speed = this.speed;
    div.dataset.mixtime = this.mixtime;
    div.style.backgroundColor = this.color;
    div.innerText = `Speed ${this.speed}\nMixtime ${this.mixtime}`;

    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', this.id);
    });

    return div;
  }

  appendTo(containerId) {
    document.getElementById(containerId).appendChild(this.element);
  }
}

export function createIngredientFromForm() {
  const color = document.getElementById('kleur').value;
  const texture = document.getElementById('texture').value;
  const speed = document.getElementById('mengsnelheid').value;
  const mixtime = document.getElementById('mengtijd').value;

  const ingredient = new Ingredient({ color, texture, speed, mixtime });
  ingredient.appendTo('ingredients');
}

export function initTestIngredients() {
  for (let i = 0; i < 3; i++) {
    const color = ingredientColors[i];
    const texture = textures[Math.floor(Math.random() * textures.length)];
    const speed = speeds[Math.floor(Math.random() * speeds.length)];
    const mixtime = Math.floor(Math.random() * 3000) + 1000;

    const testIng = new Ingredient({ color, texture, speed, mixtime });
    testIng.appendTo('ingredients');
  }
}
