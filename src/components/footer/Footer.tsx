import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";

const Footer: React.FC = () => (
  <Container>
    <Grid container justify="center">
      <Grid item>
        <Typography color="textSecondary">
          &copy; {new Date().getFullYear()} Dana-Farber Cancer Institute
        </Typography>
      </Grid>
    </Grid>
  </Container>
);

export default Footer;
