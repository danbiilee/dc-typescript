{
  /* 
    - Stack의 규약 
    사용자들은 얼마나 다양한 Stack이 있는지 신경쓰지 않고,
    이 인터페이스만 사용하며 의사소통 할 수 있다.
    
    - 조건
    배열 API를 쓰지 않고 구현할 것 -> 단일 연결 리스트 사용
  */
  interface Stack {
    readonly size: number;
    push(value: string): void;
    pop(): string;
  }

  // readonly로 불변성 유지. 한 번 들어온 값이 변경되지 않도록.
  type StackNode = {
    readonly value: string;
    readonly next?: StackNode; // optional = StackNode | undefined
  };

  class StackImpl implements Stack {
    /* 
      곧바로 size를 readonly 하면 클래스 내부에서도 size 값을 변경하지 못함.
      - 내부에서만 사용되는 변수는 private 처리 후 getter 추가.
      - 변수명이 같은 경우 private 변수앞에 _ 붙이기 
    */
    private _size: number = 0;
    private head?: StackNode;

    constructor(private capacity: number) {}

    get size() {
      return this._size;
    }

    push(value: string) {
      if (this.size === this.capacity) {
        throw new Error('Stack is full!');
      }
      const node: StackNode = { value, next: this.head };
      this.head = node;
      this._size++;
    }

    pop(): string {
      // 유효성 검사는 사용할 때가 아니라 api 내부에서 작동되도록 할 것.
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

  const stack = new StackImpl(10);
  stack.push('Ellie 1');
  stack.push('Bob 2');
  stack.push('Steve 3');
  while (stack.size !== 0) {
    console.log(stack.pop());
  }

  stack.pop();
}
