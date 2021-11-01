import { BaseComponent, Component } from "../component.js";

// 전달받은 자식 컴포넌트를 자기 안에 추가하기 위한 명세
// PageItemComponent, PageComponent에서 공통으로 쓰임 -> 클래스 간에 인터페이스를 통해 대화하기! 디커플링!
export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener; // 콜백함수

  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);

    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  // child의 타입은 Component Interface!!!
  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    // 부모 클래스의 생성자 호출
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    // 리팩토링: 외부에서 받아온 생성자를 통해 다양한 타입의 PageItemComponent 컴포넌트를 만들 수 있음!
    // ex. DarkPageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer
    const item = new this.pageItemConstructor();
    item.addChild(section); // video, todo 등을 li body로 한 번 감싸기
    item.attachTo(this.element, "beforeend"); // ul 안에 감싸진 컴포넌트 li를 추가하기
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
