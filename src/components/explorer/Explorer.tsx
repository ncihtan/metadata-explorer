import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Sheets } from "../../data/sheetsClient";
import ParticipantCard from "./participants/ParticipantCard";
import TimepointCard from "./timepoints/TimepointCard";
import { makeStyles } from "@material-ui/styles";
import MetadataCard from "./metadata/MetadataCard";

const useStyles = makeStyles({
  left: {
    "& .MuiCard-root": {
      width: "30rem"
    }
  },
  right: {
    "& .MuiCard-root": {
      width: "40rem"
    }
  }
});

export interface ExplorerProps {
  sheets: Sheets;
}

const Explorer: React.FC<ExplorerProps> = ({ sheets }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify="center" wrap="nowrap">
      <Grid item className={classes.left}>
        <Grid container spacing={2} alignItems="center" direction="column">
          <Grid item>
            <ParticipantCard sheets={sheets} />
          </Grid>
          <Grid item>
            <TimepointCard sheets={sheets} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.right}>
        <MetadataCard sheets={sheets} />
      </Grid>
    </Grid>
  );
};

export default Explorer;
