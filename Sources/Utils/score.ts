import { ITurn, ITurnScores } from "@Types";
import { STORAGE_TURN_SCORE_KEY } from "./constant";
import { loadString, saveString } from "./storage";

export async function loadScores() {
  try {
    const jsonStr = await loadString(STORAGE_TURN_SCORE_KEY);
    if (typeof jsonStr === "string" && jsonStr.length) {
      const score: ITurnScores = JSON.parse(jsonStr);
      return score;
    }
  } catch (error) {
    return undefined;
  }
}

export async function saveScores(scores: ITurnScores) {
  try {
    return await saveString(STORAGE_TURN_SCORE_KEY, JSON.stringify(scores));
  } catch (error) {
    return undefined;
  }
}

export async function increaseScore(turn: ITurn) {
  try {
    const score = await loadScores();
    if (score) {
      score[turn] = (score[turn] || 0) + 1;
      return await saveScores(score);
    } else {
      const score: ITurnScores = {
        O: 0,
        X: 0,
      };
      score[turn] = 1;
      saveScores(score);
    }
  } catch (error) {
    return undefined;
  }
}
