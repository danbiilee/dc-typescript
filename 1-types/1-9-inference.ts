{
  // Type Inference
  // 변수 선언과 동시에 값을 할당하면 TS가 알아서 해당 타입을 추론해줌. 타입 생략 가능.
  let text = 'hello';
  // text = 1; // 에러 발생

  // 함수 파라미터에 타입을 명시하지 않을 경우 기본 타입 any로 설정됨.
  // 문자열로 기본값을 설정해주면, 자동 타입 추론.
  function print(message = 'hello') {
    console.log(message);
  }
  print('hello');
  // print(1);

  // 함수 반환값, 자동 타입 추론.
  function add(x: number, y: number) {
    return x + y;
  }
  const result = add(1, 2);

  // 정말 값이 뻔한 원시타입일 경우에만 타입 추론 사용할 것.
  // 💩 함수에서는 타입 추론 기능 사용하는 것 비추!
  // 그 외에는 코드 컨벤션을 만들어놓고, 가독성 좋게 일관성 있게 코드를 작성할 것.
}
