import React from "react";
import { Grid, List, ListItem, Typography, Divider } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import ChipButton from "./ChipButton";
import { useHTANMetadataExplorerStore } from "../../../data/store";

export interface TimepointListProps {
  timepointMap: { [timepoint: string]: any[] };
}

const TimepointList: React.FC<TimepointListProps> = ({ timepointMap }) => {
  const { store, dispatch } = useHTANMetadataExplorerStore();

  const timepoints = Object.keys(timepointMap);

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
        <Divider light />
      </Grid>
      <Grid item>
        <List>
          {store.selectedTimepoint ? (
            timepointMap[store.selectedTimepoint].map((data: any) => {
              const biospecimenId =
                data[store.sheetsConfig.biospecimenIdColumn];
              const biospecimenType =
                data[store.sheetsConfig.biospecimenTypeColumn];
              return (
                <ListItem key={biospecimenId}>
                  <Typography>
                    {biospecimenId}, {biospecimenType}
                  </Typography>
                </ListItem>
              );
            })
          ) : (
            <Typography color="textSecondary">Select a timepoint</Typography>
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default TimepointList;
