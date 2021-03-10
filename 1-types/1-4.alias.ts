{
  // Type Aliases
  type Text = string;
  type Num = number;
  type Student = {
    name: string;
    age: number;
  }; // 원시 타입 뿐만 아니라 Object 타입도 지정 가능

  const name: Text = 'ellie';
  const address: Text = 'korea';
  const student: Student = {
    name: 'ellie',
    age: 24,
  };

  // String Literal Types: 문자열을 타입으로 지정
  type Name = 'name';
  type JSON = 'json';
  type Bool = true; // 문자열 외에 다른 값도 가능

  let elliName: Name;
  // elliName = 'e';
  elliName = 'name'; // Name 타입에 지정해둔 값 'name'만 할당 가능함
  const json: JSON = 'json';
  const isCat: Bool = true;
}
