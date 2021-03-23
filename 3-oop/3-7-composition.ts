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
    ✨ Favor COMPOSITION over inheritance!
    Composition: 구성. 필요한 것들을 모아 조립해나가는 것.
    - 불필요한 상속을 중첩해 구조를 복잡하게 하지 않고, composition 사용하기.
    - 주입을 통해 composition 재사용 가능.
  */

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

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

  /* 
    각각 우유와 설탕을 추가하는 기능을 가진 클래스 생성
    -> 매번 로직을 중복해서 작성하지 않기!!! 
  */
  // 싸구려 우유 거품기
  class CheapMilkSteamer {
    private steamMilk() {
      // ...복잡한 내부 로직
      console.log('Steaming some milk...🥛');
    }

    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 설탕 제조기
  class AutomaticSugarMixer {
    private getSugar() {
      // ...복잡한 내부 로직
      console.log('Getting some sugar from jar 🍯');
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    // Dependency Injection: 필요한 것을 외부에서 주입
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: CheapMilkSteamer,
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      /* 
        내부에 우유 추가 로직을 중복 작성하지 않고, 
        주입받은 milkFrother를 통해 우유를 추가한 커피 생성
      */
      return this.milkFrother.makeMilk(coffee);
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    constructor(beans: number, private sugar: AutomaticSugarMixer) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  /* 
    💩 클래스와 클래스가 밀접하게 연결되어있는 것은 좋지 않다.  
    SweetCaffeLatteMachine 클래스는 CheapMilkSteamer와 AutomaticSugarMixer 클래스와 밀접하게 엮여있음.
    추후 엮여있는 클래스들을 변경하려면 문제 발생.  
  */
  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      private milk: CheapMilkSteamer,
      private sugar: AutomaticSugarMixer,
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milk.makeMilk(this.sugar.addSugar(coffee));
    }
  }
}
