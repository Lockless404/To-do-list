import './style.css';
import {
  updateStorage,
  render,
} from './checkbox.js';

export let tasksArray = [
  {
    description: 'Thinking of a fat joint',
    completed: false,
    index: 0,
  },
  {
    description: 'Rolling a fat joint',
    completed: false,
    index: 1,
  },
  {
    description: 'Smoking of a fat joint',
    completed: false,
    index: 2,
  },
];

function displayCheckbox() {
  const checkbox = document.querySelectorAll('.checkbox');
  const inputDisplay = document.querySelectorAll('.inputDisplay');
  if (localStorage.getItem('tasksArray')) {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
    for (let i = 0; i < checkbox.length; i += 1) {
      if (tasksArray[i].completed === true) {
        checkbox[i].checked = true;
        inputDisplay[i].classList.add('checkedDisplay');
      }
    }
  }
}

window.addEventListener('load', (render(), displayCheckbox()));

const checkbox = document.querySelectorAll('.checkbox');
const inputDisplay = document.querySelectorAll('.inputDisplay');

for (let i = 0; i < checkbox.length; i += 1) {
  checkbox[i].addEventListener('change', () => {
    if (tasksArray[i].completed === true) {
      inputDisplay[i].classList.remove('checkedDisplay');
      tasksArray[i].completed = false;
      updateStorage();
    } else {
      inputDisplay[i].classList.add('checkedDisplay');
      tasksArray[i].completed = true;
      updateStorage();
    }
  });
}
