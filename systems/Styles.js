import { StyleSheet } from "react-native";
import Constants from "../Constants";

const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B84A62",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
  },
  canvas: {
    backgroundColor: "#ECA400",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  board: {
    flex: undefined,
    width: (BoardSize-20),
    height: (BoardSize-20),
    backgroundColor: "#EFE6E8",
    borderRadius: 20,
    padding: 3,
    borderWidth: 2,
    borderColor: "#B84A62",
    borderStyle: "solid",
  },
  controller: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "stretch",
    alignItems: "flex-end",
    borderRadius: 20,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    margin: 10,
    textAlign: "center"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  controlContainer: {
        marginTop: 30,
        padding: 0,
        margin: 0,
    },
    controllerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    controlBtn: {
        backgroundColor: "#ECA400",
        width: 50,
        height: 50,
        borderRadius: 50
    },
    resetContainer: {
        marginTop: 30,
    },
    resetRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    resetButton: {
        padding: 10,
        margin: 20,
        backgroundColor: "#ECA400",
        borderRadius: 20,
        height: 100,
        width: 100,
    },
    resetText: {
        color: "purple",
        fontWeight: '700',
        textAlign: "center",
        fontSize: 22,
    },
});