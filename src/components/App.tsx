import React from "react";
import { HTANMetadataExplorerStoreProvider } from "../data/store";
import { Grid } from "@material-ui/core";
import TopBar from "./top-bar/TopBar";
import ExplorerPage from "./explorer/ExplorerPage";

const App: React.FC = () => {
  return (
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
  );
};

export default App;
