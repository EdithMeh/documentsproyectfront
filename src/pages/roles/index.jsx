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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import {Layout} from "../../components/layout";
import {DEFAULT_STATE} from "../../helpers/constants";
import {STATE_OPTIONS} from "../../helpers/selects";
import {SimpleSelect} from "../../components/select";

export function Roles(props) {
    const [blockLoader, setBlockLoader] = useState(false);
    const [select, setSelect] = useState(DEFAULT_STATE);
    const {path} = props;
    /**
     * Handle => Close modal
     */
    const handleClose = () => {
        setOpen(false);
        setMsgError({
            role: "",
            state: "",
        });
        setRole({
            role: "",
            state: "",
        });
    };
    const [role, setRole] = useState({
        role: "",
        state: "ACTIVO",
    });
    const [msgError, setMsgError] = useState({
        role: "",
        state: "",
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
            case "role":
                errors.role = value === "" ? "Este campo es requerido" : "";
                break;
            case "state":
                errors.state = value === "" ? "Este campo es requerido" : "";
                break;
            default:
                break;
        }
        setRole((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const columns = [
        {
            id: "role",
            label: "Role",
            minWidth: 140,
        },
        {
            id: "state",
            label: "Estado",
            minWidth: 140,
        },
        {
            id: "actions",
            label: "Acciones",
            minWidth: 140,
        },
    ];
    const [name, setName] = useState("Composed TextField");

    const [stateRol, setStateRole] = useState([]);

    function handleGetRole(state) {
        setBlockLoader(true);
        axios
            .get(`${URL}roles?state=${state}`, HEADER)
            .then((dataRole) => {
                const {data} = dataRole;
                setStateRole(data);
                setBlockLoader(false);
            })
            .catch((error) => {
                setBlockLoader(false);
                ToastsStore.error("Ocurrio un error al obtener los usuarios");
            });
    };

    function changeFilter(state) {
        setSelect(state);
        handleGetRole(state);
    }
    /**
     * Handle ==> Delete user by id
     */
    const handleDeleteRol = (position) => {
        setBlockLoader(true);
        axios
            .put(`${URL}roles/delete/${position}`, {}, HEADER)
            .then((response) => {
                handleGetRole(DEFAULT_STATE);
                ToastsStore.success("Eliminado correctamente");
            })
            .catch((error) => {
                console.log(error, "eROROR AL ELIMINAR");
            });
    };
    const [openResource, setOpenResource] = useState(false);
    const [idRol, setIdRol] = useState();

    useEffect(() => {
        handleGetRole(DEFAULT_STATE);
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
            setRole(item);
            setPositionRow(position);
            setOpen(true);
            setTypeModal(type);
        }
    };

    const handleAddUser = (e) => {
        setBlockLoader(true);
        e.preventDefault();
        if (role.role === "") {
            ToastsStore.error("Completa el formulario");
        } else {
            if (formValidate(msgError, role)) {
                axios
                    .post(`${URL}roles`, role, HEADER)
                    .then((response) => {
                        handleClose();
                        handleGetRole(DEFAULT_STATE);
                        ToastsStore.success("Rol agregado correctamente");
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
        if (role.role === "" || role.state === "") {
            ToastsStore.error("Completa el formulario");
        } else {
            if (formValidate(msgError, role)) {
                axios
                    .put(
                        `${URL}roles/${positionRow}`,
                        {
                            role: role.role,
                            state: role.state,
                        },
                        HEADER
                    )
                    .then(() => {
                        handleClose();
                        handleGetRole(DEFAULT_STATE);
                        ToastsStore.success("Guardado correctamente");
                        setBlockLoader(false);
                    })
                    .catch(() => {
                        setBlockLoader(false);
                        ToastsStore.error("Ocurrio un error editar el rol");
                    });
            } else {
                setBlockLoader(false);
                ToastsStore.error("Completa los campos requeridos");
            }
        }
    };

    /**
     * Handle to assign resource to rol
     */
    const handleCloseModalAsignResource = () => {
        setOpenResource(false);
    };
    const [idResourceRol, setIdResourceRol] = useState([]);
    const [idRolRes, setIdRolRes] = useState();
    const [stateResource, setStateResource] = useState([]);

    const handleGetResource = () => {
        axios
            .get(`${URL}resource?state=ACTIVO`, HEADER)
            .then((dataRESOURCES) => {
                const {data} = dataRESOURCES;
                setStateResource(data);
                console.log(data, "data");
            })
            .catch((error) => {
                ToastsStore.error("Ocurrio un error al obtener los usuarios");
            });
    };
    useEffect(() => {
        handleGetResource();
    }, []);
    const handleAssingResources = (itemRol, position) => {
        setIdRolRes(position);
        setOpenResource(true);
        for (let i = 0; i < stateResource.length; i++) {
            stateResource[i].checked = false;
            for (let j = 0; j < itemRol.length; j++) {
                if (stateResource[i].id === itemRol[j]) {
                    stateResource[i].checked = true;
                }
            }
        }
        setIdResourceRol(itemRol);
    };
    const handleChangeCheck = (resource) => {
        const sameId = idResourceRol.filter((item) => item === resource)[0];
        if (resource === sameId) {
            const tempRolUser = idResourceRol.filter((same) => same !== resource);
            setIdResourceRol(tempRolUser);
        } else {
            idResourceRol.push(resource);
        }
    };
    /**
     * Handle to assign role to user
     */
    const handleAssignUserRol = () => {
        setBlockLoader(true);
        axios
            .put(`${URL}roles/${idRolRes}/resources`, idResourceRol, HEADER)
            .then(() => {
                handleCloseModalAsignResource();
                handleGetRole(DEFAULT_STATE);
                ToastsStore.success("Guardado correctamente");
                setBlockLoader(false);
            })
            .catch(() => {
                setBlockLoader(false);
                ToastsStore.error("Error al asignar el rol");
            });
    };
    return (
        <>
            <Layout namePath={path}>
                <Toolbar className={classes.toolbarHeader}>
                    <Button
                        onClick={() => handleOpenModal(null, null, "new")}
                        variant="contained"
                        className={`${classes.buttonAdd}`}
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
                                    {stateRol.map((item, i) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                            <TableCell>{item.role}</TableCell>
                                            <TableCell>{item.state}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        handleAssingResources(item.resourcesIds, item.id)
                                                    }
                                                >
                                                    <MoreHorizIcon color="primary"/>
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleOpenModal(item, item.id, "edit")}
                                                >
                                                    <EditIcon color="primary"/>
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteRol(item.id)}
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
            count={stateRol.data.length}
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
                                        <Grid item xl={12}>
                                            <FormControl className={classes.margin}>
                                                <TextField
                                                    size="small"
                                                    label="Rol"
                                                    name="role"
                                                    onKeyUp={handleChange}
                                                    onBlur={handleChange}
                                                    variant="outlined"
                                                    className={msgError.role ? "border-error" : ""}
                                                />
                                                {msgError.role && (
                                                    <FormHelperText error>
                                                        Nombre es requerido
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
                                                    label="Rol"
                                                    name="rol"
                                                    onKeyUp={handleChange}
                                                    onBlur={handleChange}
                                                    variant="outlined"
                                                    defaultValue={role && role.role}
                                                />
                                                {msgError.role && (
                                                    <FormHelperText error>
                                                        Rol es requerido
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
                                                    defaultValue={role && role.state}
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
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={openResource}
                onClose={handleCloseModalAsignResource}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 200,
                }}
            >
                <div className={classes.paper}>
                    <h2 className={classes.modalHeader}>ASIGNAR RECURSOS</h2>
                    <div className={classes.modalBody}>
                        <Grid container>
                            {stateResource.map((resource, i) => (
                                <Grid item xs={6} key={i}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={() => handleChangeCheck(resource.id)}
                                                defaultChecked={resource.checked}
                                                color="primary"
                                                value={resource.id}
                                                inputProps={{"aria-label": "secondary checkbox"}}
                                            />
                                        }
                                        label={resource.resource}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12} className={classes.alignCenter}>
                            <Button
                                className={`${classes.margin} button-gradient-danger u-margin-top-2`}
                                variant="contained"
                                color="primary"
                                onClick={handleCloseModalAsignResource}
                                startIcon={<CloseIcon/>}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className={`${classes.margin} button-gradient-primary u-margin-top-2`}
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleAssignUserRol}
                                startIcon={<SaveIcon/>}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </div>
                </div>
            </Modal>
        </>
    );
}
