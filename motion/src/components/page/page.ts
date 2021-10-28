import { BaseComponent, Component } from "../component.js";

// 조립가능한
export interface Composable {
  addChild(child: Component): void;
}

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);
  }

  // child의 타입은 Component Interface!!!
  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }
}
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    // 부모 클래스의 생성자 호출
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section); // li body 안에 아이템(video, todo...) attachTo
    item.attachTo(this.element, "beforeend"); // ul 안에 li를 attachTo
  }
}
