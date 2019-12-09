import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { Sheets } from "../../../data/sheetsClient";
import TimepointList from "./TimepointList";

export interface TimepointCardProps {
  sheets: Sheets;
}

const TimepointCard: React.FC<TimepointCardProps> = ({ sheets }) => {
  return (
    <Card>
      <CardHeader title={"Timepoints"} />
      <CardContent>
        <TimepointList specimenTree={sheets.specimenTree} />
      </CardContent>
    </Card>
  );
};

export default TimepointCard;
