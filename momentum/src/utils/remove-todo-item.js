const removeTodoItem = (event) => {
  const { target } = event;
  const targetParent = target.parentNode;

  targetParent.parentNode.remove();
};

export default removeTodoItem;
