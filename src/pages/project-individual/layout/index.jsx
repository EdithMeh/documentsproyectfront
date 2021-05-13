import React, {useEffect, useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {useStyles} from "../../../components/styled/UserStyled";
import {navigate} from "@reach/router";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack} from "@material-ui/icons";
import {BarStatus} from "../components/BarStatus";
import {STATUS_DIC} from "../helpers/dictionaryStatus";
import {Members} from "../components/members";
import {Grid, Header, Image, Segment} from 'semantic-ui-react'
import {ReactComponent as Empty} from "../../../assets/image/empty.svg"
import {ProjectIndividualActions, ProjectsIndividualData} from "../context/projectContext";
import {MembersModal} from "../modals";
import {BUTTON_ADD_DOCUMENT} from "../../../helpers/constants";
import {PrimaryButton} from "../../../components/primaryButton";
import {CommentsLayout} from "./CommentsLayout";

export function IndividualContainer(props) {
    const {value} = props;
    const classes = useStyles();
    const {members} = ProjectsIndividualData();
    const actions = ProjectIndividualActions();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        actions.onMembersLoad(value.id);
    }, []);

    function showModal() {
        setOpenModal(true);
    }

    function showModalDocuments() {
        // setOpenModal(true);
        console.log("add document");
    }

    function closeModal() {
        setOpenModal(false);
    }

    function changeRole(member) {
        console.log("change rol", member)
        actions.addMember({id: value.id, member: member})
    }


    function add(value) {
        console.log("addd")
        // actions.addProject(value);
    }

    return (
        <>
            <Toolbar className={classes.toolbarHeaderIndividual}>
                <IconButton
                    size='medium'
                    onClick={() =>
                        navigate('/proyectos')
                    }
                >
                    <ArrowBack fontSize='large'/>
                </IconButton>
                <h1 className={classes.text}>{value.name}</h1>
            </Toolbar>
            <Members values={members} action={showModal}/>
            <div className={classes.footer}>
                <BarStatus value={STATUS_DIC[value.state]}/>
            </div>
            <Segment placeholder>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column verticalAlign='middle'>
                        <div className={classes.alignCenter}>
                            <Empty/>
                        </div>
                        <Header textAlign='center' size='small'>Tu proyecto aún no tiene documentos cargados, inicia
                            asignandole documentos guía o
                            creando nuevos documentos</Header>
                        <div className={classes.alignCenter}>
                            <PrimaryButton onClick={showModalDocuments} value={BUTTON_ADD_DOCUMENT}/>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <CommentsLayout />
                    </Grid.Column>
                </Grid>
            </Segment>
            <MembersModal
                submit={add}
                open={openModal}
                setOpen={closeModal}
                tittle={'Miembros del proyecto'}
                members={members}
                changeRole={changeRole}
            />
        </>
    );
}
