{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean; // optional
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // ❗ 오버 엔지니어링 X

  /* 
    ✨ Class Decoupling
    클래스 간의 직접적인 연결이 아니라, 인터페이스(명세서)를 통한 연결
  */
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  /* 
    ✨ Favor COMPOSITION over inheritance!
    Composition: 구성. 필요한 것들을 모아 조립해나가는 것.
    - 상속으로 인해 수직적인 구조가 불필요하게 깊어진다면, composition 사용하기.
    - 주입을 통해 composition 재사용 가능.
  */
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    /* 
      CoffeeMachine 클래스는 주입받은 MilkFrother와 SugarProvider 종류에 따라 기능이 결정됨
      -> 하나의 클래스로 여러 종류의 객체 생성 가능 
    */
    public constructor(
      coffeeBeans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider,
    ) {
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
      const coffee = this.extract(shots); // 샷 추출
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }

    clean() {
      console.log('cleaning the machine... 🧽');
    }
  }

  /* 
    각각 우유와 설탕을 추가하는 기능을 가진 클래스 생성
    -> 매번 로직을 중복해서 작성하지 않기!!! 
    -> 기능별 규격(인터페이스)을 따르는 클래스!!! 
  */
  // 싸구려 우유 거품기
  class CheapMilkSteamer implements MilkFrother {
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

  class FancyMilkSteamer implements MilkFrother {
    private steamMilk() {
      // ...복잡한 내부 로직
      console.log('Fancy Steaming some milk...🥛');
    }

    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class ColdMilkSteamer implements MilkFrother {
    private steamMilk() {
      // ...복잡한 내부 로직
      console.log('Cold Steaming some milk...🥛');
    }

    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // 설탕 제조기
  class CandySugarMixer implements SugarProvider {
    private getSugar() {
      // ...복잡한 내부 로직
      console.log('Getting some sugar from candy 🍬');
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

  class SugarMixer implements SugarProvider {
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

  class NoSugar implements SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  /* 
    💩 인터페이스를 통해 컴포지션을 구현했다면, 
    더이상 아래처럼 이름이 복잡한 여러 종류의 클래스들이 필요하지 않다! 
  */
  // class CaffeLatteMachine extends CoffeeMachine {
  //   /*
  //     - Dependency Injection: 필요한 것을 외부에서 주입
  //     - CheapMilkSteamer 클래스가 아니라 MilkFrother 인터페이스를 받아옴 (Decoupling)
  //   */
  //   constructor(
  //     beans: number,
  //     public readonly serialNumber: string,
  //     private milkFrother: MilkFrother,
  //   ) {
  //     super(beans);
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.milkFrother.makeMilk(coffee);
  //   }
  // }

  // class SweetCoffeeMachine extends CoffeeMachine {
  //   constructor(beans: number, private sugar: SugarProvider) {
  //     super(beans);
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.sugar.addSugar(coffee);
  //   }
  // }

  /* 
    💩 클래스와 클래스가 밀접하게 연결되어있는 것은 좋지 않다.  
    SweetCaffeLatteMachine 클래스는 CheapMilkSteamer와 CandySugarMixer 클래스와 밀접하게 엮여있음.
    추후 엮여있는 클래스들을 변경하려면 문제 발생. (예: 싸구려 -> 고급 클래스) 
    ---> ✨ 인터페이스를 통해 Class Decoupling! 
  */
  // class SweetCaffeLatteMachine extends CoffeeMachine {
  //   constructor(
  //     beans: number,
  //     private milk: MilkFrother,
  //     private sugar: SugarProvider,
  //   ) {
  //     super(beans);
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.milk.makeMilk(this.sugar.addSugar(coffee));
  //   }
  // }

  // Milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  // Sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar();

  // 클래스를 재사용하면서 여러 종류의 설탕, 우유들을 다양한 방식으로 조립해 새로운 객체 생성
  // const sweetCandyMachine = new SweetCoffeeMachine(12, candySugar);
  // const sweetMachine = new SweetCoffeeMachine(12, sugar);

  // const latteMachine = new CaffeLatteMachine(12, 'SS', cheapMilkMaker);
  // const coldLatteMachine = new CaffeLatteMachine(12, 'SS', coldMilkMaker);
  // const sweetLatteMachine = new SweetCaffeLatteMachine(
  //   12,
  //   cheapMilkMaker,
  //   candySugar,
  // );

  /* 
    👍 컴포지션을 통해 CoffeeMachine 클래스에 여러 종류의 우유와 설탕을 주입함으로써, 
    다양한 형태의 객체를 생성할 수 있게 된다.
  */
  const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, sugar);
  const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
  const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
  const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);
}
