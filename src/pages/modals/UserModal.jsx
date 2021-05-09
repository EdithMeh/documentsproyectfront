import React, { useEffect, useState } from "react";
import SaveIcon from "@material-ui/icons/Save";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useStyles } from "../../components/styled/UserStyled";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { URL, HEADER } from "../../config/settings";
import { ToastsStore } from "react-toasts";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { LoaderBlock } from "../../components/styled/LoaderBlock";
const UserModal = (props) => {
  const { open, positionRow, useDATA, handleGetUser } = props;
  const [listState, setListState] = React.useState("");
  const [blockLoader, setBlockLoader] = useState(false);
  // console.log(settingsModal, "asdasdas");
  /**
   * Classes => modal Clases and components Material UI
   */
  const classes = useStyles();
  /**
   * Handle => Close modal
   */
  const handleClose = () => {
    setMsgError({
      email: "",
      name: "",
      password: "",
      telephone: "",
      username: "",
    });
    setUser({
      email: "",
      name: "",
      password: "",
      telephone: "",
      username: "",
      state: "ACTIVO",
    });
  };
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    telephone: "",
    username: "",
    state: "ACTIVO",
  });
  const [msgError, setMsgError] = useState({
    email: "",
    name: "",
    password: "",
    telephone: "",
    username: "",
  });

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
      default:
        break;
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {}, []);
  const [age, setAge] = React.useState("");
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
      setBlockLoader(false);
    } else {
      if (formValidate(msgError, user)) {
        axios
          .post(`${URL}users`, user, HEADER)
          .then((response) => {
            handleClose();
            handleGetUser();
            ToastsStore.success("Usuario agregado correctamente");
            setBlockLoader(false);
          })
          .catch((response) => {
            setBlockLoader(false);
            console.log(response, "Ocurrio un errror al agregar nuevo usuario");
          });
      } else {
        setBlockLoader(false);
        ToastsStore.error("Completa los campos requeridos");
      }
    }
  };
  useEffect(() => {
    // const dataSETTINGS = {
    //   email: settingsModal[0].email,
    //   name: settingsModal[0].name,
    // };
  }, []);
  const handleEditUser = (e) => {
    console.log(user, "user");
    e.preventDefault();
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
        handleGetUser();
        console.log(response, "RESPONSE");
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
  };
  return (
    <>
      {blockLoader ? <LoaderBlock /> : ""}
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
        <div className={classes.paper}>
          <h2 className={classes.modalHeader}>NUEVO USUARIO</h2>
          <div className={classes.modalBody}>
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
                      <FormHelperText error>Nombre es requerido</FormHelperText>
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
                      <FormHelperText error>Email es requerido</FormHelperText>
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
                    size="small"
                    className={`${classes.margin} button-gradient-danger u-margin-top-2`}
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                    startIcon={<CloseIcon />}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="small"
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
                      className={msgError.name ? "border-error" : ""}
                    />
                    {msgError.name && (
                      <FormHelperText error>Nombre es requerido</FormHelperText>
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
                      <FormHelperText error>Email es requerido</FormHelperText>
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
                    className={classes.formControl}
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
                    size="small"
                    className={`${classes.margin} button-gradient-danger u-margin-top-2`}
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                    startIcon={<CloseIcon />}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="small"
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
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserModal;
