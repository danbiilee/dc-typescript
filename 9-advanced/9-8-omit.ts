{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  /* 
    ✨ Omit: 기존 타입에서 K를 제외한 나머지 속성을 Pick! 

    type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T , K>>;
    ---> K extends keyof any: Video 타입의 키가 아닌 것도 전달 가능. 
                              Video 타입에 그 키가 있다면 제외하는 것이기 때문.

    type Exclude<T, U> = T extends U ? never : T;
    ---> U가 T안에 있다면 never 즉, 사용하지 않음.
    ---> U가 제외된 T가 리턴 

    💡 빼고자 하는 것이 더 명확하다면 Omit, 일부만 선택하는 게 더 간단하다면 Pick! 
  */
  type VideoMetadata = Omit<Video, 'url' | 'data' | 'hh'>;

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
