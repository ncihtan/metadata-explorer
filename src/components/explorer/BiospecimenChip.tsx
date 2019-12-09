import React from "react";
import { Opacity } from "@material-ui/icons";
import ChipButton from "./ChipButton";
import { useHTANMetadataExplorerStore } from "../../data/store";

export interface BiospecimenChipProps {
  id: string;
}

const BiospecimenChip: React.FC<BiospecimenChipProps> = React.forwardRef(
  (props, ref) => {
    const { store, dispatch } = useHTANMetadataExplorerStore();

    const setBiospecimen = (id: string) =>
      dispatch({ type: "selectedBiospecimenId", payload: id });

    const df =
      store.sheets.status === "fetched" ? store.sheets.payload.df : null;

    // @ts-ignore
    const biospecimen = df ? df.at(props.id) : null;

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
