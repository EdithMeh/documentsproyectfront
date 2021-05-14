import React, {useState} from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import {useStyles} from "../../../components/styled/UserStyled";
import {List} from 'semantic-ui-react'
import {MemberItem} from "../components/memberItem";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

/**
 * Header for tables
 *
 * @returns {object} JSX.Element page tags
 */
export function MembersModal(props) {
    const {submit, open, setOpen, tittle, members, changeRole} = props;
    const [projectEdit, setProject] = useState({});
    const classes = useStyles();
    const [error, setError] = useState(true);
    console.log("members  ", members);

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
                        <List divided verticalAlign='middle'>
                            {members.map((member, index) => (
                                <MemberItem key={index} member={member} onChange={changeRole} />
                            ))}
                        </List>
                        <Grid item xs={12} className={classes.alignCenter}>
                            <Button
                                className={`${classes.margin} button-gradient-danger u-margin-top-2`}
                                variant="contained"
                                color="primary"
                                onClick={close}
                                startIcon={<CloseIcon/>}
                            >
                                Cerrar
                            </Button>
                        </Grid>
                    </div>
                </div>
            </>
        </Modal>
    );
}
