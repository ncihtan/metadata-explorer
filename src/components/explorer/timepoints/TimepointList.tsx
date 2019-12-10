import React from "react";
import { Grid } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import ChipButton from "../ChipButton";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import { Sheets } from "../../../data/sheetsClient";

export interface TimepointListProps {
  specimenTree: Sheets["specimenTree"];
}

const TimepointList: React.FC<TimepointListProps> = ({ specimenTree }) => {
  const { store, dispatch } = useHTANMetadataExplorerStore();

  const timepoints = Object.keys(specimenTree);

  const setTimepoint = React.useCallback(
    (label: string) => dispatch({ type: "selectedTimepoint", payload: label }),
    [dispatch]
  );

  // Select the first timepoint in the list on first render
  React.useEffect(() => {
    if (!store.selectedTimepoint) {
      setTimepoint(timepoints[0]);
    }
  }, [store.selectedTimepoint, timepoints, setTimepoint]);

  return (
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
  );
};

export default TimepointList;
