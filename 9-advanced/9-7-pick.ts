{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  /* 
    ✨Pick: 기존 타입에서 원하는 속성만 뽑아 제한적인 타입을 만들 때 사용
    ---> 전달한 K를 순회
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };
  */
  type VideoMetadata = Pick<Video, 'id' | 'title'>;

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://...',
      data: 'byte-data...',
    };
  }

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id,
      title: 'title',
    };
  }
}
