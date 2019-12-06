import React from "react";
import { useHTANMetadataExplorerStore } from "../../data/store";
import { IconButton } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

const Refresher: React.FC = () => {
  const { store, dispatch } = useHTANMetadataExplorerStore();

  const disabled = store.sheets.status !== "fetched";

  const handleRefresh = () => {
    dispatch({ type: "refresh", payload: true });
  };

  return (
    <IconButton disabled={disabled} onClick={handleRefresh}>
      <Refresh />
    </IconButton>
  );
};

export default Refresher;
