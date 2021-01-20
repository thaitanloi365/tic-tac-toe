import React, { useMemo } from "react";
import {
  View,
  ViewProps,
  StyleSheet,
  TouchableOpacity,
  FlexAlignType,
} from "react-native";
import styles from "./Styles";

interface Props extends ViewProps {
  children: JSX.Element | JSX.Element[];

  onPress?: () => void;

  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";

  alignItems?: FlexAlignType;
}

export default (props: Props) => {
  const {
    style: overrideStyle,
    onPress,
    justifyContent,
    alignItems,
    children,
    ...rest
  } = props;

  const style = useMemo(
    () =>
      StyleSheet.flatten([
        styles.row,
        overrideStyle,
        justifyContent && { justifyContent },
        alignItems && { alignItems },
      ]),
    [overrideStyle, justifyContent, alignItems]
  );

  if (typeof onPress === "function") {
    return (
      <TouchableOpacity onPress={onPress} style={style} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
};
