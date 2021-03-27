{
  type ToDo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  };

  // ✨ Partial: 기존 타입의 일부 properties만 허용
  // 9-3-map에서 직접 정의했던 Optional<T> 와 동일
  function updateToDo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    return {
      ...todo,
      ...fieldsToUpdate,
    };
  }

  const todo: ToDo = {
    title: 'learn TypeScript',
    description: 'study hard',
    label: 'study',
    priority: 'high',
  };
  const updated = updateToDo(todo, { priority: 'low' });
  console.log(updated);
}
