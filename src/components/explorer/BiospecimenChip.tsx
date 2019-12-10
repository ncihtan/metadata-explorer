import React from "react";
import { Opacity } from "@material-ui/icons";
import ChipButton from "./ChipButton";
import { useHTANMetadataExplorerStore } from "../../data/store";
import { useExplorerContext } from "./ExplorerPage";

export interface BiospecimenChipProps {
  id: string;
}

const BiospecimenChip: React.FC<BiospecimenChipProps> = React.forwardRef(
  (props, ref) => {
    const { store, dispatch } = useHTANMetadataExplorerStore();
    const { sheets } = useExplorerContext();

    const setBiospecimen = (id: string) =>
      dispatch({ type: "selectedBiospecimenId", payload: id });

    // @ts-ignore
    const biospecimen = sheets.df.at(props.id);

    const label =
      props.id +
      (biospecimen
        ? ` (${biospecimen[store.sheetsConfig.biospecimenTypeColumn]})`
        : "");

    return (
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        <ChipButton
          avatar={<Opacity />}
          label={label}
          selected={props.id === store.selectedBiospecimenId}
          onClick={() => setBiospecimen(props.id)}
        />
      </div>
    );
  }
);

export default BiospecimenChip;
