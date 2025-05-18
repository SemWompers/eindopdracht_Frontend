export let activeHall = 1;

export function switchHall(nr) {
  document.getElementById('hall-1').classList.remove('active');
  document.getElementById('hall-2').classList.remove('active');
  document.getElementById(`hall-${nr}`).classList.add('active');
  activeHall = nr;
}

export function initHallSwitchButtons() {
  document.getElementById('btn-hall-1').addEventListener('click', () => switchHall(1));
  document.getElementById('btn-hall-2').addEventListener('click', () => switchHall(2));
}
