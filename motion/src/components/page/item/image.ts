import { BaseComponent } from "../../component.js";

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="image">
            <div class="image__holder"><img alt="" class="image__thumbnail"></div>
            <h2 class="page-item__title image__title"></h2>
          </section>`);

    // innerHTML에서 곧바로 사용자 입력값을 전달하는 것은 위험
    const imageElement = this.element.querySelector(".image__thumbnail")! as HTMLImageElement; // Type Assertion
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(".image__title")! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}
