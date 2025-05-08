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


    