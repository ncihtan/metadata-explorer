import React from "react";
import {
  Typography,
  Grid,
  ListItem,
  ListItemIcon,
  List
} from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import BiospecimenChip from "../BiospecimenChip";
import { SubdirectoryArrowRight } from "@material-ui/icons";

export interface SpecimenListProps {
  type: string;
  biospecimens: any[];
}

const SpecimenTypeList: React.FC<SpecimenListProps> = props => {
  const { store } = useHTANMetadataExplorerStore();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>{props.type}</Typography>
      </Grid>
      <Grid item>
        <List dense>
          {props.biospecimens.map(bio => {
            const biospecimenId = bio[store.sheetsConfig.biospecimenIdColumn];
            return (
              <ListItem>
                <SubdirectoryArrowRight />
                <BiospecimenChip id={biospecimenId} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default SpecimenTypeList;
