import React from "react";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import { Add, Remove } from "@material-ui/icons";
import BiospecimenChip from "../BiospecimenChip";

export interface SpecimenListProps {
  type: string;
  biospecimens: any[];
}

const SpecimenTypeList: React.FC<SpecimenListProps> = props => {
  const { store } = useHTANMetadataExplorerStore();

  const [open, setOpen] = React.useState<boolean>(false);
  const toggleOpen = () => setOpen(!open);

  const hasSelectedSpecimen =
    props.biospecimens.filter(
      bio =>
        bio[store.sheetsConfig.biospecimenIdColumn] ===
        store.selectedBiospecimenId
    ).length > 0;

  React.useEffect(() => {
    if (hasSelectedSpecimen) {
      setOpen(true);
    }
  }, [hasSelectedSpecimen]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography>{props.type}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              size="small"
              disabled={hasSelectedSpecimen}
              onClick={toggleOpen}
            >
              {open ? <Remove fontSize="small" /> : <Add fontSize="small" />}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {open && (
        <Grid item>
          <Grid container spacing={1}>
            {props.biospecimens.map(bio => {
              const biospecimenId = bio[store.sheetsConfig.biospecimenIdColumn];
              return (
                <Grid item>
                  <BiospecimenChip id={biospecimenId} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SpecimenTypeList;
