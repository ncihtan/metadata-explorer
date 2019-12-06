import React from "react";
import { Grid } from "@material-ui/core";
import SheetsInfoChip from "./SheetsInfoChip";
import Refresher from "./Refresher";

const SettingsGroup: React.FC = () => {
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <SheetsInfoChip />
      </Grid>
      <Grid item>
        <Refresher />
      </Grid>
    </Grid>
  );
};

export default SettingsGroup;
