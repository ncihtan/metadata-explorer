import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import TimepointList from "./TimepointList";
import Header from "../Header";
import { useExplorerContext } from "../ExplorerPage";

const TimepointCard: React.FC = () => {
  const { sheets } = useExplorerContext();

  return (
    <Card>
      <CardHeader title={<Header>Timepoints</Header>} />
      <CardContent>
        <TimepointList specimenTree={sheets.specimenTree} />
      </CardContent>
    </Card>
  );
};

export default TimepointCard;
