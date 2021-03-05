{
  // JavaScript
  // old: var 💩
  // es6: let, const
  // Types
  // Primitive: number, bigint, string, symbol, boolean, null, undefined
  // Object: function, array, ...

  // TypeScript Types
  // number
  const num: number = -0.1;

  // string
  const str: string = 'hello';

  // boolean
  const bool: boolean = false;

  // undefined
  let name: undefined; // 💩 이후에도 undefined 값만 저장할 수 있음
  let age: number | undefined;
  age = undefined;
  age = 10;
  function find(): number | undefined {
    return undefined;
  }

  // null
  // 보통 null보다는 아직 값이 결정되지 않은 상태인 undefined를 사용한다.
  // null은 명시적으로 값이 없다는 걸 나타낼 때 사용한다.
  let person: null; // 💩
  let person2: string | null;

  // 💩 unknown : 어떤 타입이 들어올지 알 수 없을 때(라이브러리 쓰는 경우 등)
  let notSure: unknown = 0;
  notSure = 'ha';
  notSure = true;

  // 💩 any: 어떤 것이든 다 담을 수 있는 타입
  let anything: any = 0;
  anything = 'ha';

  // void: 빈 값을 리턴하는 함수 타입 (생략 가능)
  function print(): void {
    console.log('hello');
    return; // 생략 가능
  }
  let unusable: void = undefined; // 💩 변수에 void를 선언하면 undefined만 할당 가능하다.

  // never: 아무것도 리턴하지 않는 함수 타입
  function throwError(message: string): never {
    // message -> server(log)
    throw new Error(message);
    // while(true) {

    // }
  }
  let neverEnding: never; // 💩

  // 💩 object: 원시 타입 외에 전부 담길 수 있기 때문에 똥! 타입은 좀 더 디테일하게 설정하자.
  let obj: object;
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: 'ellie' });
  acceptSomeObject([1, 4]);
}
