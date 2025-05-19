import { activeHall } from './halls.js';

export function createMachine() {
  const hall = document.getElementById(`hall-${activeHall}`);
  const existingMachines = hall.querySelectorAll('.machine');
  if (existingMachines.length >= 5) {
    alert('Er mogen maximaal 5 machines in een hal staan!');
    return;
  }

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

    if (machine.querySelector('.mix-result')) {
      alert('De machine is bezig met mengen!');
      return;
    }

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

    const speed = ingredients[0].speed;
    machine.classList.add(`shake-speed-${speed}`);

    let totalR = 0, totalG = 0, totalB = 0;
    let totalTime = 0;

    for (const ing of pot.children) {
      const color = window.getComputedStyle(ing).backgroundColor;
      const [r, g, b] = color.match(/\d+/g).map(Number);
      totalR += r;
      totalG += g;
      totalB += b;
    }

    totalTime = Math.max(...Array.from(pot.children).map(ing => parseInt(ing.dataset.mixtime)));

    const mixResult = document.createElement('div');
    mixResult.className = 'mix-result';
    mixResult.textContent = 'Mengen...';
    mixResult.style.padding = '10px';
    mixResult.style.border = '1px solid #333';
    machine.appendChild(mixResult);

    setTimeout(() => {
      const finalColor = `rgb(${Math.floor(totalR / ingredients.length)}, ${Math.floor(totalG / ingredients.length)}, ${Math.floor(totalB / ingredients.length)})`;
      mixResult.style.backgroundColor = finalColor;
      mixResult.textContent = `Gemengd! (${ingredients.length} ingrediënten)`;

      machine.classList.remove(`shake-speed-${speed}`);

      mixResult.draggable = true;
      mixResult.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', finalColor);
      });

      const finishedPot = document.createElement('div');
      finishedPot.className = 'pot-done';
      finishedPot.style.backgroundColor = finalColor;
      finishedPot.draggable = true;
      finishedPot.textContent = `Gemixte pot`;
      finishedPot.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', finalColor);
      });
      document.getElementById('potsDone').appendChild(finishedPot);

      pot.remove();

      setTimeout(() => {
        if (mixResult.parentNode === machine) {
          machine.removeChild(mixResult);
        }
        machine.textContent = 'Sleep hier een pot in om te mengen...';
      }, 1000);

    }, totalTime);
  });

  hall.appendChild(machine);
}
