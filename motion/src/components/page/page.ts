import { BaseComponent } from "../component.js";

export class PageComponent extends BaseComponent<HTMLUListElement> {
  constructor() {
    // 부모 클래스의 생성자 호출
    super('<ul class="page">This is PageComponent</ul>');
  }
}
