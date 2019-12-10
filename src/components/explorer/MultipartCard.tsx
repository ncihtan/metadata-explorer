import React from "react";
import { Card, CardContent, Grid, Divider } from "@material-ui/core";
import Header from "./Header";

export interface MultipartCardProps {
  sections: {
    header: string | React.ReactElement;
    body: React.ReactElement;
  }[];
  dividers?: boolean;
}

const MultipartCard: React.FC<MultipartCardProps> = props => {
  const lastSection = props.sections.length - 1;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} direction="column">
          {props.sections.map(({ header, body }, i) => (
            <React.Fragment key={i}>
              <Grid item>
                <Header>{header}</Header>
              </Grid>
              <Grid item>{body}</Grid>
              {i !== lastSection && props.dividers && (
                <Grid item>
                  <Divider variant="fullWidth" />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MultipartCard;
