import React, {useEffect, useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import {LoaderBlock} from "../../components/styled/LoaderBlock";
import {HEADER, URL} from "../../config/settings";
import {useStyles} from "../../components/styled/UserStyled";
import {ToastsStore} from "react-toasts";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import {Layout} from "../../components/layout";
import {DEFAULT_STATE} from "../../helpers/constants";
import {STATE_OPTIONS} from "../../helpers/selects";
import {SimpleSelect} from "../../components/select";

export function Resources(props) {
    const [blockLoader, setBlockLoader] = useState(false);
    const [select, setSelect] = useState(DEFAULT_STATE);
    const {path} = props;
    /**
     * Handle => Close modal
     */
    const handleClose = () => {
        setOpen(false);
        setMsgError({
            resource: "",
            description: "",
            state: "",
            path: "",
            icon: "",
        });
        setResource({
            resource: "",
            description: "",
            state: "",
            path: "",
            icon: "",
        });
    };
    const [resource, setResource] = useState({
        resource: "",
        description: "",
        state: "",
        path: "",
        icon: "",
    });

    const [msgError, setMsgError] = useState({
        resource: "",
        description: "",
        state: "",
        path: "",
        icon: "",
    });
    // Table content
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const classes = useStyles();
    // const [listState, setListState] = React.useState("");
    const formValidate = (msgError, ...data) => {
        let valid = true;
        console.log(msgError, "msgError");
        Object.values(msgError).forEach((val) => {
            val.length > 0 && (valid = false);
        });
        Object.values(data).forEach((val) => {
            val === "" && (valid = false);
        });
        return valid;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        // setListState(e.target.value);
        let errors = msgError;
        switch (name) {
            case "resource":
                errors.resource = value === "" ? "Este campo es requerido" : "";
                break;
            case "description":
                errors.description = value === "" ? "Este campo es requerido" : "";
                break;
            case "icon":
                errors.icon = value === "" ? "Este campo es requerido" : "";
                break;
            case "path":
                errors.path = value === "" ? "Este campo es requerido" : "";
                break;
            default:
                break;
        }
        setResource((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const columns = [
        {
            id: "resource",
            label: "Recurso",
            minWidth: 140,
        },
        {
            id: "description",
            label: "Descripción",
            minWidth: 140,
        },
        {
            id: "path",
            label: "Path",
            minWidth: 140,
        },
        {
            id: "icon",
            label: "Icono",
            minWidth: 140,
        },
        {
            id: "actions",
            label: "Acciones",
            minWidth: 140,
        },
    ];
    const [name, setName] = useState("Composed TextField");

    const [stateResource, setStateResource] = useState([]);

    function handleGetResource(state) {
        setBlockLoader(true);
        axios
            .get(`${URL}resource?state=${state}`, HEADER)
            .then((dataRole) => {
                const {data} = dataRole;
                setStateResource(data);
                setBlockLoader(false);
            })
            .catch((error) => {
                setBlockLoader(false);
                ToastsStore.error("Ocurrio un error al obtener los usuarios");
            });
    };

    function changeFilter(state) {
        setSelect(state);
        handleGetResource(state);
    }

    /**
     * Handle ==> Delete user by id
     */
    const handleDeleteResource = (position) => {
        setBlockLoader(true);
        axios
            .put(`${URL}resource/delete/${position}`, {}, HEADER)
            .then((response) => {
                handleGetResource(DEFAULT_STATE);
                ToastsStore.success("Eliminado correctamente");
            })
            .catch((error) => {
                console.log(error, "eROROR AL ELIMINAR");
            });
    };
    const [openResource, setOpenResource] = useState(false);
    const [idRol, setIdRol] = useState();

    useEffect(() => {
        handleGetResource(DEFAULT_STATE);
    }, []);

    // FOR MODAL
    const [open, setOpen] = useState(false);

    const [positionRow, setPositionRow] = useState();
    const [typeModal, setTypeModal] = useState("");
    const handleOpenModal = (item, position, type) => {
        if (type === "new") {
            setOpen(true);
            setTypeModal(type);
        } else {
            setResource(item);
            setPositionRow(position);
            setOpen(true);
            setTypeModal(type);
        }
    };

    const handleAddUser = (e) => {
        setBlockLoader(true);
        e.preventDefault();
        if (
            resource.resource === "" ||
            resource.icon === "" ||
            resource.path === "" ||
            resource.description === ""
        ) {
            ToastsStore.error("Completa el formulario");
        } else {
            if (formValidate(msgError, resource)) {
                axios
                    .post(`${URL}resource`, resource, HEADER)
                    .then((response) => {
                        handleClose();
                        handleGetResource(DEFAULT_STATE);
                        ToastsStore.success("Recurso agregado correctamente");
                        setBlockLoader(false);
                    })
                    .catch((response) => {
                        setBlockLoader(false);
                    });
            } else {
                setBlockLoader(false);
                ToastsStore.error("Completa los campos requeridos");
            }
        }
    };
    const handleEditRol = (e) => {
        setBlockLoader(true);
        e.preventDefault();
        if (
            resource.resource === "" ||
            resource.icon === "" ||
            resource.path === "" ||
            resource.description === ""
        ) {
            ToastsStore.error("Completa el formulario");
            setBlockLoader(false);
        } else {
            if (formValidate(msgError, resource)) {
                axios
                    .put(
                        `${URL}resource/${positionRow}`,
                        {
                            description: resource.description,
                            icon: resource.icon,
                            path: resource.path,
                            resource: resource.resource,
                            state: resource.state,
                        },
                        HEADER
                    )
                    .then(() => {
                        handleClose();
                        handleGetResource(DEFAULT_STATE);
                        ToastsStore.success("Guardado correctamente");
                        setBlockLoader(false);
                    })
                    .catch((error) => {
                        setBlockLoader(false);
                    });
            } else {
                setBlockLoader(false);
                ToastsStore.error("Completa los campos requeridos");
            }
        }
    };

    return (
        <>
            <Layout namePath={path}>
                <Toolbar className={classes.toolbarHeader}>
                    <Button
                        onClick={() => handleOpenModal(null, null, "new")}
                        variant="contained"
                        className={`${classes.buttonAdd} button-gradient-primary`}
                        startIcon={<AddIcon/>}
                    >
                        Adicionar Nuevo
                    </Button>
                    <SimpleSelect values={STATE_OPTIONS} select={select} onChange={changeFilter} />
                </Toolbar>
                {blockLoader ? <LoaderBlock/> : ""}
                <div>
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader size="small" aria-label="sticky dense table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                style={{minWidth: column.minWidth}}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stateResource.map((item, i) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                            <TableCell>{item.resource}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.path}</TableCell>
                                            <TableCell>{item.icon}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleOpenModal(item, item.id, "edit")}
                                                >
                                                    <EditIcon color="primary"/>
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteResource(item.id)}
                                                >
                                                    <DeleteIcon color="primary"/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={stateResource.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
                    </Paper>
                </div>
            </Layout>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 200,
                }}
            >
                <>
                    <div className={classes.paper}>
                        <h2 className={classes.modalHeader}>NUEVO USUARIO</h2>
                        <div className={classes.modalBody}>
                            {typeModal === "new" ? (
                                <form
                                    className={classes.root}
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={handleAddUser}
                                >
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.margin}>
                                                <TextField
                                                    size="small"
                                                    label="Nombre de Recurso"
                                                    name="resource"
                                                    onKeyUp={handleChange}
                                                    onBlur={handleChange}
                                                    variant="outlined"
                                                    className={msgError.resource ? "border-error" : ""}
                                                />
                                                {msgError.resource && (
                                                    <FormHelperText error>
                                                        Este campo es requerido
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.margin}>
                                                <TextField
                                                    size="small"
                                                    label="Descripción de Recurso"
                                                    name="description"
                                                    onKeyUp={handleChange}
                                                    onBlur={handleChange}
                                                    variant="outlined"
                                                    className={msgError.description ? "border-error" : ""}
                                                />
                                                {msgError.description && (
                                                    <FormHelperText error>
                                                        Este campo es requerido
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.margin}>
                                                <TextField
                                                    size="small"
                                                    label="Path"
                                                    name="path"
                                                    onKeyUp={handleChange}
                                                    onBlur={handleChange}
                                                    variant="outlined"
                                                    className={msgError.path ? "border-error" : ""}
                                                />
                                                {msgError.path && (
                                                    <FormHelperText error>
                                                        Este campo es requerido
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.margin}>
                                                <TextField
                                                    size="small"
                                                    label="Icono"
                                                    name="icon"
                                                    onKeyUp={handleChange}
                                                    onBlur={handleChange}
                                                    variant="outlined"
                                                    className={msgError.icon ? "border-error" : ""}
                                                />
                                                {msgError.icon && (
                                                    <FormHelperText error>
                                                        Este campo es requerido
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} className={classes.alignCenter}>
                                            <Button
                                                // size="small"
                                                className={`${classes.margin} button-gradient-danger u-margin-top-2`}
                                                variant="contained"
                                                color="primary"
                                                onClick={handleClose}
                                                startIcon={<CloseIcon/>}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                // size="small"
                                                className={`${classes.margin} button-gradient-primary u-margin-top-2`}
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                startIcon={<SaveIcon/>}
                                            >
                                                Guardar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            ) : (
                                <form
                                    className={classes.root}
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={handleEditRol}
                                >
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.margin}>
                                                <TextField
                                                    size="small"
                                                    label="Nombre de Recurso"
                                                    name="resource"
                                                    onKeyUp={handleChange}
                                                    onBlur={handleChange}
                                                    variant="outlined"
                                                    defaultValue={resource && resource.resource}
                                                />
                                                {msgError.resource && (
                                                    <FormHelperText error>
                                                        Este campo es requerido
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.margin}>
                                                <TextField
                                                    size="small"
                                                    label="Descripción"
                                                    name="description"
                                                    onKeyUp={handleChange}
                                                    onBlur={handleChange}
                                                    variant="outlined"
                                                    defaultValue={resource && resource.description}
                                                />
                                                {msgError.description && (
                                                    <FormHelperText error>
                                                        Este campo es requerido
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.margin}>
                                                <TextField
                                                    size="small"
                                                    label="Path"
                                                    name="path"
                                                    onKeyUp={handleChange}
                                                    onBlur={handleChange}
                                                    variant="outlined"
                                                    defaultValue={resource && resource.path}
                                                />
                                                {msgError.path && (
                                                    <FormHelperText error>
                                                        Este campo es requerido
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.margin}>
                                                <TextField
                                                    size="small"
                                                    label="Icono"
                                                    name="icon"
                                                    onKeyUp={handleChange}
                                                    onBlur={handleChange}
                                                    variant="outlined"
                                                    defaultValue={resource && resource.icon}
                                                />
                                                {msgError.icon && (
                                                    <FormHelperText error>
                                                        Este campo es requerido
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl
                                                variant="outlined"
                                                size="small"
                                                className={`${classes.formControl} u-display-block`}
                                            >
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    State
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    defaultValue={resource && resource.state}
                                                    onChange={handleChange}
                                                    label="Estado"
                                                    name="state"
                                                    className={classes.fieldWidth}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={"ACTIVO"}>Activo</MenuItem>
                                                    <MenuItem value={"BLOQUEADO"}>Bloqueado</MenuItem>
                                                    <MenuItem value={"ELIMINADO"}>Eliminado</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} className={classes.alignCenter}>
                                            <Button
                                                // size="small"
                                                className={`${classes.margin} button-gradient-danger u-margin-top-2`}
                                                variant="contained"
                                                color="primary"
                                                onClick={handleClose}
                                                startIcon={<CloseIcon/>}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                // size="small"
                                                className={`${classes.margin} button-gradient-primary u-margin-top-2`}
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                startIcon={<SaveIcon/>}
                                            >
                                                Guardar Edición
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        </div>
                    </div>
                </>
            </Modal>
        </>
    );
}
