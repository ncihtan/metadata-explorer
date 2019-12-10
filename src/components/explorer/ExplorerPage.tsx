import React from "react";
import SheetsImportDialog from "./SheetsImportDialog";
import { useHTANMetadataExplorerStore } from "../../data/store";
import CenteredLoader from "./CenteredLoader";
import Explorer from "./Explorer";
import { Sheets } from "../../data/sheetsClient";

export interface ExplorerContextValues {
  sheets: Sheets;
}

const ExplorerContext = React.createContext<ExplorerContextValues | null>(null);

// NOTE: this should *only* be called by children of the `Explorer` component.
// Doing otherwise may lead to a runtime error, since there is no guarantee
// ExplorerContext's value won't be null.
export const useExplorerContext = () => React.useContext(ExplorerContext)!;

const ExplorerPage: React.FC = () => {
  const { store } = useHTANMetadataExplorerStore();

  return store.sheets.status === "fetched" ? (
    <ExplorerContext.Provider value={{ sheets: store.sheets.payload }}>
      <Explorer />
    </ExplorerContext.Provider>
  ) : store.sheets.status === "will-fetch" ? (
    <CenteredLoader />
  ) : (
    <SheetsImportDialog />
  );
};

export default ExplorerPage;
