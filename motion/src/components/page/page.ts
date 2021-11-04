import { BaseComponent, Component } from "../component.js";

// 전달받은 자식 컴포넌트를 자기 안에 추가하기 위한 명세
// PageItemComponent, PageComponent에서 공통으로 쓰임 -> 클래스 간에 인터페이스를 통해 대화하기! 디커플링!
export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

/* 
  - start, stop: 드래그 되고 있는 요소의 관점
  - enter, leave: 드래그 되고 있는 요소가 위로 들어오는 요소의 관점 
*/
type DragState = "start" | "stop" | "enter" | "leave";
/* 
  target의 타입 정하기
  - 💩 PageItemComponent: 이 리스너는 해당 컴포넌트에서만 쓸 수 있게 됨 
  - 💩 Component: PageItemComponent 서브 타입을 전달하면 타입 정보가 사라지게 됨 
  - ✨ T: 안전하면서 타입 보존이 되는 제네릭 사용 
*/
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

// PageItemComponent을 대표하는 명세
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
}

// SectionContainer라는 인터페이스의 규격을 따라가는 그 어떤 클래스의 인스턴스라도 생성 가능
type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener; // 콜백함수
  private dragStateListener?: OnDragStateListener<PageItemComponent>; // 타입만 바꿔서 재사용 가능

  constructor() {
    super(`<li draggable="true" class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);

    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    this.element.addEventListener("dragstart", (event: DragEvent) => this.onDragStart(event));
    this.element.addEventListener("dragend", (event: DragEvent) => this.onDragEnd(event));
    this.element.addEventListener("dragenter", (event: DragEvent) => this.onDragEnter(event));
    this.element.addEventListener("dragleave", (event: DragEvent) => this.onDragLeave(event));
  }

  // child의 타입은 Component Interface!!!
  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container);
  }

  // event는 사용하지 않으므로 언더바 처리(혹시 사용할 수도 있으므로 남겨둠)
  onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragObservers("stop");
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
}
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    // 부모 클래스의 생성자 호출
    super('<ul class="page"></ul>');

    this.element.addEventListener("dragover", (event: DragEvent) => this.onDragOver(event));
    this.element.addEventListener("drop", (event: DragEvent) => this.onDrop(event));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log("drag Over");
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log("drop");
  }

  addChild(section: Component) {
    // 리팩토링: PageComponent와 PageItemComponent 클래스들간의 디커플링
    // 외부에서 받아온 생성자를 통해 다양한 타입의 PageItemComponent 컴포넌트를 만들 수 있음
    // ex. DarkPageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer
    const item = new this.pageItemConstructor();
    item.addChild(section); // video, todo 등을 li body로 한 번 감싸기
    item.attachTo(this.element, "beforeend"); // ul 안에 감싸진 컴포넌트 li를 추가하기
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      console.log(target, state);
    });
  }
}
