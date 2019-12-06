import React from "react";
import { ChipProps, Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "& .MuiSvgIcon-root": {
      background: "transparent"
    }
  }
});

export interface ChipButtonProps
  extends Omit<Omit<Omit<ChipProps, "color">, "clickable">, "variant"> {
  selected?: boolean;
}

const ChipButton: React.FC<ChipButtonProps> = props => {
  const classes = useStyles();

  const color = props.selected ? "primary" : "default";
  const variant = props.selected ? "default" : "outlined";

  return (
    <Chip
      {...props}
      className={classes.root}
      color={color}
      variant={variant}
      clickable
    />
  );
};

export default ChipButton;
