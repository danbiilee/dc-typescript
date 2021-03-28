const x = {};
const y = {};

// JS에서 모든 객체는 Object라는 __proto__를 가지고 있다.
console.log(x);
console.log(y);
console.log(x.toString());

// 두 객체는 동일한 Object를 상속하고 있다.
console.log(x.__proto__ === y.__proto__); // true

/* 
  array의 __proto__: Array(0) 
  ---> Array의 __proto__: Object (모든 객체는 전부 Object를 상속!)
*/
const array = [];
console.log(array);

console.clear();

// constructor function
function CoffeeMachine(beans) {
  this.beans = beans;
  // Instance member level: 생성되는 Instance마다 포함됨 -> 💡 한 번만 정의하고 싶다면?!
  // this.makeCoffee = (shots) => {
  //   console.log('making... ☕');
  // };
}
// Prototype mebmer level ---> 만들어진 객체의 __proto__ 안으로 포함됨!
CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log('making... ☕');
};

/* 
  machine1과 machine2의 __proto__: CoffeeMachine(makeCoffee 메서드를 포함하는 Object)
  ---> CoffeeMachine의 __proto__: Object
*/
const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine1);
console.log(machine2);

function LatteMachine(milk) {
  this.milk = milk;
}
// CoffeeMachine의 prototype 객체를 상속
// LatteMachine.prototype = Object.create(CoffeeMachine.prototype); // 수업 때 방식: CoffeeMachine.prototype 객체를 한 번 더 객체로 감싼 형태로 상속됨
LatteMachine.prototype = CoffeeMachine.prototype;

/* 
  latteMachine의 __proto__: CoffeeMachine(makeCoffee 메서드를 포함하는 Object)
*/
const latteMachine = new LatteMachine('🥛');
console.log(latteMachine);
latteMachine.makeCoffee();
