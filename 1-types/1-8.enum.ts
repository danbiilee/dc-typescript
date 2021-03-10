{
  // 💩 Enum: 관련된 상수 값들을 모아서 정의하는 타입

  // JavaScript에서는 제공되지 않음
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  // Object.freeze(): readonly 설정
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDAY;

  // TypeScript
  // - 첫번째 글자만 대문자로 표기한다.
  // - 값을 따로 지정하지 않으면, 0부터 시작해 차례대로 1씩 더해진 값이 할당된다.
  // - 첫번째 상수에 0이 아닌 숫자를 할당하면, 그 값부터 차례대로 1씩 더해진 값이 할당된다.
  // - 문자열을 값으로 지정할 경우 수동으로 모든 값을 지정해줘야 한다.
  enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
  console.log(Days.Monday);

  // 💩 Enum 타입을 사용하면 안좋은 이유: 타입이 정확하게 보장되지 않는다.
  let day: Days = Days.Saturday;
  day = Days.Tuesday;
  day = 0; // 직접 숫자를 할당해도 문제가 없다.
  day = 10; // 범위를 벗어난 값을 할당해도 컴파일 에러가 발생하지 않는다.
  console.log(day);

  // -> 대부분은 ✨ Union Type 으로 대체 가능!
  type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday';
  let dayOfWeek: DaysOfWeek = 'Monday';
  // dayOfWeek = 'ellie';

  // ❕❗ Enum을 사용해야 했던 경우: 모바일 클라이언트를 고려해야할 경우
}
