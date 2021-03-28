import sum, { print as printMessage } from './10-3-module1.js';

console.log(sum(1, 2));
printMessage();

// ❕ default로 export하는 함수나 변수가 있으면 * 를 통해 import할 수 없다.
// import * as calculator from './10-3-module1.js';

// console.log(calculator.add(1, 2));
// calculator.print();
