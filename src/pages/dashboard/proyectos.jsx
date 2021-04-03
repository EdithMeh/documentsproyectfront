import React from "react";
import Layout from "../../components/layout/layout";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useStyles } from "../../components/styled/UserStyled";
import AddIcon from "@material-ui/icons/Add";
const Proyectos = (props) => {
  const { path } = props;
  const classes = useStyles();
  return (
    <Layout namePath={path}>
      <Toolbar className={classes.toolbarHeader}>
        <h1>Sistema de gestión de documentación de proyectos </h1>
      </Toolbar>
    </Layout>
  );
};

export default Proyectos;
