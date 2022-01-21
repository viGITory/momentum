import removeTodoItem from '../../utils/remove-todo-item';

export default class TodoList {
  constructor() {
    this.container = document.createElement('section');
    this.container.classList.add('page__todo-list', 'section', 'todo-list');
    this.container.id = 'section-todo';

    this.todoStorage = [];
  }

  render() {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Todo</h2>
      <div class="todo-list__top">
        <input class="todo-list__input" type="text" name="new-todo-input" placeholder="Add new todo..." aria-label="new-todo">
      </div>
      <ul class="todo-list__list"></ul>
    `;

    return this.container;
  }

  createTodoItem(value) {
    this.newTodoItem = document.createElement('li');
    this.newTodoItem.classList.add('todo-list__item');

    this.newTodoItem.innerHTML = `
      <div class="todo-list__input-wrapper">
        <input class="todo-list__input" type="text" value="${value.trim()}" aria-label="todo-item">
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
  }

  addListeners() {
    this.newTodoInput.addEventListener('change', () => {
      this.todoList.append(this.createTodoItem(this.newTodoInput.value));
    });

    this.todoList.addEventListener('click', (event) => {
      const { target } = event;
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
      } else if (target.name === 'button-delete') {
        removeTodoItem(event);
      }
    });

    this.todoList.addEventListener('change', (event) => {
      const { target } = event;
      const targetParent = target.parentNode;

      if (targetParent.querySelector('.todo-list__input').value === '') {
        removeTodoItem(event);
      }
    });

    window.addEventListener('beforeunload', () => {
      const todoItems = this.container.querySelectorAll(
        '.todo-list__input-wrapper > .todo-list__input'
      );

      todoItems.forEach((item) => {
        if (!item.readOnly) {
          this.todoStorage.push(item.value);
        }
      });

      localStorage.setItem(
        'vigitory-todo-list',
        JSON.stringify(this.todoStorage)
      );
    });

    document.addEventListener('DOMContentLoaded', () => {
      const todoItems = JSON.parse(localStorage.getItem('vigitory-todo-list'));

      if (todoItems) {
        todoItems.forEach((item) => {
          this.todoList.append(this.createTodoItem(item));
        });
      }
    });
  }

  init() {
    this.getElements();
    this.addListeners();
  }
}
