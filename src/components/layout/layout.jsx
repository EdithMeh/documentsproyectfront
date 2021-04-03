import React from "react";
import SideBar from "./sidebar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
const Layout = ({ children, namePath }) => {  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideBar title={namePath} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
export default Layout;
