{
  // Array
  const fruits: string[] = ['🍉', '🍌'];
  const scores: Array<number> = [1, 3, 4]; // 제네릭!

  // readonly: 값의 불변성 보장. 값을 변경할 수 없다.
  // 제네릭으로 타입이 지정된 경우 readonly를 사용할 수 없다.
  function printArray(fruits: readonly string[]) {
    // fruits.push();
  }

  // Tuple: 서로 다른 타입의 값을 갖는 배열
  // -> ✨ interface, type alias, class 로 대체할 수 있는지 고민 후 사용하기!
  // Tuple을 사용하는 좋은 예: 리액트의 useState()
  let student: [string, number];
  student = ['name', 23];
  student[0]; // name
  student[1]; // 23
  const [name, age] = student; // 구조 분해 할당로 가독성 up!
}
