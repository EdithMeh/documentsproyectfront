import React, {useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {useStyles} from "../../../components/styled/UserStyled";
import {STATE_OPTIONS} from "../../../helpers/selects";
import {SimpleSelect} from "../../../components/select";
import {BUTTON_ADD, DEFAULT_STATE} from "../../../helpers/constants";
import {PrimaryButton} from "../../../components/primaryButton";
import {Container} from "@material-ui/core";
import {DocumentsActions, DocumentsData} from "../context/documentContext";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import {HeaderTable} from "../../../components/tableHead";
import {COLUMNS_DOCUMENTS} from "../../../helpers/headers";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TableBody from "@material-ui/core/TableBody";
import {IconButtonTable} from "../../../components/IconButton";
import {GetApp} from "@material-ui/icons";
import {DocumentModal} from "../modal";

export function DocumentsContainer() {
    const classes = useStyles();
    const [select, setSelect] = useState(DEFAULT_STATE);
    const [openModal, setOpenModal] = useState(false);
    const {documents} = DocumentsData();
    const actions = DocumentsActions();
    const [file, setFile] = useState();

    function changeFilter(state) {
        setSelect(state);
        actions.onLoad(state);
    }

    function add(value) {
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append('document', new Blob([JSON.stringify(value)], {
            type: "application/json"
        }));
        actions.addDocument(formData);
    }

    function showModal() {
        setOpenModal(true);
    }

    function closeModal() {
        setFile(undefined);
        setOpenModal(false);
    }

    function click(value) {
        console.log(value)
    }

    function download(value) {
        console.log('ddd', value)
        actions.downloadDocument(value);
    }

    /**
     * @param {object} newFile new file validated
     */
    function handleDropAccepted(newFile) {
        setFile(newFile);
    }


    return (
        <>
            <Toolbar className={classes.toolbarHeader}>
                <PrimaryButton onClick={showModal} value={BUTTON_ADD}/>
                <SimpleSelect values={STATE_OPTIONS} select={select} onChange={changeFilter}/>
            </Toolbar>
            <Container fixed className={classes.container}>
                <TableContainer className={classes.containerTable}>
                    <Table stickyHeader size="small" aria-label="sticky dense table">
                        <HeaderTable values={COLUMNS_DOCUMENTS}/>
                        <TableBody>
                            {documents.map((item, i) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.classification}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>
                                        <IconButtonTable onClick={download} value={item.id}
                                                         icon={<GetApp color="primary"/>}/>
                                        <IconButtonTable onClick={click} value={item.id}
                                                         icon={<EditIcon color="primary"/>}/>
                                        <IconButtonTable onClick={click} value={item.id}
                                                         icon={<DeleteIcon color="primary"/>}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <DocumentModal
                submit={add}
                open={openModal}
                setOpen={closeModal}
                tittle={'NUEVO DOCUMENTO'}
                file={file}
                filesAdded={handleDropAccepted}
            />
        </>
    );
}
