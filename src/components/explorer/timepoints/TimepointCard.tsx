import React from "react";
import { Typography } from "@material-ui/core";
import TimepointList from "./TimepointList";
import { useExplorerContext } from "../ExplorerPage";
import MultipartCard from "../MultipartCard";
import SpecimenTree from "./SpecimenTree";
import { useHTANMetadataExplorerStore } from "../../../data/store";

const TimepointCard: React.FC = () => {
  const { store } = useHTANMetadataExplorerStore();
  const { sheets } = useExplorerContext();

  return (
    <MultipartCard
      dividers
      sections={[
        {
          header: "Timepoints",
          body: <TimepointList specimenTree={sheets.specimenTree} />
        },
        {
          header: "Biospecimens",
          body: store.selectedTimepoint ? (
            <SpecimenTree
              treeRoots={sheets.specimenTree[store.selectedTimepoint]}
            />
          ) : (
            <Typography color="textSecondary">Select a timepoint</Typography>
          )
        }
      ]}
    />
  );
};

export default TimepointCard;
