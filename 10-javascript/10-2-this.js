{
  console.log(this); // window(global object)

  function simpleFunc() {
    // ✨ this에는 메서드를 호출한 객체가 바인딩 된다.
    console.log(this);
  }

  // 전역에 선언된 함수는 전역 객체 window에 포함됨.
  // window.simpleFunc();
  simpleFunc(); // this === window

  console.clear();

  class Counter {
    count = 0;
    // 2. 화살표 함수: 선언될 당시의 this Scope를 유지
    increase = () => {
      console.log(this);
    };
  }

  const counter = new Counter();
  counter.increase(); // this === Counter

  /* 
    - counter의 메서드를 caller 변수에 할당하고 호출하면, 원래의 this 정보 counter는 사라짐.
    - let, const로 선언된 변수는 전역 객체(window)에 포함되지 않으므로 caller의 this는 어떤 객체도 가리키지 않게 됨! 
      (💩 var로 선언된 변수는 window 객체에 포함된다.)
    
    this에 Counter를 연결해주는 방법
    1. bind()으로 this를 직접 바인딩.
    2. class 내부에서 화살표 함수 사용. 
  */
  // const caller = counter.increase; // this === undefined
  const caller = counter.increase.bind(counter); // 1. this === Counter
  caller();

  class Bob {}
  const bob = new Bob();

  bob.run = counter.increase;
  bob.run(); // this === Bob
}
