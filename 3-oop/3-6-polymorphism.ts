{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean; // optional
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  /* 
    다형성
    - 인터페이스나 부모 클래스를 상속한 자식 클래스들이 
      인터페이스나 부모 클래스에 포함된 함수들을 다른 방식으로 다양하게 구성하여 사용하는 것  
  */
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    // ❗ 생성자 함수가 private이면 상속시킬 수 없음
    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans = beans;
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);

      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat() {
      console.log('heating up... 🔥');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots... ☕`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots); // 커피콩 갈기
      this.preheat(); // 머신 달구기
      return this.extract(shots); // 샷 추출
    }

    clean() {
      console.log('cleaning the machine... 🧽');
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }

    private steamMilk() {
      console.log('Steaming some milk...🥛');
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return { ...coffee, hasMilk: true };
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    private addSugar() {
      console.log('Add Sugar... 🍯');
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.addSugar();
      return { ...coffee, hasSugar: true };
    }
  }

  /* 
    1. CaffeLatteMachine과 SweetCoffeeMachine이 CoffeeMachine 클래스를 상속함. 
    2. CoffeeMachine이 CoffeeMaker 인터페이스를 구현함.
    ---> CoffeeMachine, CaffeLatteMachine, SweetCoffeeMachine 전부 CoffeeMaker가 될 수 있음. 
  */
  const machines: CoffeeMaker[] = [
    new CoffeeMachine(23),
    new CaffeLatteMachine(23, 'ABCD123'),
    new SweetCoffeeMachine(23),
    new CoffeeMachine(23),
    new CaffeLatteMachine(23, 'ABCD123'),
    new SweetCoffeeMachine(23),
  ];

  /* 
    ❕❕❕ 다형성의 POWER 😎👍 ❕❕❕
    makeCoffee 함수를 어떤 (자식)클래스에 포함되어 있는지 구분하지 않고, 
    동일한 함수 API로서 호출할 수 있다. 
    ---> 모든 클래스들이 결국 CoffeeMaker 인터페이스를 구현하고 있고, 
          makeCoffee 함수는 그 인터페이스의 규약이기 때문! 
  */
  machines.forEach((machine) => {
    console.log('--------------------------------------');
    machine.makeCoffee(1);
    // machine.clean(); // CoffeeMaker 인터페이스에 규약된 함수만 사용 가능
  });
}
