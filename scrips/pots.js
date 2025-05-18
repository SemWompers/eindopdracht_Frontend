
export function createPot() {
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
