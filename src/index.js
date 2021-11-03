import './style.css';
import {
  updateStorage,
  render,
  tasksArray,
} from './checkbox.js';

window.addEventListener('load', render());

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
