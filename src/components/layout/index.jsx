import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {SideBar} from "../sidebar";
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

export function Layout(props) {
  const { children, namePath } = props
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
}
