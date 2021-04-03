import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {useStyles} from "../../components/styled/UserStyled";
import {Layout} from "../../components/layout";

export function Projects(props) {
    const {path} = props;
    const classes = useStyles();
    return (
        <Layout namePath={path}>
            <Toolbar className={classes.toolbarHeader}>
                <h1>Sistema de gestión de documentación de proyectos </h1>
            </Toolbar>
        </Layout>
    );
}
