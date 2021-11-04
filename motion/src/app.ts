import { InputDialog, MediaData, TextData } from "./components/dialog/dialog.js";
import { Component } from "./components/component.js";
import { ImageComponent } from "./components/page/item/image.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { VideoComponent } from "./components/page/item/video.js";
import { NoteComponent } from "./components/page/item/notes.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { TodoComponent } from "./components/page/item/todo.js";

/* 
  제네릭 타입을 MediaSectionInput, TextSectionInput 클래스가 아니라 인터페이스로 커플링 해주는 이유
   - 나중에 위 두개의 인스턴스 외에 다른 인스턴스를 받는 다이얼로그가 될 수도 있기 때문에
   - 확장성 up! 
*/
type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};
class App {
  // page가 PageComponent일지 아닐지 모름 -> 커플링을 추상화해줌
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent); // DI
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );

    // For Demo
    this.page.addChild(new ImageComponent("Image Title", "https://picsum.photos/600/300"));
    this.page.addChild(new VideoComponent("Video Title", "https://www.youtube.com/watch?v=U2ZF0Vmzk-Q&t=3s"));
    this.page.addChild(new NoteComponent("Note Title", "Note Body"));
    this.page.addChild(new TodoComponent("Todo Title", "Todo Item"));
  }

  // 리팩토링: 반복되는 코드는 함수로 분리, 다른 부분만 인자로 전달받아서 사용
  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new InputComponent();

      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => dialog.removeFrom(this.dialogRoot));
      dialog.setOnSubmitListener(() => {
        const section = makeSection(input);
        this.page.addChild(section);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

// .document 요소가 동적으로 만들어지는 것이 아니고 이미 HTML 문서에 정의되어 있기 때문에
// 확신있게 null이 아니라고 Type Aseertion 사용
new App(document.querySelector(".document")! as HTMLElement, document.body);
