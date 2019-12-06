import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

const CenteredLoader: React.FC = () => {
  return (
    <Grid container justify="center" alignItems="center" spacing={3}>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default CenteredLoader;
