{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // public: 어디서든 접근 가능 (기본값)
  // private: 외부에서 접근 불가
  // protected: 외부에서는 접근할 수 없지만, 해당 클래스를 상속받은 자식 클래스에서는 접근 가능
  class CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    /* 
      💡 객체를 생성하는 static 메소드를 별도로 제공하는 것은 
      기본 constructor를 통한 객체 생성은 막고자하는 의도일 것. 
      --> constructor 메소드를 private으로 만들어서, 항상 static 메소드만 사용할 수 있도록 권장하기 
    */
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    // 외부에서 함수를 통해 커피콩 채워넣기(직접 접근X)
    fillCoffeeBeans(beans: number) {
      // 전달받은 인자값 유효성 체크: 안정성 up!
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans = beans;
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

  // const maker = new CoffeeMaker(32);
  const maker = CoffeeMaker.makeMachine(32);

  // 외부에서 내부 state에 유효하지 않은 값을 설정할 수 없도록 정보 은닉 즉, 캡슐화를 해야 함
  // maker.coffeeBeans = -34; // invalid

  // private으로 설정한 값은 외부에서 접근할 수 없음
  // CoffeeMaker.BEANS_GRAMM_PER_SHOT;

  maker.fillCoffeeBeans(32);

  // ⚡⚡⚡ Getter, Setter ⚡⚡⚡
  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    private internalAge = 4;
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      if (num < 0) {
        // setter를 이용해서 내부 값을 설정하면 유효성 체크 가능
      }
      this.internalAge = num;
    }

    // 파라미터에 접근제어자를 설정(public도 가능)하면
    // 위에서 일일이 멤버변수를 선언하지 않아도 됨
    constructor(private firstName: string, private lastName: string) {}
  }

  const user = new User('Steve', 'Jobs');
  console.log(user.fullName); // getter 함수이지만 멤버변수에 접근하듯 사용

  // user.internalAge;
  console.log(user.age); // getter
  user.age = 10; // setter
  console.log(user.age);
}
