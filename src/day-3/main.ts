import * as fs from 'fs';
import * as readline from 'readline';

import { NumberLocator } from './number-locator';

async function main() {
  const filestream = fs.createReadStream('input.txt');
  const linestream = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity
  });

  const lines: string[] = [];
  const locators: NumberLocator[] = [];
  for await (const line of linestream) {
    lines.push(line);   
  }
  
  for (let i = 0; i < lines.length; i+=1) {
    locators.push(...parseLine(lines[i], i));
  }

  const filteredNumberLocator: NumberLocator[] = locators.filter(locator => hasAdjacentSymbol(locator, lines));
  let sumOfNumbers: number = 0;
  filteredNumberLocator.forEach((locator) => sumOfNumbers += locator.number);

  console.log('sum of numbers:' + sumOfNumbers);
}

function parseLine(line: string, lineIndex: number): NumberLocator[] {
  const numberlocators: NumberLocator[] = [];
  let digitstring: string = '';
  let startpos: number = 0;

  for (let i = 0; i < line.length; i+=1) {
    const char: string = line.substr(i, 1);

    if(!isNaN(+char)) {
      if (digitstring.length <= 0) {
        startpos = i;
      }
      digitstring += char;
    } else {
      if (digitstring.length > 0) {
        numberlocators.push({
          number: +digitstring,
          line: lineIndex,
          start: startpos,
          length: digitstring.length
        });
      }
      startpos = 0;
      digitstring = '';
    }
  }

  return numberlocators;
}

function hasAdjacentSymbol(locator: NumberLocator, lines: string[]): boolean {
  // Check row above
  if (locator.line > 0) {
    let line: string = lines[locator.line - 1];
    if (adjacentRowHasSymbol(line, locator)) {
      return true;
    }
  }
  // Check row below
  if (locator.line + 1 < lines.length) {
    let line: string = lines[locator.line + 1];
    if (adjacentRowHasSymbol(line, locator)) {
      return true;
    }
  }
  // Check same row
  let line: string = lines[locator.line];
  if (locator.start > 0) {
    if (characterIsSymbol(line[locator.start-1])) {
      return true;
    }
  }
  if ((locator.start + locator.length + 1) < line.length) {
    if (characterIsSymbol(line[locator.start + locator.length + 1])) {
      return true;
    }
  }

  return false;
}

function adjacentRowHasSymbol(line: string, locator: NumberLocator): boolean {
  let pos: number = locator.start - 1;
    
  while(pos <= (locator.start + locator.length + 1)) {
    if (pos >= 0 && pos <= line.length -1) {
      if (characterIsSymbol(line[pos])) {
        return true;
      }
    }
    pos += 1;
  }
  return false;
}

function characterIsSymbol(char: string): boolean {
  return isNaN(+char) && char !== '.';
}

main();
