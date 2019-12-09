import React from "react";
import { SpecTreeNode } from "../../../data/specTree";
import {
  List,
  ListItem,
  makeStyles,
  Typography,
  Grid
} from "@material-ui/core";
import BiospecimenChip from "../BiospecimenChip";
import { SubdirectoryArrowRight } from "@material-ui/icons";

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
  return (
    <List>
      {props.treeRoots.map(root => (
        <ListItem key={root.id}>
          <SpecimenTreeNode node={root} />
        </ListItem>
      ))}
    </List>
  );
};

const SpecimenTreeNode: React.FC<{ node: SpecTreeNode; icon?: boolean }> = ({
  node,
  icon
}) => {
  const classes = useStyles();

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
            <div className={classes.node}>
              <BiospecimenChip id={node.id} />
            </div>
            {node.children &&
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
