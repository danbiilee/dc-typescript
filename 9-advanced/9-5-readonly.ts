{
  type ToDo = {
    title: string;
    description: string;
  };

  // map.ts에서 직접 정의한 Readonly 같은 타입은 이미 TS 내에 Utility Type으로 정의되어 있다.
  function display(todo: Readonly<ToDo>) {
    // 👍 불변성 유지
    // todo.title = 'jaja';
  }
}
