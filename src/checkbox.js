import Storage from './inputRecieve.js';

export default class Checkbox {
  // Used on reload to display next function
  static unChecked() {
    const tasks = Storage.getStorage();
    const unCheckedTasks = tasks.filter((task) => task.completed === false);
    return unCheckedTasks;
  }

  static Checked() {
    const tasks = Storage.getStorage();
    const CheckedTasks = tasks.filter((task) => task.completed === true);
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
    if (el.classList.contains('checkbox')) {
      const checkboxs = document.querySelectorAll('.checkbox');
      const tasks = Storage.getStorage();
      checkboxs.forEach((checkbox, index) => {
        const task = tasks[index];
        if (checkbox.checked) {
          task.completed = true;
          Storage.updateStorage(tasks);
        } else if (!checkbox.checked) {
          task.completed = false;
          Storage.updateStorage(tasks);
        }
      });
      el.nextElementSibling.classList.toggle('checkedDisplay');
    }
  }
}
