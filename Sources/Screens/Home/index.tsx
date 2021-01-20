import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedbackBase,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "@Components/Button";
import Row from "@Components/Row";
import { ITurn, ITurnScores } from "@Types";
import { checkWinner } from "@Utils/checkWinner";
import { useImmer } from "use-immer";
import {
  DEFAULT_COL_SIZE,
  DEFAULT_ROW_SIZE,
  DEFAULT_TURNS,
  STORAGE_TURN_SCORE_KEY,
} from "@Utils/constant";
import { loadString } from "@Utils/storage";
import styles from "./Styles";
import { increaseScore, loadScores } from "@Utils/score";

interface Props {}

export default (props: Props) => {
  const defaultMatrix = new Array(DEFAULT_ROW_SIZE)
    .fill("")
    .map((row) => new Array(DEFAULT_COL_SIZE).fill(""));
  const defaultScores: ITurnScores = {
    X: 0,
    O: 0,
  };

  const [turn, setTurn] = useState<ITurn>("X");
  const [matrix, updateMatrix] = useImmer(defaultMatrix);
  const [highlightMatrix, updateHighlightMatrix] = useImmer(defaultMatrix);
  const [scores, setScores] = useState<ITurnScores>(defaultScores);
  const [winner, setWinner] = useState<ITurn | string | "XO">("");
  const gameStarted = useRef(false);

  useEffect(() => {
    loadScores().then((scores) => scores && setScores(scores));
  }, []);

  useEffect(() => {
    const result = checkWinner<ITurn>(matrix);
    if (result?.winner) {
      increaseScore(result.winner);
      const updateScores: ITurnScores = {
        ...scores,
        [result.winner]: scores[result.winner] + 1,
      };

      setScores(updateScores);
      setWinner(result.winner);

      updateHighlightMatrix((draft) => {
        result.line.forEach((item) => {
          const [row, col] = item;
          draft[row][col] = "T";
        });
      });
    }
    const flattenMatrix: Array<ITurn | string> = [];
    matrix.forEach((row) => {
      row.forEach((col) => flattenMatrix.push(col));
    });
    const isDraw =
      flattenMatrix.filter((item) => item !== "")?.length ===
      DEFAULT_COL_SIZE * DEFAULT_COL_SIZE;
    if (isDraw) {
      setWinner("XO");
    }
  }, [matrix]);

  const updateMatrixElement = useCallback(
    (row: number, col: number) =>
      updateMatrix((draft) => {
        gameStarted.current = true;
        if (draft[row][col] === "") {
          draft[row][col] = turn;
          setTurn(turn === "O" ? "X" : "O");
        }
      }),

    [turn]
  );

  const updateTurn = useCallback((value: ITurn) => setTurn(value), []);

  const resetMatrix = useCallback(() => {
    updateMatrix((draft) => defaultMatrix);
    updateHighlightMatrix((draft) => defaultMatrix);
    gameStarted.current = false;
    setWinner("");
  }, []);

  const renderDescription = () => {
    if (winner !== "") {
      return (
        <Text style={styles.turnText}>
          <Text style={styles.gameEndText}>{`The game ends`}</Text>
        </Text>
      );
    }

    return (
      <Text style={styles.turnText}>
        <Text style={styles.buttonText}>{`${turn} `}</Text>
        <Text>Turn</Text>
      </Text>
    );
  };

  const renderTopActions = () => {
    const disabled = gameStarted.current;
    return (
      <>
        <Row justifyContent="space-between" alignItems="center">
          {DEFAULT_TURNS.map((item) => {
            const isActive = item === turn;
            const style = isActive
              ? styles.buttonActive
              : styles.buttonInactive;

            return (
              <Row
                style={StyleSheet.flatten([styles.buttonContainer, style])}
                key={item}
                onPress={disabled ? undefined : () => updateTurn(item)}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text style={styles.buttonText}>{item}</Text>
                <Text style={styles.buttonText}>{scores[item]}</Text>
              </Row>
            );
          })}
        </Row>
        {renderDescription()}
      </>
    );
  };

  const renderResult = () => {
    if (winner === "XO") {
      return (
        <TouchableWithoutFeedback>
          <View style={styles.overlay}>
            <Text style={styles.winnerText}>{`${winner}`}</Text>
            <Text style={styles.winnerSubText}>DRAW</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    if (winner !== "") {
      return (
        <TouchableWithoutFeedback>
          <View style={styles.overlay}>
            <Text style={styles.winnerText}>{`${winner}`}</Text>
            <Text style={styles.winnerSubText}>WIN</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return null;
  };
  const renderMatrix = () => {
    return (
      <View style={styles.matrixContainer}>
        {matrix.map((row, i) => (
          <Row key={i}>
            {row.map((col, j) => {
              const isHighlight = highlightMatrix[i][j] !== "";
              const style = isHighlight
                ? styles.highlightText
                : styles.checkText;
              return (
                <Button
                  onPress={() => updateMatrixElement(i, j)}
                  style={styles.itemContainer}
                  key={i + j}
                  textStyle={style}
                  text={matrix[i][j]}
                />
              );
            })}
          </Row>
        ))}
        {renderResult()}
      </View>
    );
  };

  const renderBottomActions = () => {
    return (
      <Button
        textStyle={styles.restartText}
        text="RESTART GAME"
        onPress={resetMatrix}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderTopActions()}
      {renderMatrix()}
      {renderBottomActions()}
    </View>
  );
};
