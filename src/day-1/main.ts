import * as fs from 'fs';
import * as readline from 'readline';

async function main() {
  const filestream = fs.createReadStream('input.txt');
  const linestream = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity
  });
  const digits: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  let totalsum: number = 0;
  for await (const line of linestream) {
    let firstDigitIndexes: Map<number, string> = new Map<number, string>();
    let lastDigitIndexes: Map<number, string> = new Map<number, string>();

    for(const digit of digits) {
      let firstIndex: number = line.indexOf(digit);
      if (firstIndex > -1) {
        firstDigitIndexes.set(firstIndex, digit);
      }

      let lastIndex: number = line.lastIndexOf(digit);
      if (lastIndex > -1) {
        lastDigitIndexes.set(lastIndex, digit);
      }
    }

    let smallestFirstDigitIndex: number = line.length;
    let firstDigit: string = '';
    let largestLastDigitIndex: number = -1;
    let lastDigit: string = '';

    firstDigitIndexes.forEach((digit, idx) => {
      if (idx < smallestFirstDigitIndex) {
        smallestFirstDigitIndex = idx;
        firstDigit = digit;
      }
    });
    lastDigitIndexes.forEach((digit, idx) => {
      if (idx > largestLastDigitIndex) {
        largestLastDigitIndex = idx;
        lastDigit = digit;
      }
    });

    console.log(+`${translateDigitToNumber(firstDigit)}${translateDigitToNumber(lastDigit)}`);

    totalsum += +`${translateDigitToNumber(firstDigit)}${translateDigitToNumber(lastDigit)}`;

  }
  console.log('totalsum: ' + totalsum);
}

function translateDigitToNumber(digit: string): number {
  switch (digit) {
    case '0':
      return 0;
    case '1':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    case 'one':
      return 1;
    case 'two':
      return 2;
    case 'three':
      return 3;
    case 'four':
      return 4;
    case 'five':
      return 5;
    case 'six':
      return 6;
    case 'seven':
      return 7;
    case 'eight':
      return 8;
    case 'nine':
      return 9;
    default:
      throw 'Invalid digit';
  }
}

main();
