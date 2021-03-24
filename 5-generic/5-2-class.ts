{
  // either: a or b
  // 제네릭 타입 임의로 지정(LEFT, RIGHT) -> 지금은 알 수 없고, 나중에 사용할 때 결정됨
  interface Either<L, R> {
    left: () => L;
    right: () => R;
  }

  class SimpleEither<L, R> implements Either<L, R> {
    constructor(private leftValue: L, private rightValue: R) {}

    left(): L {
      return this.leftValue;
    }
    right(): R {
      return this.rightValue;
    }
  }

  const either: Either<number, number> = new SimpleEither(4, 5);
  either.left(); // 4
  either.right(); // 5

  const best = new SimpleEither({ name: 'ellie' }, 'hello');
}
