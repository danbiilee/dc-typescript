class NetworkClient {
  tryConnect(): void {
    throw new Error('no network!');
  }
}

class UserService {
  // 의존성 주입: 필요한 정보를 외부에서 받아옴.
  constructor(private client: NetworkClient) {}

  login() {
    /* 
      💩 에러가 발생하는 tryConnect를 가장 먼저 호출하는 곳이지만 
      여기서는 에러를 잡아도 할 수 있는 일이 없다. 
      ---> 에러가 발생했을 때 정말 의미있게 처리할 수 있는 게 아니라면, 
      에러를 catch 하지 않는 게 더 낫다!
    */
    this.client.tryConnect();
    // ...login
  }
}

class App {
  constructor(private userService: UserService) {}

  run() {
    try {
      this.userService.login();
    } catch (error) {
      // 👍 show dialog to user
    }
  }
}

// 💡 에러 처리는 어디서 해야할까?
const client = new NetworkClient();
const service = new UserService(client);
const app = new App(service);
app.run();
