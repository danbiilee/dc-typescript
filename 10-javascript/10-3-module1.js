// ✨ export default: 원하는 이름으로 import 가능.
export default function add(a, b) {
  return a + b;
}

/* 
  ✨ export 
  - 한 파일 안에서 default는 반드시 하나여야 한다! 
    Uncaught SyntaxError: Duplicate export of 'default'
  - { } 안에 동일한 이름으로 import 해야 한다. 
  - 다른 이름으로 import 하고 싶을 땐 as 사용. 
*/
export function print() {
  console.log('print');
}

export const number = 10;
