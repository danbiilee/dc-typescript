{
  // // JavaScript π©
  // function jsAdd(num1, num2) {
  //   return num1 + num2;
  // }

  // // TypeScript β¨
  // function add(num1: number, num2: number): number {
  //   return num1 + num2;
  // }

  // // JavaScript π©
  // function jsFecthNum(id) {
  //   // code ...
  //   return new Promise((resolve, reject) => {
  //     resolve(100);
  //   });
  // }

  // // TypeScript β¨
  // function fecthNum(id: string): Promise<number> {
  //   // code ...
  //   return new Promise((resolve, reject) => {
  //     resolve(100);
  //   });
  // }

  // JavaScript => TypeScript: JS λ¬Έλ² νΉμ μμ§ JS μλ ν¬ν¨λμ΄μμ§ μμ λ¬Έλ²μΌλ‘ TS μ μ κ°λ₯
  // 1. Optional parameter: λ³μ λ€μ λ¬Όμν λΆμ΄κΈ°
  // λ¬Όμν λμ  lastName: string | undefined => λ λ²μ§Έ μΈμλ₯Ό νμμ μΌλ‘ μ λ¬ν΄μ€μΌ νλ€λ λ¨μ .
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  printName('Steve', 'Jobs');
  printName('Ellie');
  printName('Anna', undefined);

  // 2. Default parameter
  // μλ¬΄κ²λ μ λ¬νμ§ μμ κ²½μ° κΈ°λ³Έκ°μΌλ‘ μ€μ λ¨
  function printMessage(message: string = 'default message') {
    console.log(message);
  }
  printMessage();

  // 3. Rest parameter
  // κ°μμ μκ΄μμ΄ λμΌν νμμ μΈμλ€μ λ°°μ΄λ‘ μ λ¬ν  λ μ¬μ©
  function addNumbers(...nums: number[]): number {
    return nums.reduce((prev, cur) => prev + cur);
  }
  console.log(addNumbers(1, 2));
  console.log(addNumbers(1, 2, 3, 4));
  console.log(addNumbers(1, 2, 3, 4, 5, 0));
}
