import React from "react";
import { SpecTreeNode } from "../../../data/specTree";
import {
  List,
  ListItem,
  makeStyles,
  Grid,
  IconButton,
  Tooltip
} from "@material-ui/core";
import BiospecimenChip from "../BiospecimenChip";
import { SubdirectoryArrowRight, Add, Remove } from "@material-ui/icons";

const useStyles = makeStyles({
  node: {
    paddingTop: 2,
    paddingBottom: 2
  }
});

export interface SpecimenTreeProps {
  treeRoots: SpecTreeNode[];
}

const SpecimenTree: React.FC<SpecimenTreeProps> = props => {
  const classes = useStyles();

  return (
    <List dense disablePadding>
      {props.treeRoots.map(root => (
        <ListItem key={root.id} className={classes.node}>
          <SpecimenTreeNode node={root} />
        </ListItem>
      ))}
    </List>
  );
};

const ToggleOpen: React.FC<{ open: boolean; onClick: () => void }> = props => {
  const title = props.open ? "Hide subsamples" : "Show subsamples";

  return (
    <Tooltip title={title}>
      <IconButton size="small" onClick={props.onClick}>
        {props.open ? <Remove /> : <Add />}
      </IconButton>
    </Tooltip>
  );
};

const SpecimenTreeNode: React.FC<{ node: SpecTreeNode; icon?: boolean }> = ({
  node,
  icon
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <List dense disablePadding>
        <Grid container>
          {icon && (
            <Grid item>
              <SubdirectoryArrowRight />
            </Grid>
          )}
          <Grid item>
            <Grid container className={classes.node} alignItems="center">
              <Grid item>
                <BiospecimenChip id={node.id} />
              </Grid>
              {node.children && <ToggleOpen open={open} onClick={toggleOpen} />}
            </Grid>
            {node.children &&
              open &&
              node.children.map(child => (
                <ListItem key={child.id} className={classes.node}>
                  <SpecimenTreeNode node={child} icon={true} />
                </ListItem>
              ))}
          </Grid>
        </Grid>
      </List>
    </>
  );
};

export default SpecimenTree;
