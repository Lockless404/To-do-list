import { remove } from 'lodash';
import './style.css';
// import {
//   // render,
//   displayCheckbox,
//   checkCheckbox,
// } from './checkbox.js';
// import {} from './inputRecieve.js';

// window.addEventListener('load', () => {
//   render();
//   displayCheckbox();
//   
// });






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

}

class Storage {
  static getStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }

  static addTasktoStorage(task) {
    const tasks = this.getStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  static updateStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

class Checkbox {
  
  // Used on reload to display next function
  static unChecked() {
    const tasks = Storage.getStorage();
    const unCheckedTasks = tasks.filter(task => task.completed === false);
    return unCheckedTasks;
  }

  static Checked() {
    const tasks = Storage.getStorage();
    const CheckedTasks = tasks.filter(task => task.completed === true);
    return CheckedTasks;
  }
  
  static display() {
    const checkbox = document.querySelectorAll('.checkbox');
    const inputDisplay = document.querySelectorAll('.inputDisplay');
    const tasks = Storage.getStorage();
    for (let i = 0; i < checkbox.length; i += 1) {
      if (tasks[i].completed === true) {
        checkbox[i].checked = true;
        inputDisplay[i].classList.add('checkedDisplay');
      }
    }
  }

  // Functions adds line across checkbox items when checked
  static checkState(el) {
    if (el.classList.contains('removeButton')) {
      const tasks = Storage.getStorage();
      for (let i = 0; i < tasks.length; i += 1) {
        if (tasks[i].completed === true) {
          tasks[i].completed = false;
          Storage.updateStorage(tasks);
        } else {
          tasks[i].completed = true;
          Storage.updateStorage(tasks);
        }
      }
    }
  }
}

// Event Listener for display onload beginning
document.addEventListener('DOMContentLoaded', (Ui.displayTasks(), Checkbox.display()));

// Event listener for adding tasks
const addBtn = document.querySelector('.enterBtn');
addBtn.addEventListener('click', (e) => {
  const input = document.querySelector('.input').value;
  e.preventDefault();
  const task = new Tasks(input, 0);
  Ui.render(task);
  Ui.clearInput();
  Storage.addTasktoStorage(task);
});

const removeButton = document.querySelector('.removeAll')
removeButton.addEventListener('click', (e) => {
  Ui.clearList();
  const tasks = Checkbox.unChecked();
  Storage.updateStorage(tasks);
  Ui.displayTasks();
});

//Event Listner for checkbox state
const checkboxs = document.querySelectorAll('.checkbox');
checkboxs.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    Checkbox.checkState();
    checkbox.nextElementSibling.classList.toggle('checkedDisplay')
  });
});





// for (let i = 0; i < checkbox.length; i += 1) {
//   console.log('ssss')
//   checkbox[i].addEventListener('change', () => {
//   Checkbox.checkState(i);
//   });
// }


