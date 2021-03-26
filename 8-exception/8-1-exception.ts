// Java: Exception
// JavaScript: Error

// RangeError: Invalid array length
// const array = new Array(100000000000000000000000000000000000000);

// Error(Exception) Handling: try -> catch -> finally
function readFile(fileName: string): string {
  if (fileName === 'not exist!💩') {
    throw new Error(`file not exist! ${fileName}`);
  }
  return 'file contents 📃';
}

function closeFile(fileName: string) {
  // 파일을 열었으면 항상 닫아야 함.
}

const fileName = 'not exist!💩';

// 에러가 정말정말 발생할 수 있는 코드만 try - catch절로 감싸줌.
try {
  console.log(readFile(fileName));
} catch (e) {
  console.log(`catched!!`);
} finally {
  // 성공, 실패 여부에 관계없이 실행/마무리되어야 하는 작업
  closeFile(fileName);
  console.log(`finally!!`);
}

// 어플리케이션이 죽지 않음. 위에서 에러를 잡은 후 쭉 실행됨.
console.log('!!!!');
