import React, {useEffect, useState} from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import Modal from "@material-ui/core/Modal";
import {useStyles} from "../../../components/styled/UserStyled";
import {Input} from "../../../components/input";

/**
 * Header for tables
 *
 * @returns {object} JSX.Element page tags
 */
export function ProjectModal(props) {
    const {submit, open, setOpen, tittle, project} = props;
    const [projectEdit, setProject] = useState({});
    const classes = useStyles();
    const [error, setError] = useState(true);

    useEffect(() => {
        let values = Object.values(projectEdit).filter(function (data) {
            return data !== undefined && data !== '';
        });
        if (projectEdit !== undefined && values.length === 4) {
            setError(false);
        } else {
            setError(true);
        }
    }, [projectEdit]);

    /**
     * Handle event submit edit a task
     *
     * @param {object} e - event
     */
    function handleSubmit(e) {
        e.preventDefault();
        if (projectEdit !== undefined && Object.keys(projectEdit).length !== 0) {
            submit(projectEdit);
            close();
        }
    }

    function close() {
        setProject({});
        setError(true);
        setOpen();
    }

    function handleChange(name, value) {
        setProject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            className={classes.modal}
            open={open}
            onClose={setOpen}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 200,
            }}
        >
            <>
                <div className={classes.paper}>
                    <h2 className={classes.modalHeader}>{tittle}</h2>
                    <div className={classes.modalBody}>
                        <form
                            className={classes.root}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Input name='name' label='Nombre' onChange={handleChange}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Input name='description' label='Descripción' onChange={handleChange}/>
                                </Grid>
                                <br/><br/><br/>
                                <Grid item xs={6}>
                                    <Input name='repository' label='Repositorio' onChange={handleChange}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Input name='type' label='Tipo' onChange={handleChange}/>
                                </Grid>
                                <Grid item xs={12} className={classes.alignCenter}>
                                    <Button
                                        className={`${classes.margin} button-gradient-danger u-margin-top-2`}
                                        variant="contained"
                                        color="primary"
                                        onClick={close}
                                        startIcon={<CloseIcon/>}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        className={`${classes.margin} ${classes.buttonAdd} u-margin-top-2`}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={error}
                                        startIcon={<SaveIcon/>}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </>
        </Modal>
    );
}
