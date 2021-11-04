import './style.css';
import {
  render,
  displayCheckbox,
  checkCheckbox,
} from './checkbox.js';

window.addEventListener('load', () => {
  render();
  displayCheckbox();
  const checkbox = document.querySelectorAll('.checkbox');
  for (let i = 0; i < checkbox.length; i += 1) {
    checkbox[i].addEventListener('change', () => {
      checkCheckbox(i);
    });
  }
});
