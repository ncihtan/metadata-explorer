import React from "react";
import { HTANMetadataExplorerStoreProvider } from "../data/store";
import { Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";
import TopBar from "./top-bar/TopBar";
import ExplorerPage from "./explorer/ExplorerPage";

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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <HTANMetadataExplorerStoreProvider>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TopBar />
          </Grid>
          <Grid item>
            <ExplorerPage />
          </Grid>
        </Grid>
      </HTANMetadataExplorerStoreProvider>
    </ThemeProvider>
  );
};

export default App;
