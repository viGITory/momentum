const removeTodoItem = (event) => {
  const { target } = event;
  const targetParent = target.parentNode;

  targetParent.parentNode.classList.add('js-hide-section');

  targetParent.parentNode.addEventListener('animationend', () => {
    targetParent.parentNode.remove();
  });
};

export default removeTodoItem;
