import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import ChipButton from "../ChipButton";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import SpecimenTree from "./SpecimenTree";
import { Sheets } from "../../../data/sheetsClient";
import Header from "../Header";

export interface TimepointListProps {
  specimenTree: Sheets["specimenTree"];
}

const TimepointList: React.FC<TimepointListProps> = ({ specimenTree }) => {
  const { store, dispatch } = useHTANMetadataExplorerStore();

  const timepoints = Object.keys(specimenTree);

  const setTimepoint = (label: string) =>
    dispatch({ type: "selectedTimepoint", payload: label });

  // Select the first timepoint in the list on first render
  React.useEffect(() => {
    if (!store.selectedTimepoint) {
      setTimepoint(timepoints[0]);
    }
  }, [store.selectedTimepoint, timepoints]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Grid container wrap="nowrap" spacing={1}>
          {timepoints.map(label => (
            <Grid item key={label}>
              <ChipButton
                avatar={<AccessTime />}
                label={label}
                selected={label === store.selectedTimepoint}
                onClick={() => setTimepoint(label)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Divider light style={{ marginBottom: ".5rem" }} />
        <Header>Biospecimens</Header>
        {store.selectedTimepoint ? (
          <SpecimenTree treeRoots={specimenTree[store.selectedTimepoint]} />
        ) : (
          <Typography color="textSecondary">Select a timepoint</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default TimepointList;
