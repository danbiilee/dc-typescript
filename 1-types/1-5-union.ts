{
  // Union Types: OR
  // 발생가능한 케이스들을 미리 지정한 뒤, 그 중에서 하나만 골라서 사용할 때 유용하다.
  type Direction = 'left' | 'right' | 'up' | 'down';
  function move(direction: Direction) {
    console.log(direction);
  }
  move('right');

  type TileSize = 8 | 16 | 32;
  const tile: TileSize = 16;

  // function: login -> success, fail
  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  };
  type LoginState = SuccessState | FailState;
  // function login(id: string, password: string): Promise<LoginState> {
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       response: {
  //         body: 'logged in!',
  //       },
  //     });
  //   });
  // }

  // printLoginState(state)
  // success -> 🎉body
  // fail -> 😢reason
  function printLoginState(state: LoginState) {
    // 💩 -> ✨ Discriminated Union 타입으로 대체 가능
    if ('response' in state) {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😢 ${state.reason}`);
    }
  }
  printLoginState({ response: { body: 'successsss!' } });
  printLoginState({ reason: 'failllll!' });
}
