import * as fs from 'fs';
import * as readline from 'readline';

import { Game } from './game';

async function main() {
  const filestream = fs.createReadStream('input.txt');
  const linestream = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity
  });

  const games: Game[] = [];

  for await (const line of linestream) {
    games.push(parseLineToGame(line));
  }
  
  let sumOfGamePower: number = 0;
  games.forEach(game => sumOfGamePower += (game.max_red * game.max_green * game.max_blue));

  console.log('sum of game power: ' + sumOfGamePower);
}

function parseLineToGame(line: string): Game {
  const headerPart: string = line.split(':')[0];
  const valuesPart: string = line.split(':')[1];
  const gameId: number = +headerPart.split(' ')[1];
  let max_red: number = 0;
  let max_green: number = 0;
  let max_blue: number = 0;

  valuesPart.split(';').forEach((retrieval) => {
    retrieval.split(',').forEach((colorRetrieval) => {
      const parts: string[] = colorRetrieval.trim().split(' ');
      const amount: number = +parts[0];
      const color: string = parts[1];

      switch (color) {
        case 'red':
          if (amount > max_red) {
            max_red = amount;
          }
          break;
        case 'green':
          if (amount > max_green) {
            max_green = amount;
          }
          break;
        case 'blue':
          if (amount > max_blue) {
            max_blue = amount;
          }
          break;
      }
    });
  });

  return {
    id: gameId,
    max_red:  max_red,
    max_green: max_green,
    max_blue: max_blue
  };
}

main();
