import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/notes.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent } from "./components/page/page.js";

class App {
  private readonly page: PageComponent;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );
    image.attachTo(appRoot, "beforeend");

    const video = new VideoComponent(
      "Video Title",
      "https://www.youtube.com/watch?v=U2ZF0Vmzk-Q&t=3s"
    );
    video.attachTo(appRoot, "beforeend");

    const note = new NoteComponent("Note Title", "Note Body");
    note.attachTo(appRoot, "beforeend");

    const todo = new TodoComponent("Todo Title", "Todo Item");
    todo.attachTo(appRoot, "beforeend");
  }
}

// .document 요소가 동적으로 만들어지는 것이 아니고 이미 HTML 문서에 정의되어 있기 때문에
// 확신있게 null이 아니라고 Type Aseertion 사용
new App(document.querySelector(".document")! as HTMLElement);
