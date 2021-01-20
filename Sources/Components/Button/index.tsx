import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
} from "react-native";

interface Props extends TouchableOpacityProps {
  text: string;
  textStyle?: StyleProp<TextStyle>;
}
export default (props: Props) => {
  const { text, textStyle, ...rest } = props;
  return (
    <TouchableOpacity {...rest}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};
