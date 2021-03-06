// Java: Exception
// JavaScript: Error

// RangeError: Invalid array length
// const array = new Array(100000000000000000000000000000000000000);

// Error(Exception) Handling: try -> catch -> finally
function readFile(fileName: string): string {
  if (fileName === 'not exist!π©') {
    throw new Error(`file not exist! ${fileName}`);
  }
  return 'file contents π';
}

function closeFile(fileName: string) {
  // νμΌμ μ΄μμΌλ©΄ ν­μ λ«μμΌ ν¨.
}

const fileName = 'not exist!π©';

// μλ¬κ° μ λ§μ λ§ λ°μν  μ μλ μ½λλ§ try - catchμ λ‘ κ°μΈμ€.
try {
  console.log(readFile(fileName));
} catch (e) {
  console.log(`catched!!`);
} finally {
  // μ±κ³΅, μ€ν¨ μ¬λΆμ κ΄κ³μμ΄ μ€ν/λ§λ¬΄λ¦¬λμ΄μΌ νλ μμ
  closeFile(fileName);
  console.log(`finally!!`);
}

// μ΄νλ¦¬μΌμ΄μμ΄ μ£½μ§ μμ. μμμ μλ¬λ₯Ό μ‘μ ν μ­ μ€νλ¨.
console.log('!!!!');
