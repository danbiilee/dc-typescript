{
  // JavaScript
  // old: var π©
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
  let name: undefined; // π© μ΄νμλ undefined κ°λ§ μ μ₯ν  μ μμ
  let age: number | undefined;
  age = undefined;
  age = 10;
  function find(): number | undefined {
    return undefined;
  }

  // null
  // λ³΄ν΅ nullλ³΄λ€λ μμ§ κ°μ΄ κ²°μ λμ§ μμ μνμΈ undefinedλ₯Ό μ¬μ©νλ€.
  // nullμ λͺμμ μΌλ‘ κ°μ΄ μλ€λ κ±Έ λνλΌ λ μ¬μ©νλ€.
  let person: null; // π©
  let person2: string | null;

  // π© unknown : μ΄λ€ νμμ΄ λ€μ΄μ¬μ§ μ μ μμ λ(λΌμ΄λΈλ¬λ¦¬ μ°λ κ²½μ° λ±)
  let notSure: unknown = 0;
  notSure = 'ha';
  notSure = true;

  // π© any: μ΄λ€ κ²μ΄λ  λ€ λ΄μ μ μλ νμ
  let anything: any = 0;
  anything = 'ha';

  // void: λΉ κ°μ λ¦¬ν΄νλ ν¨μ νμ (μλ΅ κ°λ₯)
  function print(): void {
    console.log('hello');
    return; // μλ΅ κ°λ₯
  }
  let unusable: void = undefined; // π© λ³μμ voidλ₯Ό μ μΈνλ©΄ undefinedλ§ ν λΉ κ°λ₯νλ€.

  // never: μλ¬΄κ²λ λ¦¬ν΄νμ§ μλ ν¨μ νμ
  function throwError(message: string): never {
    // message -> server(log)
    throw new Error(message);
    // while(true) {

    // }
  }
  let neverEnding: never; // π©

  // π© object: μμ νμ μΈμ μ λΆ λ΄κΈΈ μ μκΈ° λλ¬Έμ λ₯! νμμ μ’ λ λνμΌνκ² μ€μ νμ.
  let obj: object;
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: 'ellie' });
  acceptSomeObject([1, 4]);
}
