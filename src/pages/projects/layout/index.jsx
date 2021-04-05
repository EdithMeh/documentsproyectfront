import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {useStyles} from "../../../components/styled/UserStyled";
import SimpleCard from "../components/card";
import {ProjectsData} from "../context/projectContext";

export function ProjectsContainer(props) {
    const classes = useStyles();

    const {projects} = ProjectsData();

    return (
        <>
            <Toolbar className={classes.toolbarHeader}>
                <Button
                    onClick={() => console.log('open new')}
                    variant="contained"
                    className={`${classes.buttonAdd} button-gradient-primary`}
                    startIcon={<AddIcon/>}
                >
                    Adicionar Nuevo
                </Button>
            </Toolbar>
            <Grid
                container
                spacing={4}
                className={classes.gridContainer}
                justify="center"
            >
                {projects.map((project) => (
                    <Grid key={project.id} item xs={12} sm={6} md={4}>
                        <SimpleCard key={project.id} value={project}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
