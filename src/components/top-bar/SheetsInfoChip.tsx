import React from "react";
import { Chip, Tooltip } from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../data/store";

const SheetsInfoChip: React.FC = () => {
  const { store, dispatch } = useHTANMetadataExplorerStore();

  const handleDelete = () => {
    dispatch({ type: "sheetsUrl", payload: undefined });
  };

  return store.sheets.status === "fetched" ? (
    <Tooltip title="Clear imported metadata">
      <Chip
        color="primary"
        variant="outlined"
        label={store.sheets.payload.title}
        onDelete={handleDelete}
      />
    </Tooltip>
  ) : store.sheets.status === "will-fetch" ? (
    <Chip label={"Loading metadata..."} variant="outlined" />
  ) : (
    <Chip color="secondary" label="No metadata imported." variant="outlined" />
  );
};

export default SheetsInfoChip;
