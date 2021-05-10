import React, {useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import {useStyles} from "../../../components/styled/UserStyled";
import SimpleCard from "../components/card";
import {ProjectsActions, ProjectsData} from "../context/projectContext";
import {STATE_OPTIONS} from "../../../helpers/selects";
import {SimpleSelect} from "../../../components/select";
import {BUTTON_ADD, DEFAULT_STATE} from "../../../helpers/constants";
import {PrimaryButton} from "../../../components/primaryButton";
import {Container} from "@material-ui/core";
import {ProjectModal} from "../modals";
import {navigate} from "@reach/router";

export function ProjectsContainer() {
    const classes = useStyles();
    const [select, setSelect] = useState(DEFAULT_STATE);
    const [openModal, setOpenModal] = useState(false);
    const {projects} = ProjectsData();
    const actions = ProjectsActions();

    function changeFilter(state) {
        setSelect(state);
        actions.onLoad(state);
    }

    function showModal() {
        setOpenModal(true);
    }

    function closeModal() {
        setOpenModal(false);
    }

    function add(value) {
        actions.addProject(value);
    }

    function information(value){
        navigate(`/proyectos/${value.name}`, { state: { value: value } });
    }

    return (
        <>
            <Toolbar className={classes.toolbarHeader}>
                <PrimaryButton onClick={showModal} value={BUTTON_ADD}/>
                <SimpleSelect values={STATE_OPTIONS} select={select} onChange={changeFilter}/>
            </Toolbar>
            <Container fixed className={classes.container}>
                <Grid
                    container
                    spacing={4}
                    justify="center"
                >
                    {projects.map((project) => (
                        <Grid key={project.id} item xs={12} sm={6} md={4}>
                            <SimpleCard key={project.id} value={project} information={information}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <ProjectModal
                submit={add}
                open={openModal}
                setOpen={closeModal}
                tittle={'NUEVO PROYECTO'}
            />
        </>
    );
}
