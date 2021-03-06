{
  // Array
  const fruits: string[] = ['๐', '๐'];
  const scores: Array<number> = [1, 3, 4]; // ์ ๋ค๋ฆญ!

  // readonly: ๊ฐ์ ๋ถ๋ณ์ฑ ๋ณด์ฅ. ๊ฐ์ ๋ณ๊ฒฝํ  ์ ์๋ค.
  // ์ ๋ค๋ฆญ์ผ๋ก ํ์์ด ์ง์ ๋ ๊ฒฝ์ฐ readonly๋ฅผ ์ฌ์ฉํ  ์ ์๋ค.
  function printArray(fruits: readonly string[]) {
    // fruits.push();
  }

  // Tuple: ์๋ก ๋ค๋ฅธ ํ์์ ๊ฐ์ ๊ฐ๋ ๋ฐฐ์ด
  // -> โจ interface, type alias, class ๋ก ๋์ฒดํ  ์ ์๋์ง ๊ณ ๋ฏผ ํ ์ฌ์ฉํ๊ธฐ!
  // Tuple์ ์ฌ์ฉํ๋ ์ข์ ์: ๋ฆฌ์กํธ์ useState()
  let student: [string, number];
  student = ['name', 23];
  student[0]; // name
  student[1]; // 23
  const [name, age] = student; // ๊ตฌ์กฐ ๋ถํด ํ ๋น๋ก ๊ฐ๋์ฑ up!
}
