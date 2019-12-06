import React from "react";
import groupBy from "lodash/groupBy";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import { Sheets } from "../../../data/sheetsClient";
import TimepointList from "./TimepointList";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    width: "35rem"
  }
});

export interface TimepointCardProps {
  sheets: Sheets;
}

const TimepointCard: React.FC<TimepointCardProps> = ({ sheets }) => {
  const classes = useStyles();

  const { store } = useHTANMetadataExplorerStore();

  const filteredData = sheets.df
    .where(
      row =>
        row[store.sheetsConfig.participantIdColumn] ===
        store.selectedParticipantId
    )
    .toArray();

  const timepointMap = groupBy(
    filteredData,
    store.sheetsConfig.timepointColumn
  );

  return (
    <Card className={classes.root}>
      <CardHeader title={"Timepoints"}></CardHeader>
      <CardContent>
        <TimepointList timepointMap={timepointMap} />
      </CardContent>
    </Card>
  );
};

export default TimepointCard;
