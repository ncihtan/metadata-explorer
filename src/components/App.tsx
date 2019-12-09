import React from "react";
import { HTANMetadataExplorerStoreProvider } from "../data/store";
import {
  Grid,
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from "@material-ui/core";
import TopBar from "./top-bar/TopBar";
import ExplorerPage from "./explorer/ExplorerPage";
import Footer from "./footer/Footer";

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        boxShadow: "none",
        border: "1px solid #cfd0d0",
        borderRadius: 5
      }
    }
  }
});

const useStyles = makeStyles({
  content: {
    minHeight: "60rem"
  }
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <HTANMetadataExplorerStoreProvider>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TopBar />
          </Grid>
          <Grid item className={classes.content}>
            <ExplorerPage />
          </Grid>
          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </HTANMetadataExplorerStoreProvider>
    </ThemeProvider>
  );
};

export default App;
