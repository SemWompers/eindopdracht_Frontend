let ingredientId = 0;
    const textures = ['korrelig', 'glad', 'slijmerig'];
    // const speeds = [1, 2, 3];

    function getRandomColor() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r}, ${g}, ${b})`;
    }

    function createIngredient() {
      const div = document.createElement('div');
      const textureSelect = document.getElementById('texture');
      const texture = textureSelect.options[textureSelect.selectedIndex].value;
      div.className = 'ingredient ' + texture;
      div.draggable = true;
      div.id = 'ingredient-' + ingredientId++;
      
      const speedSelect = document.getElementById('mengsnelheid');
      const speed = speedSelect.options[speedSelect.selectedIndex].value;
      div.dataset.speed = speed;
      const mixtime = document.getElementById('mengtijd').value;
      div.dataset.mixtime = mixtime;
      div.style.backgroundColor = document.getElementById('kleur').value;
      div.innerText = `Speed ${speed}`;
      div.innerText += `\nMixtime ${mixtime}`;

      div.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
      });

      document.getElementById('ingredients').appendChild(div);
    }

    function createPot() {
      const pot = document.createElement('div');
      pot.draggable = true;
      pot.className = 'pot';
      pot.dataset.ingredients = JSON.stringify([]);

      pot.addEventListener('dragover', (e) => {
        e.preventDefault();
        pot.classList.add('over');
      });

      pot.addEventListener('dragleave', () => {
        pot.classList.remove('over');
      });

      pot.addEventListener('drop', (e) => {
        e.preventDefault();
        pot.classList.remove('over');
        const id = e.dataTransfer.getData('text/plain');
        const ingredient = document.getElementById(id);
        const current = JSON.parse(pot.dataset.ingredients);
        const newSpeed = parseInt(ingredient.dataset.speed);

        if (current.length >= 3) {
          alert("Pot is vol!");
          return;
        }

        if (current.length > 0 && current.some(i => i.speed !== newSpeed)) {
          alert("Alle ingrediënten moeten dezelfde snelheid hebben!");
          return;
        }

        pot.appendChild(ingredient);
        current.push({ id, speed: newSpeed });
        pot.dataset.ingredients = JSON.stringify(current);
      });

      document.getElementById('pots').appendChild(pot);
    }

    function createMachine() {
      const machine = document.createElement('div');
      machine.className = 'machine';
      machine.textContent = 'Sleep hier een pot in om te mengen...';
    
      machine.addEventListener('dragover', (e) => {
        e.preventDefault();
        machine.classList.add('over');
      });
    
      machine.addEventListener('dragleave', () => {
        machine.classList.remove('over');
      });
    
      machine.addEventListener('drop', (e) => {
  e.preventDefault();
  machine.classList.remove('over');

  const pot = document.querySelector('.pot[draggable="true"]:hover');
  if (!pot) {
    alert('Geen pot gevonden!');
    return;
  }

  const ingredients = JSON.parse(pot.dataset.ingredients);
  if (ingredients.length === 0) {
    alert("Pot is leeg!");
    return;
  }

  // Pak de mengsnelheid (alle ingrediënten moeten dezelfde hebben)
  const speed = ingredients[0].speed; // gegarandeerd dezelfde voor alle

  // Voeg de juiste schud-klasse toe
  machine.classList.add(`shake-speed-${speed}`);

  let totalR = 0, totalG = 0, totalB = 0;
  let totalTime = 0;

  for (const ing of pot.children) {
    const color = window.getComputedStyle(ing).backgroundColor;
    const [r, g, b] = color.match(/\d+/g).map(Number);
    totalR += r;
    totalG += g;
    totalB += b;
    totalTime += parseInt(ing.dataset.mixtime) || 1000;
  }

  const mixResult = document.createElement('div');
  mixResult.textContent = 'Mengen...';
  mixResult.style.padding = '10px';
  mixResult.style.border = '1px solid #333';
  machine.appendChild(mixResult);

  setTimeout(() => {
  const finalColor = `rgb(${Math.floor(totalR / ingredients.length)}, ${Math.floor(totalG / ingredients.length)}, ${Math.floor(totalB / ingredients.length)})`;
  mixResult.style.backgroundColor = finalColor;
  mixResult.textContent = `Gemengd! (${ingredients.length} ingrediënten)`;

  // Stop animatie
  machine.classList.remove(`shake-speed-${speed}`);

  // Maak de mixResult div sleepbaar
  mixResult.draggable = true;
  mixResult.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', finalColor);
  });
}, totalTime);


});

    
      document.getElementById(`hall-${activeHall}`).appendChild(machine);
    }
     

let activeHall = 1;

function switchHall(nr) {
  document.getElementById('hall-1').classList.remove('active');
  document.getElementById('hall-2').classList.remove('active');
  document.getElementById(`hall-${nr}`).classList.add('active');
  activeHall = nr;
}

    

    // Grid genereren bij pagina laden
document.addEventListener('DOMContentLoaded', () => {
  const tester = document.getElementById('color-tester');
  for (let i = 0; i < 24; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;

    // Laat toe dat kleuren hierheen gesleept worden
    cell.addEventListener('dragover', (e) => {
      e.preventDefault();
      cell.classList.add('over');
    });

    cell.addEventListener('dragleave', () => {
      cell.classList.remove('over');
    });

    cell.addEventListener('drop', (e) => {
      e.preventDefault();
      cell.classList.remove('over');

      const color = e.dataTransfer.getData('text/plain');
      if (color.startsWith('rgb')) {
        cell.style.backgroundColor = color;
      }
    });

    tester.appendChild(cell);
  }
});
