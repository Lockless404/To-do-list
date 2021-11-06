import { remove } from 'lodash';
import './style.css';
import {
  Checkbox,
} from './checkbox.js';
import {
  Storage,
} from './inputRecieve.js';

const tasksDisplay = document.querySelector('.tasks');

class Tasks {
  constructor(description, index) {
    this.description = description;
    this.completed = false;
    this.index = index;
  }
}

class Ui {
  
  static displayTasks() {
    const tasks = Storage.getStorage();

    tasks.forEach(task =>{
      this.render(task);
    });
  }

  static render(task) {
    tasksDisplay.innerHTML += `
    <li class="displayList">
      <div class="innerItems">
        <input class="checkbox" type="checkbox">
        <p class="inputDisplay">${task.description}</p>
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
      console.log('aaalal');
    }
  }

  static removeDeleteButton(el) {
    if (el.classList.contains('binButton')) {
      el.parentElement.parentElement.remove();
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

//Event listner for removing checked tasks
const removeButton = document.querySelector('.removeAll')
removeButton.addEventListener('click', (e) => {
  Ui.clearList();
  const tasks = Checkbox.unChecked();
  Storage.updateStorage(tasks);
  Ui.displayTasks();
  Checkbox.display();
  Storage.updateIndexValues();
});

//Event Listner for checkbox state
tasksDisplay.addEventListener('click', (e) => {
  Checkbox.checkState(e.target);

  Ui.displayDeleteButton(e.target);
});

tasksDisplay.addEventListener('click', (e) => {
  Ui.removeDeleteButton(e.target);
  Storage.removeTask(e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.textContent);
  Storage.updateIndexValues();
});
