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

  // π© μΈλΆμ μΈ νμμ μΈμλ‘ λ°μμ μΆμμ μΈ νμμΌλ‘ λ¦¬ν΄νλ ν¨μ
  function payBad(employee: Employee): Employee {
    employee.pay();
    return employee;
  }

  // μ λ€λ¦­μ Employee μΈν°νμ΄μ€λ₯Ό νμ₯ν νμμΌλ‘ μ ν
  function pay<T extends Employee>(employee: T): T {
    employee.pay();
    return employee;
  }

  const ellie = new FullTimeEmployee();
  const bob = new PartTimeEmployee();
  ellie.workFullTime();
  bob.workPartTime();

  /* 
    π© Employee μΈν°νμ΄μ€ νμμ ellieμ bobμ λ¦¬ν΄λ°μΌλ―λ‘
    μΈλΆ ν΄λμ€ μ λ³΄λ₯Ό μμ΄λ²λ¦Ό. pay λ©μλλ§ μΈ μ μμ. 
  */
  // const ellieAfterPay = payBad(ellie);
  // const bobAfterPay = payBad(bob);
  // ellieAfterPay.workFullTime();

  const ellieAfterPay = pay(ellie);
  const bobAfterPay = pay(bob);
  ellieAfterPay.workFullTime();

  // keyof T: Tμ λ€μ΄μλ ν€λ€ μ€ νλμ νμ
  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  const obj = {
    name: 'ellie',
    age: 20,
  };

  const obj2 = {
    animal: 'πΆ',
  };

  console.log(getValue(obj, 'name')); // ellie
  console.log(getValue(obj, 'age')); // 20
  console.log(getValue(obj2, 'animal')); // πΆ
  // console.log(getValue(obj2, 'score')); // obj2μ μλ ν€λ μ¬μ©ν  μ μμ -> νμλ³΄μ₯!
}
