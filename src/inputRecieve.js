class Tasks {
  constructor(description) {
    this.description = description;
    completed = false;
    index;
  }
}

class Ui {
  static displayTasks() {
    let tasks = [

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
    tasks.forEach(task =>{
      Ui.render(task)
    });
  }

  static render(task) {
    tasks.innerHTML += `
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
}
