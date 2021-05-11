import React, {useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {useStyles} from "../../../components/styled/UserStyled";
import {DEFAULT_STATE} from "../../../helpers/constants";
import {navigate} from "@reach/router";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack} from "@material-ui/icons";
import {BarStatus} from "../components/BarStatus";
import {STATUS_DIC} from "../helpers/dictionaryStatus";

export function IndividualContainer(props) {
    const {value} = props;
    console.log(value);
    const classes = useStyles();
    const [select, setSelect] = useState(DEFAULT_STATE);
    const [openModal, setOpenModal] = useState(false);

    function showModal() {
        setOpenModal(true);
    }

    function closeModal() {
        setOpenModal(false);
    }

    //
    // function add(value) {
    //     actions.addProject(value);
    // }

    function information(value) {
        navigate(`/proyectos/${value.name}`, {state: {value: value}});
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
            <div className={classes.footer}>
                <BarStatus value={STATUS_DIC[value.state]}/>
            </div>
        </>
    );
}
