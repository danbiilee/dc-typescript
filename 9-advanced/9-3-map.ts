{
  type Video = {
    title: string;
    author: string;
  };

  // 💩 일일이 작성 -> 재사용성 꽝!
  // type VideoOptional = {
  //   title?: string;
  //   author?: string;
  // };
  // type VideoReadOnly = {
  //   readonly title: string;
  //   readonly author: string;
  // };

  // ✨ Map Type: 기존 타입을 다른 형태로 변환하여 재사용
  // [1, 2].map(item => item * item); // [1, 4]
  type Optional<T> = {
    /* 
      - T 타입의 키들을 순회하면서 optional로 만들어줌. 
      - 각 properties의 value 타입으로 매핑
    */
    [P in keyof T]?: T[P]; // for ... in
  };
  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type VideoOptional = Optional<Video>;
  const videoOp: VideoOptional = {};

  type Animal = {
    name: string;
    age: number;
  };
  const animal: Optional<Animal> = {
    age: 10,
  };
  animal.age = 12; // 값 변경 가능

  const video: ReadOnly<Video> = {
    title: 'hi',
    author: 'elli',
  };
  // video.title = 'hello'; // readonly

  type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  };
  const obj2: Nullable<Video> = {
    title: 'hi',
    author: null,
  };

  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };
  type Proxify<T> = {
    // 타입을 Proxy타입으로 감싸는 역할
    [P in keyof T]: Proxy<T[P]>;
  };
}
