{
  // ✨ Discriminated Union: 동일한 키의 구분할 수 있는 값을 가지고 있는 유니온 타입
  // -> 직관적인 코드 작성이 가능해진다!

  // function: login -> success, fail
  type SuccessState = {
    result: 'success'; // Discriminated key
    response: {
      body: string;
    };
  };
  type FailState = {
    result: 'fail'; // Discriminated key
    reason: string;
  };
  type LoginState = SuccessState | FailState;
  function login(): LoginState {
    return {
      result: 'success',
      response: {
        body: 'logged in!',
      },
    };
  }

  // printLoginState(state)
  // success -> 🎉body
  // fail -> 😢reason
  function printLoginState(state: LoginState) {
    // 아직은 state가 Success 타입인지 Fail 타입인지 알 수 없지만,
    // 공통적으로 result 키를 가지고 있기 때문에 곧바로 접근 가능
    if (state.result === 'success') {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😢 ${state.reason}`);
    }
  }
  printLoginState({ response: { body: 'successsss!' } });
  printLoginState({ reason: 'failllll!' });
}
