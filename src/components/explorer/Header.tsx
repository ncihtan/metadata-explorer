import React from "react";
import { Typography } from "@material-ui/core";

const Header: React.FC = ({ children }) => {
  return <Typography variant="h6">{children}</Typography>;
};

export default Header;
