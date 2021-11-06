import './style.css';
import Checkbox from './checkbox.js';
import Storage from './inputRecieve.js';
import Tasks from './task.js';

const tasksDisplay = document.querySelector('.tasks');

class Ui {
  static displayTasks() {
    const tasks = Storage.getStorage();

    tasks.forEach((task) => {
      this.render(task);
    });
  }

  static render(task) {
    tasksDisplay.innerHTML += `
    <li class="displayList">
      <div class="innerItems">
        <input class="checkbox" type="checkbox">
        <p class="inputDisplay" contentEditable = true>${task.description}</p>
      </div>
      <div class="innerItems">
        <button class="listButton"><i class='fas fa-ellipsis-v'></i></button>
        <button class="binButton"><i class="material-icons" id="bin">delete</i></button>
      </div>
    </li>
    `;
  }

  static clearList() {
    tasksDisplay.innerHTML = '';
  }

  static clearInput() {
    document.querySelector('.input').value = '';
  }

  static displayDeleteButton(el) {
    if (el.classList.contains('listButton')) {
      el.classList.toggle('buttonDisappear');
      el.nextElementSibling.classList.toggle('buttonAppear');
    }
  }

  static removeDeleteButton(el) {
    if (el.classList.contains('binButton')) {
      el.parentElement.parentElement.remove();
    }
  }

  static editInput(el) {
    if (el.classList.contains('inputDisplay')) {
      el.parentElement.nextElementSibling.firstElementChild.classList.add('buttonDisappear');
      el.parentElement.nextElementSibling.firstElementChild.nextElementSibling.classList.add('buttonAppear');
    }
  }
}

// Event Listener for display onload beginning
document.addEventListener('DOMContentLoaded', (Ui.displayTasks(), Checkbox.display()));

// Event listener for adding tasks
const addBtn = document.querySelector('.enterBtn');
addBtn.addEventListener('click', (e) => {
  const input = document.querySelector('.input').value;
  const tasks = Storage.getStorage();
  e.preventDefault();
  const task = new Tasks(input, tasks.length);
  Ui.render(task);
  Ui.clearInput();
  Storage.addTasktoStorage(task);
  Checkbox.display();
});

// Event listner for removing checked tasks
const removeButton = document.querySelector('.removeAll');
removeButton.addEventListener('click', () => {
  Ui.clearList();
  const tasks = Checkbox.unChecked();
  Storage.updateStorage(tasks);
  Ui.displayTasks();
  Checkbox.display();
  Storage.updateIndexValues();
});

// Event Listner for checkbox state
tasksDisplay.addEventListener('click', (e) => {
  if (e.target.classList.contains('checkbox')) {
    Checkbox.checkState(e.target);
  } else if (e.target.classList.contains('binButton')) {
    Ui.removeDeleteButton(e.target);
    const cousinElemente = e.target.parentElement.previousElementSibling.firstElementChild;
    Storage.removeTask(cousinElemente.nextElementSibling.textContent);
    Storage.updateIndexValues();
  } else if (e.target.classList.contains('inputDisplay')) {
    Ui.editInput(e.target);
  } else if (e.target.classList.contains('listButton')) {
    Ui.displayDeleteButton(e.target);
  }
});

tasksDisplay.addEventListener('keydown', (e) => {
  const displayInput = document.querySelectorAll('.inputDisplay');
  const tasks = Storage.getStorage();
  if (e.which === 13) {
    e.preventDefault();
    displayInput.forEach((input, index) => {
      const task = tasks[index];
      if (input.innerHTML !== task.description) {
        task.description = input.innerHTML;
      }
    });
    Storage.updateStorage(tasks);
  }
});
