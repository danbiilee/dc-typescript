{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 클래스: 관련된 데이터와 함수를 묶어 어떤 모양의 객체를 만들지 정의하는 것
  class CoffeeMaker {
    // class 내부의 멤버변수를 선언할 때는 let, const 키워드를 사용하지 않는다.
    /* 
      static 키워드
      - 변수나 함수에 적용할 수 있다. 
      - 인스턴스를 생성할 때마다 각각의 객체에 상수 BEANS_GRAMM_PER_SHOT이 중복적으로 포함되어 
      메모리 낭비가 발생할 수 있다. 
      -> static 키워드를 붙여 해당 멤버 변수를 클래스 레벨로 설정한다. 
      -> 클래스와 연결이 되어 있으므로 객체마다 만들어지거나 포함되지 않는다. 
      -> static 변수는 this대신 클래스명으로 접근한다. 

      static 예제 
      Math.abs(): Math 클래스의 인스턴스를 생성하지 않아도 클래스 레벨에서 함수를 호출할 수 있는 것.
    */
    static BEANS_GRAMM_PER_SHOT: number = 7; // class level
    coffeeBeans: number = 0; // instance (object) level

    // new 생성자 함수로 인스턴스를 생성할 때 항상 호출되는 함수
    constructor(coffeeBeans: number) {
      // 멤버변수는 this로 접근해야 한다.
      this.coffeeBeans = coffeeBeans;
    }

    // 클래스 내부에 있는 어떤 속성값도 필요하지 않으므로 static을 설정할 수 있다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    makeCofffe(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMaker(21);
  const maker2 = new CoffeeMaker(32);

  // 생성자함수를 사용하지 않아도 CoffeeMaker 인스턴스를 생성할 수 있다.
  const maker3 = CoffeeMaker.makeMachine(21);
  // makeMachine 함수의 static 키워드를 제거하면 더이상 클래스 레벨이 아니라 인스턴스 레벨이 되므로
  // 이미 생성된 객체로만 접근해서 사용할 수 있다.
  // maker2.makeMachine();

  const coffee = maker.makeCofffe(2);
  console.log(maker, maker2);
  console.log(coffee);
}
