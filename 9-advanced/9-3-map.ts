{
  type Video = {
    title: string;
    author: string;
  };

  // ๐ฉ ์ผ์ผ์ด ์์ฑ -> ์ฌ์ฌ์ฉ์ฑ ๊ฝ!
  // type VideoOptional = {
  //   title?: string;
  //   author?: string;
  // };
  // type VideoReadOnly = {
  //   readonly title: string;
  //   readonly author: string;
  // };

  // โจ Map Type: ๊ธฐ์กด ํ์์ ๋ค๋ฅธ ํํ๋ก ๋ณํํ์ฌ ์ฌ์ฌ์ฉ
  // [1, 2].map(item => item * item); // [1, 4]
  type Optional<T> = {
    /* 
      - T ํ์์ ํค๋ค์ ์ํํ๋ฉด์ optional๋ก ๋ง๋ค์ด์ค. 
      - ๊ฐ properties์ value ํ์์ผ๋ก ๋งคํ
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
  animal.age = 12; // ๊ฐ ๋ณ๊ฒฝ ๊ฐ๋ฅ

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
    // ํ์์ Proxyํ์์ผ๋ก ๊ฐ์ธ๋ ์ญํ 
    [P in keyof T]: Proxy<T[P]>;
  };
}
