{
  /* 
  💩 Type Assertions: 타입 강제 

  불가피하게 써야하는 경우: 
  JS함수이기 때문에 TS는 리턴타입을 알 수 없지만,
  내부적으로는 항상 특정 타입의 값을 리턴하는 함수가 있을 때
  -----> 100% 장담 가능할 때!
  */
  function jsStrFunc(): any {
    return 'hello';
    // return 2; // 컴파일에러 X. 런타임 시 콘솔에 undefined 찍힘.
  }
  const result = jsStrFunc();
  // result.length; // result의 타입은 any이므로 문자열의 api를 사용할 수 없다.
  console.log((result as string).length); // casting
  console.log((<string>result).length);

  const wrong: any = 5;
  console.log((wrong as number[]).push(1)); // 런타임 에러 발생 -> 앱 죽음 😱!

  // !: undefined, null이 아닐 것을 무조건무조건 1000000% 확신할 경우 붙임
  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers();
  //numbers.push(2); // undefined일 수도 있기 때문에 배열 api 사용하면 컴파일 에러 발생.
  numbers!.push(2);
  // const numbers = findNumbers()!; // 이것도 가능

  // querySelector: 리턴값이 Element이거나 null일 수도 있음.
  const button = document.querySelector('class')!;
  button.nodeValue;
}
