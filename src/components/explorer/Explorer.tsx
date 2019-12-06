import React from "react";
import { Grid } from "@material-ui/core";
import { Sheets } from "../../data/sheetsClient";
import ParticipantCard from "./participants/ParticipantCard";
import TimpointCard from "./timepoints/TimepointCard";

export interface ExplorerProps {
  sheets: Sheets;
}

const Explorer: React.FC<ExplorerProps> = ({ sheets }) => {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <ParticipantCard sheets={sheets} />
      </Grid>
      <Grid item>
        <TimpointCard sheets={sheets} />
      </Grid>
    </Grid>
  );
};

export default Explorer;
