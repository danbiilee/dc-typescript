import { InputDialog } from "./components/dialog/dialog.js";
import { Component } from "./components/component.js";
import { ImageComponent } from "./components/page/item/image.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { VideoComponent } from "./components/page/item/video.js";
import { NoteComponent } from "./components/page/item/notes.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { TodoComponent } from "./components/page/item/todo.js";

class App {
  // page가 PageComponent일지 아닐지 모름 -> 커플링을 추상화해줌
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent); // DI
    this.page.attachTo(appRoot);

    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imageBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const mediaSection = new MediaSectionInput();

      dialog.addChild(mediaSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => dialog.removeFrom(dialogRoot));
      dialog.setOnSubmitListener(() => {
        const image = new ImageComponent(mediaSection.title, mediaSection.url);
        this.page.addChild(image);

        dialog.removeFrom(dialogRoot);
      });
    });

    const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
    videoBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const mediaSection = new MediaSectionInput();

      dialog.addChild(mediaSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => dialog.removeFrom(dialogRoot));
      dialog.setOnSubmitListener(() => {
        const video = new VideoComponent(mediaSection.title, mediaSection.url);
        this.page.addChild(video);

        dialog.removeFrom(dialogRoot);
      });
    });

    const noteBtn = document.querySelector("#new-note")! as HTMLButtonElement;
    noteBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const textSection = new TextSectionInput();

      dialog.addChild(textSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => dialog.removeFrom(dialogRoot));
      dialog.setOnSubmitListener(() => {
        const notes = new NoteComponent(textSection.title, textSection.body);
        this.page.addChild(notes);

        dialog.removeFrom(dialogRoot);
      });
    });

    const todoBtn = document.querySelector("#new-todo")! as HTMLButtonElement;
    todoBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const textSection = new TextSectionInput();

      dialog.addChild(textSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => dialog.removeFrom(dialogRoot));
      dialog.setOnSubmitListener(() => {
        const notes = new TodoComponent(textSection.title, textSection.body);
        this.page.addChild(notes);

        dialog.removeFrom(dialogRoot);
      });
    });
  }
}

// .document 요소가 동적으로 만들어지는 것이 아니고 이미 HTML 문서에 정의되어 있기 때문에
// 확신있게 null이 아니라고 Type Aseertion 사용
new App(document.querySelector(".document")! as HTMLElement, document.body);
