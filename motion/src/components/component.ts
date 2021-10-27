// 명세 규격해놓고 BaseComponent에서 구현
// BaseComponent를 여기저기 전달하며 의사소통 하는 건 💩
export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
}

/* 
  BaseComponent
  - Encapsulate the HTML element creation(요소 생성 과정 추상화)
  - T: HTMLElement이거나 HTMLElement를 상속받은 서브클래스라면 어떤 타입이든 받을 수 있음
*/
export class BaseComponent<T extends HTMLElement> implements Component {
  // protected: 상속받은 자식만 접근 가능
  protected readonly element: T;

  constructor(htmlString: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}
