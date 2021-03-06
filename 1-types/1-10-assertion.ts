{
  /* 
  ๐ฉ Type Assertions: ํ์ ๊ฐ์  

  ๋ถ๊ฐํผํ๊ฒ ์จ์ผํ๋ ๊ฒฝ์ฐ: 
  JSํจ์์ด๊ธฐ ๋๋ฌธ์ TS๋ ๋ฆฌํดํ์์ ์ ์ ์์ง๋ง,
  ๋ด๋ถ์ ์ผ๋ก๋ ํญ์ ํน์  ํ์์ ๊ฐ์ ๋ฆฌํดํ๋ ํจ์๊ฐ ์์ ๋
  -----> 100% ์ฅ๋ด ๊ฐ๋ฅํ  ๋!
  */
  function jsStrFunc(): any {
    return 'hello';
    // return 2; // ์ปดํ์ผ์๋ฌ X. ๋ฐํ์ ์ ์ฝ์์ undefined ์ฐํ.
  }
  const result = jsStrFunc();
  // result.length; // result์ ํ์์ any์ด๋ฏ๋ก ๋ฌธ์์ด์ api๋ฅผ ์ฌ์ฉํ  ์ ์๋ค.
  console.log((result as string).length); // casting
  console.log((<string>result).length);

  const wrong: any = 5;
  console.log((wrong as number[]).push(1)); // ๋ฐํ์ ์๋ฌ ๋ฐ์ -> ์ฑ ์ฃฝ์ ๐ฑ!

  // !: undefined, null์ด ์๋ ๊ฒ์ ๋ฌด์กฐ๊ฑด๋ฌด์กฐ๊ฑด 1000000% ํ์ ํ  ๊ฒฝ์ฐ ๋ถ์
  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers();
  //numbers.push(2); // undefined์ผ ์๋ ์๊ธฐ ๋๋ฌธ์ ๋ฐฐ์ด api ์ฌ์ฉํ๋ฉด ์ปดํ์ผ ์๋ฌ ๋ฐ์.
  numbers!.push(2);
  // const numbers = findNumbers()!; // ์ด๊ฒ๋ ๊ฐ๋ฅ

  // querySelector: ๋ฆฌํด๊ฐ์ด Element์ด๊ฑฐ๋ null์ผ ์๋ ์์.
  const button = document.querySelector('class')!;
  button.nodeValue;
}
