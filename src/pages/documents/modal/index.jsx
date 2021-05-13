import React, {useEffect, useState} from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import Modal from "@material-ui/core/Modal";
import {useStyles} from "../../../components/styled/UserStyled";
import DragAndDrop from "../../../components/DragDrop";
import {Input} from "../../../components/input";
import {toBytes} from "../../../helpers/validators";

/**
 * Header for tables
 *
 * @returns {object} JSX.Element page tags
 */
export function DocumentModal(props) {
    const {
        file,
        filesAdded,
        validations, submit, open, setOpen, tittle, document
    } = props;
    const [documentEdit, setDocument] = useState({});
    const classes = useStyles();
    const [error, setError] = useState(true);

    useEffect(() => {
        let values = Object.values(documentEdit).filter(function (data) {
            return data !== undefined && data !== '';
        });
        if (documentEdit !== undefined && values.length === 3 && file) {
            setError(false);
        } else {
            setError(true);
        }
    }, [documentEdit, file]);

    /**
     * Handle event submit edit a task
     *
     * @param {object} e - event
     */
    function handleSubmit(e) {
        e.preventDefault();
        if (documentEdit !== undefined && Object.keys(documentEdit).length !== 0) {
            submit(documentEdit);
            close();
        }
    }

    function close() {
        setDocument({});
        setError(true);
        setOpen();
    }

    function handleChange(name, value) {
        setDocument((prevState) => ({
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
                                    <Input name='classification' label='Clasificación' onChange={handleChange}/>
                                </Grid>
                                <br/><br/><br/>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <Input name='description' label='Descripción' onChange={handleChange}/>
                                        <br/>
                                        <DragAndDrop
                                            accept='.PDF, .XLSX, .DOCX, .XD'
                                            maxLength={toBytes(5)}
                                            validations={validations}
                                            setFilesAdded={filesAdded}
                                            file={file}
                                        />
                                    </FormControl>
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
