import React from "react";
import { Container, Typography } from "@material-ui/core";
import { Sheets } from "../../data/sheetsClient";

export interface ExplorerProps {
  sheets: Sheets;
}

const Explorer: React.FC<ExplorerProps> = props => {
  return (
    <Container>
      <Typography>{JSON.stringify(props.sheets.sheets)}</Typography>
    </Container>
  );
};

export default Explorer;
