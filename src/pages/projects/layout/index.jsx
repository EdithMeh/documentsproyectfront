import React, {useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {useStyles} from "../../../components/styled/UserStyled";
import SimpleCard from "../components/card";
import {ProjectsActions, ProjectsData} from "../context/projectContext";
import {STATE_OPTIONS} from "../../../helpers/selects";
import {SimpleSelect} from "../../../components/select";
import {DEFAULT_STATE} from "../../../helpers/constants";

export function ProjectsContainer(props) {
    const classes = useStyles();

    const [select, setSelect] = useState(DEFAULT_STATE);

    const {projects} = ProjectsData();
    const actions = ProjectsActions();

    function changeFilter(state) {
        setSelect(state);
        actions.onLoad(state);
    }

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
                <SimpleSelect values={STATE_OPTIONS} select={select} onChange={changeFilter} />
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
