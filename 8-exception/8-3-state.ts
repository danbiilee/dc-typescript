{
  // 세부적인 에러 상태(예상 가능 에러)
  type SuccessState = {
    result: 'success';
  };
  type NetworkErrorState = {
    result: 'fail';
    reason: 'offline' | 'down' | 'timeout';
  };
  type ResultState = SuccessState | NetworkErrorState;

  class NetworkClient {
    // error를 던지지 않고, state 값을 리턴한다.
    tryConnect(): ResultState {}
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      this.client.tryConnect();
      // ...login
    }
  }

  class App {
    constructor(private userService: UserService) {}

    run() {
      this.userService.login();

      /* 
        error는 any 타입이므로 세부 타입 정보가 날라간다. 즉, instanceOf를 사용할 수 없다. 
        ---> exception은 정말정말 예상할 수 없는 에러일 때 사용하고,
        예상가능한 에러는 Error State를 통해 잡는다. 
      */

      // try {
      //   this.userService.login();
      // } catch (error) {
      //   if (error instanceof OfflineError) {
      //   }
      // }
    }
  }

  // 💡 에러 처리는 어디서 해야할까?
  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();
}
