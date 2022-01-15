export default class TodoList {
  constructor() {
    this.container = document.createElement('section');
    this.container.classList.add('page__todo-list', 'todo-list');
  }

  render() {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Todo</h2>
      <div class="todo-list__top">
        <input class="todo-list__input" type="text" name="new-todo-input" placeholder="Add new todo...">
        <button class="todo-list__button" type="button" name="button-add">✚</button>
      </div>
      <ul class="todo-list__list"></ul>
    `;

    return this.container;
  }

  createTodoItem() {
    this.newTodoItem = document.createElement('li');
    this.newTodoItem.classList.add('todo-list__item');

    this.newTodoItem.innerHTML = `
      <div class="todo-list__input-wrapper">
        <input class="todo-list__input" type="text" value="${this.newTodoInput.value}">
      </div>
      <div class="todo-list__buttons-wrapper">
        <button class="todo-list__button" type="button" name="button-complete">✔</button>
        <button class="todo-list__button" type="button" name="button-delete">✘</button>
      </div>
    `;

    this.newTodoInput.value = '';

    return this.newTodoItem;
  }

  getElements() {
    this.newTodoInput = this.container.querySelector('[name=new-todo-input]');
    this.todoList = this.container.querySelector('.todo-list__list');
    this.buttonAdd = this.container.querySelector('[name=button-add]');
  }

  addListeners() {
    this.newTodoInput.addEventListener('change', () => {
      this.todoList.append(this.createTodoItem());
    });

    this.buttonAdd.addEventListener('click', () => {
      this.createTodoItem();
    });

    this.todoList.addEventListener('click', (event) => {
      const target = event.target;
      const targetParent = target.parentNode;

      if (target.name === 'button-complete') {
        target.classList.add('js-active-btn');

        target.style.color = '#ff4040';
        targetParent.parentNode
          .querySelector('.todo-list__input-wrapper')
          .classList.add('todo-list__input-wrapper--complete');
        targetParent.parentNode.querySelector(
          '.todo-list__input'
        ).readOnly = true;
        targetParent.parentNode.querySelector('.todo-list__input').style.color =
          'rgba(255, 255, 255, 0.5)';
        targetParent.parentNode.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      } else if (target.name === 'button-delete') {
        targetParent.parentNode.classList.add('js-hide-section');

        targetParent.parentNode.addEventListener('animationend', () => {
          targetParent.parentNode.remove();
        });
      }
    });
  }

  init() {
    this.getElements();
    this.addListeners();
  }
}
