import { BaseComponent } from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
            <iframe
            class="video__iframe"
            width="560"
            height="315"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            ></iframe>
            <h3 class="page-item__title video__title"></h3>
          </section>`);

    const iframe = this.element.querySelector(".video__iframe")! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedUrl(url);

    const titleElement = this.element.querySelector(".video__title")! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  /* 
    url -> videoId -> embed
    
    example)
      - input
          https://www.youtube.com/watch?v=U2ZF0Vmzk-Q
          https://youtu.be/U2ZF0Vmzk-Q
      - output
          https://www.youtube.com/embed/U2ZF0Vmzk-Q
  */
  private convertToEmbeddedUrl(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9(-|_)]{11}))|(?:youtu.be\/([a-zA-Z0-9(-|_)]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
