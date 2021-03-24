{
  // number로 타입 한정
  function checkNotNullBad(arg: number | null): number {
    if (arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }

  // any 타입 안정성 X
  function checkNotNullAnyBad(arg: any | null): any {
    if (arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }

  /* 
    Generic <TYPE> 
    - 어떤 타입이든지 받을 수 있음. 
    - 컴파일할 때 타입 결정됨 -> 타입 보장 

  */
  function checkNotNull<T>(arg: T | null): T {
    if (arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }

  const number = checkNotNull(123); // 이 시점에 변수의 타입이 number로 결정됨
  const bool: boolean = checkNotNull(true);
}
