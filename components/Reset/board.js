import React from "react";
import Constants from "../../Constants";
import Head from "../Head";
import Food from "../Food";
import Tail from "../Tail";
import { randomPositions } from "../Common/functions";

export default resetBoard = {
        head: {
          position: [0, 0],
          size: Constants.CELL_SIZE,
          updateFrequency: 10,
          nextMove: 10,
          xspeed: 0,
          yspeed: 0,
          renderer: <Head />,
        },
        food: {
          position: [
            randomPositions(0, Constants.GRID_SIZE - 2),
            randomPositions(0, Constants.GRID_SIZE - 2),
            randomPositions(0, Constants.GRID_SIZE - 2),
          ],
          size: Constants.CELL_SIZE,
          renderer: <Food />,
        }
      }