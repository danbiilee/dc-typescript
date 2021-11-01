import { Component } from "./components/component";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/notes.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";

class App {
  // page가 PageComponent일지 아닐지 모름 -> 커플링을 추상화해줌
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent); // DI
    this.page.attachTo(appRoot);

    const image = new ImageComponent("Image Title", "https://picsum.photos/600/300");
    // Page 내부적으로 PageItemComponent로 한단계 더 감싸서 추가
    this.page.addChild(image);

    const video = new VideoComponent("Video Title", "https://www.youtube.com/watch?v=U2ZF0Vmzk-Q&t=3s");
    this.page.addChild(video);

    const note = new NoteComponent("Note Title", "Note Body");
    this.page.addChild(note);

    const todo = new TodoComponent("Todo Title", "Todo Item");
    this.page.addChild(todo);
  }
}

// .document 요소가 동적으로 만들어지는 것이 아니고 이미 HTML 문서에 정의되어 있기 때문에
// 확신있게 null이 아니라고 Type Aseertion 사용
new App(document.querySelector(".document")! as HTMLElement);
