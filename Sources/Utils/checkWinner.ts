import { ITurn } from "@Types";
import { DEFAULT_RULES } from "./constant";

export function checkWinner<T extends string>(
  matrix: Array<Array<T>>,
  rules = DEFAULT_RULES
) {
  /**
   * Matrix indexed: 3x3
   * |0,0|0,1|0,2|
   * |1,0|1,1|1,2|
   * |2,0|2,1|2,2|
   */

  for (let i = 0; i < rules.length; i++) {
    const line = rules[i];
    let count: { [key in T | string]: number } = Object.assign({});
    line.forEach((pair) => {
      const [x, y] = pair;
      const turn = matrix[x][y];
      count[turn] = (count[turn] || 0) + 1;
    });

    const keys = Object.keys(count);
    const values = Object.values(count);
    for (let k = 0; k < keys.length; k++) {
      const key: T | string = keys[k];
      if (key !== "" && count[key] === matrix[0].length) {
        const [x, y] = line[0];
        return {
          line,
          winner: matrix[x][y],
        };
      }
    }
  }

  return null;
}
