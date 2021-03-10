{
  // // JavaScript 💩
  // function jsAdd(num1, num2) {
  //   return num1 + num2;
  // }

  // // TypeScript ✨
  // function add(num1: number, num2: number): number {
  //   return num1 + num2;
  // }

  // // JavaScript 💩
  // function jsFecthNum(id) {
  //   // code ...
  //   return new Promise((resolve, reject) => {
  //     resolve(100);
  //   });
  // }

  // // TypeScript ✨
  // function fecthNum(id: string): Promise<number> {
  //   // code ...
  //   return new Promise((resolve, reject) => {
  //     resolve(100);
  //   });
  // }

  // JavaScript => TypeScript: JS 문법 혹은 아직 JS 에는 포함되어있지 않은 문법으로 TS 정의 가능
  // 1. Optional parameter: 변수 뒤에 물음표 붙이기
  // 물음표 대신 lastName: string | undefined => 두 번째 인자를 필수적으로 전달해줘야 한다는 단점.
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  printName('Steve', 'Jobs');
  printName('Ellie');
  printName('Anna', undefined);

  // 2. Default parameter
  // 아무것도 전달하지 않을 경우 기본값으로 설정됨
  function printMessage(message: string = 'default message') {
    console.log(message);
  }
  printMessage();

  // 3. Rest parameter
  // 개수와 상관없이 동일한 타입의 인자들을 배열로 전달할 때 사용
  function addNumbers(...nums: number[]): number {
    return nums.reduce((prev, cur) => prev + cur);
  }
  console.log(addNumbers(1, 2));
  console.log(addNumbers(1, 2, 3, 4));
  console.log(addNumbers(1, 2, 3, 4, 5, 0));
}
