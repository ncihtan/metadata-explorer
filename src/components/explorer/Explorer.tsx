import React from "react";
import { Grid } from "@material-ui/core";
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

const Explorer: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify="center" wrap="nowrap">
      <Grid item className={classes.left}>
        <Grid container spacing={2} alignItems="center" direction="column">
          <Grid item>
            <ParticipantCard />
          </Grid>
          <Grid item>
            <TimepointCard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.right}>
        <MetadataCard />
      </Grid>
    </Grid>
  );
};

export default Explorer;
