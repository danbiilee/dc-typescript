{
  // π© Enum: κ΄λ ¨λ μμ κ°λ€μ λͺ¨μμ μ μνλ νμ

  // JavaScriptμμλ μ κ³΅λμ§ μμ
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  // Object.freeze(): readonly μ€μ 
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDAY;

  // TypeScript
  // - μ²«λ²μ§Έ κΈμλ§ λλ¬Έμλ‘ νκΈ°νλ€.
  // - κ°μ λ°λ‘ μ§μ νμ§ μμΌλ©΄, 0λΆν° μμν΄ μ°¨λ‘λλ‘ 1μ© λν΄μ§ κ°μ΄ ν λΉλλ€.
  // - μ²«λ²μ§Έ μμμ 0μ΄ μλ μ«μλ₯Ό ν λΉνλ©΄, κ·Έ κ°λΆν° μ°¨λ‘λλ‘ 1μ© λν΄μ§ κ°μ΄ ν λΉλλ€.
  // - λ¬Έμμ΄μ κ°μΌλ‘ μ§μ ν  κ²½μ° μλμΌλ‘ λͺ¨λ  κ°μ μ§μ ν΄μ€μΌ νλ€.
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

  // π© Enum νμμ μ¬μ©νλ©΄ μμ’μ μ΄μ : νμμ΄ μ ννκ² λ³΄μ₯λμ§ μλλ€.
  let day: Days = Days.Saturday;
  day = Days.Tuesday;
  day = 0; // μ§μ  μ«μλ₯Ό ν λΉν΄λ λ¬Έμ κ° μλ€.
  day = 10; // λ²μλ₯Ό λ²μ΄λ κ°μ ν λΉν΄λ μ»΄νμΌ μλ¬κ° λ°μνμ§ μλλ€.
  console.log(day);

  // -> λλΆλΆμ β¨ Union Type μΌλ‘ λμ²΄ κ°λ₯!
  type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday';
  let dayOfWeek: DaysOfWeek = 'Monday';
  // dayOfWeek = 'ellie';

  // ββ Enumμ μ¬μ©ν΄μΌ νλ κ²½μ°: λͺ¨λ°μΌ ν΄λΌμ΄μΈνΈλ₯Ό κ³ λ €ν΄μΌν  κ²½μ°
}
