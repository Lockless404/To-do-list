import {tasksArray} from './index.js'

const tasks = document.querySelector('.tasks');

function render() {
  for (let i = 0; i < tasksArray.length; i += 1) {
    tasks.innerHTML += `
    <li class="displayList">
      <div class="innerItems">
        <input class="checkbox" type="checkbox">
        <p class="inputDisplay">${tasksArray[i].description}</p>
      </div>
      <div class="innerItems">
        <button class="listButton"><i class='fas fa-ellipsis-v'></i></button>
        <button class="binButton"><i class="material-icons" id="bin">delete</i></button>
      </div>
    </li>
    `;
  }
}

function updateStorage() {
  localStorage.clear();
  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
}

export {
  updateStorage,
  render,
};
