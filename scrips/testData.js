export function initColorTesterGrid() {
  const tester = document.getElementById('color-tester');
  for (let i = 0; i < 24; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;

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
}

export function initMixedColorPots() {
  const mixedColors = ['rgb(128, 0, 128)', 'rgb(255, 165, 0)', 'rgb(0, 128, 128)'];
  const potsDone = document.getElementById('potsDone');

  for (const color of mixedColors) {
    const finishedPot = document.createElement('div');
    finishedPot.className = 'pot-done';
    finishedPot.style.backgroundColor = color;
    finishedPot.draggable = true;
    finishedPot.textContent = `Gemixte pot`;
    finishedPot.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', color);
    });
    potsDone.appendChild(finishedPot);
  }
}
