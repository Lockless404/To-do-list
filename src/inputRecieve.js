export default class Storage {
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

  static removeTask(description) {
    const tasks = this.getStorage();
    for (let i = 0; i < tasks.length; i += 1) {
      if (description === tasks[i].description) {
        tasks.splice(i, 1);
      }
    }
    this.updateStorage(tasks);
  }

  static updateIndexValues() {
    const tasks = this.getStorage();

    tasks.forEach((task) => {
      task.index = tasks.indexOf(task);
    });

    this.updateStorage(tasks);
  }
}
