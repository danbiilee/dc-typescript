{
  /* 
    - string 타입으로 제한되어있는 스택을 제네릭을 통해 타입 확장하기 
  */
  interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  // readonly로 불변성 유지. 한 번 들어온 값이 변경되지 않도록.
  type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>; // optional = StackNode | undefined
  };

  class StackImpl<T> implements Stack<T> {
    private _size: number = 0;
    private head?: StackNode<T>;

    constructor(private capacity: number) {}

    get size() {
      return this._size;
    }

    push(value: T) {
      if (this.size === this.capacity) {
        throw new Error('Stack is full!');
      }

      // 멤버변수 선언 시 타입을 명시했기 때문에 여기선 타입 추론 가능.
      const node = { value, next: this.head };
      this.head = node;
      this._size++;
    }

    pop(): T {
      // null == undefined, null !== undefined
      if (this.head == null) {
        throw new Error('Stack is empty!');
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  // 제네릭 타입을 명시하지 않으면 변수의 타입은 StackImpl<unknown>
  const stack = new StackImpl<string>(10);
  stack.push('Ellie 1');
  stack.push('Bob 2');
  stack.push('Steve 3');
  while (stack.size !== 0) {
    console.log(stack.pop());
  }

  const stack2 = new StackImpl<number>(10);
  stack2.push(123);
  stack2.push(456);
  stack2.push(789);
  while (stack2.size !== 0) {
    console.log(stack2.pop());
  }
}
