{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 타입 추론
  // 상수에 곧바로 원시값을 명시해주는 경우 타입 생략 가능
  const BEANS_GRAMM_PER_SHOT = 7;

  let coffeeBeans: number = 0;
  function makeCoffee(shots: number): CoffeeCup {
    if (coffeeBeans < shots * BEANS_GRAMM_PER_SHOT) {
      throw new Error('Not enough coffee beans!');
    }
    // 사용한 커피콩 그램 수 빼주기
    coffeeBeans -= shots * BEANS_GRAMM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }

  // 커피콩 충전
  coffeeBeans += 3 * BEANS_GRAMM_PER_SHOT;
  const coffee = makeCoffee(2);
  console.log(coffee);
}
