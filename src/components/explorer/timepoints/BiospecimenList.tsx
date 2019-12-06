import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import ChipButton from "./ChipButton";
import { Opacity } from "@material-ui/icons";

export interface BiospecimenListProps {
  type: string;
  biospecimens: any[];
}

const BiospecimenList: React.FC<BiospecimenListProps> = props => {
  const { store, dispatch } = useHTANMetadataExplorerStore();

  const setBiospecimen = (id: string) =>
    dispatch({ type: "selectedBiospecimenId", payload: id });

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>{props.type}</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          {props.biospecimens.map(bio => {
            const biospecimenId = bio[store.sheetsConfig.biospecimenIdColumn];
            return (
              <Grid item>
                <ChipButton
                  avatar={<Opacity />}
                  label={biospecimenId}
                  selected={biospecimenId === store.selectedBiospecimenId}
                  onClick={() => setBiospecimen(biospecimenId)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BiospecimenList;
