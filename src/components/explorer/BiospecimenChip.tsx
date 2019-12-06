import React from "react";
import { Opacity } from "@material-ui/icons";
import ChipButton from "./ChipButton";
import { useHTANMetadataExplorerStore } from "../../data/store";

export interface BiospecimenChipProps {
  id: string;
}

const BiospecimenChip: React.FC<BiospecimenChipProps> = props => {
  const { store, dispatch } = useHTANMetadataExplorerStore();

  const setBiospecimen = (id: string) =>
    dispatch({ type: "selectedBiospecimenId", payload: id });

  return (
    <ChipButton
      avatar={<Opacity />}
      label={props.id}
      selected={props.id === store.selectedBiospecimenId}
      onClick={() => setBiospecimen(props.id)}
    />
  );
};

export default BiospecimenChip;
