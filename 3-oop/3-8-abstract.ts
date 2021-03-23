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
    ✨ Abstract Class
    - abstract 키워드는 class 키워드 앞에 붙인다. 
    - abstract 클래스로는 객체를 생성할 수 없다. 
    - 공통 기능은 구현하고, 자식 클래스마다 달라져야 하는 기능은 추상 메소드화 한다. 
  */
  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
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

    /* 
      ✨ Abstract Method
      - 자식 클래스마다 다르게 구현하고 싶은 함수 앞에 abstract 키워드 추가.
      - 접근 제어자: 자식 클래스에서 접근해야 하기 때문에 private -> protected 로 변경, abstract 키워드 앞에 위치.
      - 추상 메소드의 내용은 자식 클래스에서 구현.
    */
    protected abstract extract(shots: number): CoffeeCup;

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots); // 커피콩 갈기
      this.preheat(); // 머신 달구기
      return this.extract(shots); // 샷 추출 ---> 추상 메소드로 변경
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

    /* 
      💩 오버라이딩 중에 super.makeCoffee 호출을 하지 않는다면, 
      부모 클래스의 의도와는 전혀 다른 방식으로 구현될 수 있음. 
      ---> 추상 메소드를 구현했다면, makeCoffee 함수를 오버라이딩 할 필요 없음.
    */
    // makeCoffee(shots: number): CoffeeCup {
    //   const coffee = super.makeCoffee(shots);
    //   this.steamMilk();
    //   return { ...coffee, hasMilk: true };
    // }

    // 추상 메소드 구현
    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return { shots, hasMilk: true };
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    private addSugar() {
      console.log('Add Sugar... 🍯');
    }

    // 추상 메소드 구현
    protected extract(shots: number): CoffeeCup {
      this.addSugar();
      return { shots, hasSugar: true };
    }
  }

  const machines: CoffeeMaker[] = [
    new CaffeLatteMachine(23, 'ABCD123'),
    new SweetCoffeeMachine(23),
    new CaffeLatteMachine(23, 'ABCD123'),
    new SweetCoffeeMachine(23),
  ];

  machines.forEach((machine) => {
    console.log('--------------------------------------');
    machine.makeCoffee(1);
  });
}
