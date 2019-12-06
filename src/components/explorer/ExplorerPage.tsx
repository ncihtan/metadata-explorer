import React from "react";
import SheetsImportDialog from "./SheetsImportDialog";
import { useHTANMetadataExplorerStore } from "../../data/store";
import CenteredLoader from "./CenteredLoader";
import Explorer from "./Explorer";

const ExplorerPage: React.FC = () => {
  const { store } = useHTANMetadataExplorerStore();

  return store.sheets.status === "fetched" ? (
    <Explorer sheets={store.sheets.payload} />
  ) : store.sheets.status === "will-fetch" ? (
    <CenteredLoader />
  ) : (
    <SheetsImportDialog />
  );
};

export default ExplorerPage;
