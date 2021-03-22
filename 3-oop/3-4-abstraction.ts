{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  /* 
    추상화
    - 복잡한 기능, 프로세스 중에서 정말 필요한 정보만 노출시킴으로써 간편하게 사용할 수 있도록 도와준다. 

    1. 캡슐화를 통해
    2. 인터페이스(TS)를 통해 
  */

  // Interface: 사용 가능한 기능들의 명세서
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  // CoffeeMaker 인터페이스를 구현하는 클래스: 인터페이스에서 규약된 모든 함수를 구현해야 함
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    private constructor(coffeeBeans: number) {
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

    // 아래 3개의 함수: 내부적으로 돌아가는 함수들이므로 바깥에선 알 필요 없음
    // ---> 은닉 ===> 추상화
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

  // 타입을 클래스로 설정하면 클래스 내부의 public 함수들 전부 사용 가능
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  maker.fillCoffeeBeans(32);
  maker.makeCoffee(2);

  const maker2: CoffeeMaker = CoffeeMachine.makeMachine(32);
  // CoffeeMaker 인터페이스에는 makeCoffee 함수밖에 없음
  // ---> 인터페이스를 사용하면 기능 허용 범위를 설정할 수 있음
  // maker2.fillCoffeeBeans(32);
  maker2.makeCoffee(2);

  // 타입을 Interface로 제한하면, Interface에 명시한 기능들만 사용 가능
  const maker3: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);
  maker3.fillCoffeeBeans(32);
  maker3.makeCoffee(2);
  maker3.clean();

  // ⚡⚡⚡
  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}

    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}

    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);

      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  const machine: CoffeeMachine = CoffeeMachine.makeMachine(32);
  /* 
    ❕❕❕ 추상화의 POWER 😎👍 ❕❕❕
    1. CoffeeMachine 클래스는 2개의 인터페이스를 구현하고 있음. 
    2. 같은 CoffeeMachine 타입의 machine을 생성자 함수에 전달하고 있지만, 
      각각 내부에서 다른 인터페이스를 통해 타입을 제한하고 있음.
    ---> 사용할 수 있는 기능의 범위가 CoffeeMachine 클래스보다 좁아지게 된다!  
    ---> 사용자는 해당 인터페이스의 기능만 알면 될 뿐, 그 외에는 신경쓸 필요가 없어진다! 
  */
  const amateur = new AmateurUser(machine);
  const pro = new ProBarista(machine);
  amateur.makeCoffee();
  pro.makeCoffee();
}
