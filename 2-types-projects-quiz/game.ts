/**
 * Let's make a game 🕹
 */

type Direction = 'up' | 'down' | 'left' | 'right';
type Position = {
  x: number;
  y: number;
};

const position: Position = { x: 0, y: 0 };

function move(dir: Direction) {
  switch (dir) {
    case 'up':
      position.y++;
      break; // swicth문 빠져나감
    case 'down':
      position.y--;
      break;
    case 'left':
      position.x--;
      break;
    case 'right':
      position.x++;
      break;
    default:
      throw new Error(`Unknown Direction ${dir}!`);
  }
}

console.log(position); // { x: 0, y: 0}
move('up');
console.log(position); // { x: 0, y: 1}
move('down');
console.log(position); // { x: 0, y: 0}
move('left');
console.log(position); // { x: -1, y: 0}
move('right');
console.log(position); // { x: 0, y: 0}
