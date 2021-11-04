let tasksArray = [

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
  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
}

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

function checkCheckbox(i) {
  const inputDisplay = document.querySelectorAll('.inputDisplay');
  if (tasksArray[i].completed === true) {
    inputDisplay[i].classList.remove('checkedDisplay');
    tasksArray[i].completed = false;
    updateStorage();
  } else {
    inputDisplay[i].classList.add('checkedDisplay');
    tasksArray[i].completed = true;
    updateStorage();
  }
}

export {
  render,
  displayCheckbox,
  checkCheckbox,
};
