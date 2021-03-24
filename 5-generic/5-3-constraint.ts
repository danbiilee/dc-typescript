{
  interface Employee {
    pay(): void;
  }

  class FullTimeEmployee implements Employee {
    pay() {
      console.log(`full time!!`);
    }
    workFullTime() {}
  }

  class PartTimeEmployee implements Employee {
    pay() {
      console.log(`part time!!`);
    }
    workPartTime() {}
  }

  // 💩 세부적인 타입을 인자로 받아서 추상적인 타입으로 리턴하는 함수
  function payBad(employee: Employee): Employee {
    employee.pay();
    return employee;
  }

  // 제네릭을 Employee 인터페이스를 확장한 타입으로 제한
  function pay<T extends Employee>(employee: T): T {
    employee.pay();
    return employee;
  }

  const ellie = new FullTimeEmployee();
  const bob = new PartTimeEmployee();
  ellie.workFullTime();
  bob.workPartTime();

  /* 
    💩 Employee 인터페이스 타입의 ellie와 bob을 리턴받으므로
    세부 클래스 정보를 잃어버림. pay 메소드만 쓸 수 있음. 
  */
  // const ellieAfterPay = payBad(ellie);
  // const bobAfterPay = payBad(bob);
  // ellieAfterPay.workFullTime();

  const ellieAfterPay = pay(ellie);
  const bobAfterPay = pay(bob);
  ellieAfterPay.workFullTime();

  // keyof T: T에 들어있는 키들 중 하나의 타입
  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  const obj = {
    name: 'ellie',
    age: 20,
  };

  const obj2 = {
    animal: '🐶',
  };

  console.log(getValue(obj, 'name')); // ellie
  console.log(getValue(obj, 'age')); // 20
  console.log(getValue(obj2, 'animal')); // 🐶
  // console.log(getValue(obj2, 'score')); // obj2에 없는 키는 사용할 수 없음 -> 타입보장!
}
