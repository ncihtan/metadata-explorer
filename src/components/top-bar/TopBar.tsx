import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SettingsGroup from "./SettingsGroup";

const useStyles = makeStyles({
  title: {
    fontSize: "1.3rem"
  }
});

const TopBar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="overline" className={classes.title}>
            HTAN Metadata Explorer
          </Typography>
        </Grid>
        <Grid item>
          <SettingsGroup />
        </Grid>
      </Grid>
      <Divider variant="fullWidth" />
    </>
  );
};

export default TopBar;
