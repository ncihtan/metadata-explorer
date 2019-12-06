import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import { Sheets } from "../../../data/sheetsClient";
import TimepointList from "./TimepointList";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    minWidth: "40rem"
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

  const timepointMap = filteredData.reduce((acc, row) => {
    const timepoint = row[store.sheetsConfig.timepointColumn];
    const timepointData = acc[timepoint] || [];
    return {
      ...acc,
      [timepoint]: [...timepointData, row]
    };
  }, {});

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
