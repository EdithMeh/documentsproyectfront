import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// Components for tables
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
// Components
import Layout from "../../components/layout/layout";
import { LoaderBlock } from "../../components/styled/LoaderBlock";
import { URL, HEADER } from "../../config/settings";
import { useStyles } from "../../components/styled/UserStyled";
import { ToastsStore } from "react-toasts";
// Icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import AssignResourcesUser from "../modals/AssingResourcesUser";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { Input } from "@material-ui/core";
const Usuarios = (props) => {
  const [blockLoader, setBlockLoader] = useState(false);
  const { path } = props;
  /**
   * Handle => Close Modal
   */
  const handleClose = () => {
    setOpen(false);
    setMsgError({
      email: "",
      name: "",
      password: "",
      telephone: "",
      username: "",
      state: "",
    });
    setUser({
      email: "",
      name: "",
      password: "",
      telephone: "",
      username: "",
      state: "",
    });
  };
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    telephone: "",
    username: "",
    state: "",
  });
  const [msgError, setMsgError] = useState({
    email: "",
    name: "",
    password: "",
    telephone: "",
    username: "",
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
    const { name, value } = e.target;
    // setListState(e.target.value);
    let errors = msgError;
    switch (name) {
      case "email":
        errors.email = value === "" ? "Este campo es requerido" : "";
        break;
      case "name":
        errors.name = value === "" ? "Este campo es requerido" : "";
        break;
      case "password":
        errors.password = value === "" ? "Este campo es requerido" : "";
        break;
      case "telephone":
        errors.telephone = value === "" ? "Este campo es requerido" : "";
        break;
      case "username":
        errors.username = value === "" ? "Este campo es requerido" : "";
        break;
      case "state":
        errors.state = value === "" ? "Este campo es requerido" : "";
        break;
      default:
        break;
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const columns = [
    { id: "name", label: "Nombre", minWidth: 140 },
    { id: "lastName", label: "Apellidos", minWidth: 140 },
    {
      id: "username",
      label: "Nombre de Usuario",
      minWidth: 140,
    },
    {
      id: "email",
      label: "Correo",
      minWidth: 140,
    },
    {
      id: "celphone",
      label: "Celular",
      minWidth: 140,
    },
    {
      id: "actions",
      label: "Acciones",
      minWidth: 140,
    },
  ];
  const [name, setName] = useState("Composed TextField");

  const [stateUser, setStateUser] = useState([]);

  const handleGetUsers = () => {
    setBlockLoader(true);
    axios
      .get(`${URL}users?state=ACTIVO`, HEADER)
      .then((dataUSER) => {
        const { data } = dataUSER;
        setStateUser(data);
        setBlockLoader(false);
      })
      .catch((error) => {
        setBlockLoader(false);
        ToastsStore.error("Ocurrio un error al obtener los usuarios");
      });
  };
  /**
   * Handle ==> Delete user by id
   */
  const handleDeleteUser = (position) => {
    setBlockLoader(true);
    axios
      .put(`${URL}users/delete/${position}`, {}, HEADER)
      .then((response) => {
        handleGetUsers();
        ToastsStore.success("Eliminado correctamente");
      })
      .catch((error) => {
        console.log(error, "eROROR AL ELIMINAR");
      });
  };
  const [openResource, setOpenResource] = useState(false);
  const [idUser, setIdUser] = useState();
  const [itemRolUser, setItemRolUser] = useState();

  useEffect(() => {
    handleGetUsers();
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
      setUser(item);
      setPositionRow(position);
      setOpen(true);
      setTypeModal(type);
    }
  };

  const handleAddUser = (e) => {
    setBlockLoader(true);
    e.preventDefault();
    if (
      user.email === "" ||
      user.name === "" ||
      user.password === "" ||
      user.telephone === "" ||
      user.username === ""
    ) {
      ToastsStore.error("Completa el formulario");
    } else {
      if (formValidate(msgError, user)) {
        axios
          .post(`${URL}users`, user, HEADER)
          .then((response) => {
            handleClose();
            handleGetUsers();
            ToastsStore.success("Usuario agregado correctamente");
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
  const handleEditUser = (e) => {
    setBlockLoader(true);
    e.preventDefault();
    if (
      user.email === "" ||
      user.name === "" ||
      user.password === "" ||
      user.telephone === "" ||
      user.username === ""
    ) {
      ToastsStore.error("Completa el formulario");
    } else {
      if (formValidate(msgError, user)) {
        axios
          .put(
            `${URL}users/${positionRow}`,
            {
              email: user.email,
              name: user.name,
              state: user.state,
              telephone: user.telephone,
            },
            HEADER
          )
          .then((response) => {
            handleClose();
            handleGetUsers();
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
  // For ASIGNAMET ROLES TO USER
  const [checked, setChecked] = useState(false);
  const [stateRole, setStateRole] = useState([]);  
  const handleGetRole = () => {
    axios
      .get(`${URL}roles?state=ACTIVO`, HEADER)
      .then((dataROLES) => {
        const { data } = dataROLES;
        setStateRole(data);
      })
      .catch((error) => {
        ToastsStore.error("Ocurrio un error al obtener los usuarios");
      });
  };
  useEffect(() => {
    handleGetRole();
  }, []);
  const handleCloseModalAsignRol = () => {
    setOpenResource(false);
  };
  const [idRolUser, setIdRolUser] = useState([]);
  const handleAssingResources = (itemRol, position) => {
    setIdUser(position);
    setOpenResource(true);
    // handleChangeCheck(itemRol, position);
    for (let i = 0; i < stateRole.length; i++) {
      stateRole[i].checked = false;
      for (let j = 0; j < itemRol.length; j++) {
        if (stateRole[i].id === itemRol[j]) {
          stateRole[i].checked = true;
        }
      }
    }
    setIdRolUser(itemRol);
  };
  const handleChangeCheck = (resource) => {
    const sameId = idRolUser.filter((item) => item === resource)[0];
    if (resource === sameId) {
      const tempRolUser = idRolUser.filter((same) => same !== resource);
      setIdRolUser(tempRolUser);
    } else {
      idRolUser.push(resource);
    }
  };

  /**
   * Handle to assign role to user
   */
  const handleAssignUserRol = () => {
    setBlockLoader(true);
    axios
      .put(`${URL}users/${idUser}/roles`, idRolUser, HEADER)
      .then(() => {
        handleCloseModalAsignRol();
        handleGetUsers();
        ToastsStore.success("Guardado correctamente");
        setBlockLoader(false);
      })
      .catch(() => {
        setBlockLoader(false);
        ToastsStore.error("Error al asignar el rol");
      });
  };
  useEffect(() => {}, []);
  return (
    <>
      <Layout namePath={path}>
        <Toolbar className={classes.toolbarHeader}>
          <Button
            onClick={() => handleOpenModal(null, null, "new")}
            variant="contained"
            className={`${classes.buttonAdd} button-gradient-primary`}
            startIcon={<AddIcon />}
          >
            Adicionar Nuevo
          </Button>
          <Select labelId="label" id="select" value="20">
            <MenuItem value="10">Ten</MenuItem>
            <MenuItem value="20">Twenty</MenuItem>
          </Select>
        </Toolbar>
        {blockLoader ? <LoaderBlock /> : ""}

        <div>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader size="small" aria-label="sticky dense table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stateUser.map((item, i) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.telephone}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleAssingResources(item.rolesIds, item.id)
                          }
                        >
                          <MoreHorizIcon color="primary" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenModal(item, item.id, "edit")}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteUser(item.id)}
                        >
                          <DeleteIcon color="primary" />
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
            count={stateUser.data.length}
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
                          label="Nombre"
                          name="name"
                          onKeyUp={handleChange}
                          onBlur={handleChange}
                          variant="outlined"
                          className={msgError.name ? "border-error" : ""}
                        />
                        {msgError.name && (
                          <FormHelperText error>
                            Nombre es requerido
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          label="Apellidos"
                          variant="outlined"
                          onKeyUp={handleChange}
                          onBlur={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          label="Username"
                          name="username"
                          variant="outlined"
                          onKeyUp={handleChange}
                          onBlur={handleChange}
                          className={msgError.username ? "border-error" : ""}
                        />
                        {msgError.username && (
                          <FormHelperText error>
                            Nombre de usuario es requerido
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          label="Correo"
                          variant="outlined"
                          name="email"
                          onKeyUp={handleChange}
                          onBlur={handleChange}
                          className={msgError.email ? "border-error" : ""}
                        />
                        {msgError.email && (
                          <FormHelperText error>
                            Email es requerido
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          label="Contraseña"
                          variant="outlined"
                          type="password"
                          name="password"
                          onKeyUp={handleChange}
                          onBlur={handleChange}
                          className={msgError.password ? "border-error" : ""}
                        />
                        {msgError.password && (
                          <FormHelperText error>
                            Contraseña es requerido
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          label="Celular"
                          variant="outlined"
                          name="telephone"
                          onKeyUp={handleChange}
                          onBlur={handleChange}
                          className={msgError.telephone ? "border-error" : ""}
                        />
                        {msgError.telephone && (
                          <FormHelperText error>
                            Contraseña es requerido
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
                        startIcon={<CloseIcon />}
                      >
                        Cancelar
                      </Button>
                      <Button
                        // size="small"
                        className={`${classes.margin} button-gradient-primary u-margin-top-2`}
                        variant="contained"
                        color="primary"
                        type="submit"
                        startIcon={<SaveIcon />}
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
                  onSubmit={handleEditUser}
                >
                  <Grid container>
                    <Grid item xs={6}>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          label="Nombre"
                          name="name"
                          onKeyUp={handleChange}
                          onBlur={handleChange}
                          variant="outlined"
                          defaultValue={user && user.name}
                        />
                        {msgError.name && (
                          <FormHelperText error>
                            Nombre es requerido
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          label="Correo"
                          variant="outlined"
                          name="email"
                          onKeyUp={handleChange}
                          onBlur={handleChange}
                          defaultValue={user && user.email}
                          className={msgError.email ? "border-error" : ""}
                        />
                        {msgError.email && (
                          <FormHelperText error>
                            Email es requerido
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.margin}>
                        <TextField
                          size="small"
                          label="Celular"
                          variant="outlined"
                          name="telephone"
                          onKeyUp={handleChange}
                          onBlur={handleChange}
                          defaultValue={user && user.telephone}
                          className={msgError.telephone ? "border-error" : ""}
                        />
                        {msgError.telephone && (
                          <FormHelperText error>
                            Contraseña es requerido
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
                          defaultValue={user && user.state}
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
                        startIcon={<CloseIcon />}
                      >
                        Cancelar
                      </Button>
                      <Button
                        // size="small"
                        className={`${classes.margin} button-gradient-primary u-margin-top-2`}
                        variant="contained"
                        color="primary"
                        type="submit"
                        startIcon={<SaveIcon />}
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
        onClose={handleCloseModalAsignRol}
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
              {stateRole.map((resource, i) => (
                <Grid item xs={6} key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => handleChangeCheck(resource.id)}
                        defaultChecked={resource.checked}
                        color="primary"
                        value={resource.id}
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    }
                    label={resource.role}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} className={classes.alignCenter}>
              <Button
                className={`${classes.margin} button-gradient-danger u-margin-top-2`}
                variant="contained"
                color="primary"
                onClick={handleCloseModalAsignRol}
                startIcon={<CloseIcon />}
              >
                Cancelar
              </Button>
              <Button
                className={`${classes.margin} button-gradient-primary u-margin-top-2`}
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleAssignUserRol}
                startIcon={<SaveIcon />}
              >
                Guardar
              </Button>
            </Grid>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Usuarios;
