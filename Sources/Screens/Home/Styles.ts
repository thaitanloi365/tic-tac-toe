import { Dimensions, StyleSheet } from "react-native";
import { ColorDefault } from "@Themes/colors";
import { DEFAULT_COL_SIZE } from "@Utils/constant";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 4,
  },
  matrixContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorDefault.border,
    marginHorizontal: 40,
  },
  itemContainer: {
    width: width / (DEFAULT_COL_SIZE + 1) - 40 / 2,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  buttonActive: {
    borderBottomColor: ColorDefault.primary,
  },
  buttonInactive: {
    borderBottomColor: ColorDefault.border,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorDefault.text,
  },
  turnText: {
    marginTop: 20,
    marginBottom: 16,
    fontSize: 16,
    alignSelf: "center",
  },
  restartText: {
    marginTop: 20,
    marginBottom: 16,
    fontSize: 24,
    alignSelf: "center",
    color: ColorDefault.primary,
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorDefault.background,
    display: "flex",
    flexDirection: "column",
    opacity: 0.8,
    ...StyleSheet.absoluteFillObject,
  },
  highlightText: {
    fontWeight: "bold",
    color: ColorDefault.primary,
    fontSize: 24,
  },
  checkText: {
    fontSize: 20,
  },
  gameEndText: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorDefault.primary,
  },
  winnerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: ColorDefault.primary,
  },
  winnerSubText: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
