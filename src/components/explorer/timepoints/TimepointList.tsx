import React from "react";
import { Grid, List, Typography, Divider, ListItem } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import ChipButton from "./ChipButton";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import groupBy from "lodash/groupBy";
import BiospecimenList from "./BiospecimenList";

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

  const biospecimens =
    store.selectedTimepoint && timepointMap[store.selectedTimepoint];

  // Group specimens by type
  const typeMap =
    biospecimens &&
    groupBy(biospecimens, store.sheetsConfig.biospecimenTypeColumn);

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
        {typeMap ? (
          <List>
            {Object.keys(typeMap).map(t => {
              return (
                <ListItem>
                  <BiospecimenList key={t} type={t} biospecimens={typeMap[t]} />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography color="textSecondary">Select a timepoint</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default TimepointList;
