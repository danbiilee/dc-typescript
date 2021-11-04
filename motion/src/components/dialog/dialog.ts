import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}
export interface TextData {
  readonly title: string;
  readonly body: string;
}

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;

  constructor() {
    super(`
      <dialog class="dialog">
        <div class="dialog__container">
          <button class="close">&times;</button>
          <div id="dialog__body"></div>
          <button class="dialog__submit">ADD</button>
        </div>
      </dialog>
    `);

    const closeBtn = this.element.querySelector(".close")! as HTMLElement;
    closeBtn.onclick = () => {
      // 이벤트 리스너는 외부에서 주입받아서 사용하기!
      this.closeListener && this.closeListener();
    };
    /* 
      - addEventListener: 여러 개의 리스너 등록 가능, 순서대로 실행됨
      - onclick: 등록된 리스너가 있다면 덮어씌워짐 
    */

    const submitBtn = this.element.querySelector(".dialog__submit")! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: Component) {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }
}
