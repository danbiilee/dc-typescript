{
  const obj = {
    name: 'ellie',
  };
  obj.name; // ellie
  obj['name']; // ellie

  type Animal = {
    name: string;
    age: number;
    gender: 'male' | 'female';
  };
  type Name = Animal['name']; // string
  type Gender = Animal['gender']; // 'male' | 'female'
  // keyof: Animal 타입의 모든 키가 Uion Type으로 할당됨.
  type Keys = keyof Animal; // 'name' | 'age' | 'gender'

  const text: Name = 'hello';
  const key: Keys = 'age';

  type Person = {
    name: string;
    gender: Animal['gender'];
  };
  const person: Person = {
    name: 'ellie',
    gender: 'female',
  };
}
