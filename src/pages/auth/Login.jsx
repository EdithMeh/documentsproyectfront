import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
// Images
import loginBanner from "../../assets/image/login-banner.png";
import { URL } from "../../config/settings";
import { AuthContext } from "../../context/useAuth";
import { LoadContext } from "../../context/useLoading";
import axios from "axios";
// Components6
import { LoaderBlock } from "../../components/styled/LoaderBlock";
import { ToastsStore } from "react-toasts";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    background: "#363740",
    height: "100vh",
    justifyContent: "center",
    padding: "0 5em",
  },
  banner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  image: {
    width: "100%",
  },
}));

const Login = (props) => {
  console.log(props, "props");
  const loadingDATA = useContext(LoadContext);
  const dataUSER = useContext(AuthContext);
  const [values, setValues] = useState({
    password: "",
    username: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };
  const [blockLoader, setBlockLoader] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const classes = useStyles();
  const [showIcon, setShowIcon] = useState(false);
  // Handless
  useEffect(() => {
    const CURRENT_USER = localStorage.getItem("token");
    if (CURRENT_USER) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);
  const handleLogin = () => {
    setBlockLoader(true);
    axios
      .post(`${URL}login`, values)
      .then((dataRESPONSE) => {
        const { token, user } = dataRESPONSE.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user.username);
        setBlockLoader(false);
        ToastsStore.success(dataRESPONSE.data.mensaje);
        navigate("/home");
      })
      .catch((error) => {
        setBlockLoader(false);
        console.log(error);
        ToastsStore.error(
          "Error de autenticación: username o password incorrecto!"
        );
      });
  };
  const handleChangeType = () => {
    const ELEMENT_TYPE_CHANGE = document.getElementById("filled-user-password");
    if (ELEMENT_TYPE_CHANGE.type === "text") {
      ELEMENT_TYPE_CHANGE.type = "password";
      setShowIcon(false);
    } else {
      ELEMENT_TYPE_CHANGE.type = "text";
      setShowIcon(true);
    }
  };

  return (
    <>
      {blockLoader ? <LoaderBlock /> : ""}
      <Grid container>
        <Grid item xs={7}>
          <Paper className={classes.banner} variant="outlined">
            <img
              className={classes.image}
              src={loginBanner}
              alt="Banner Login"
            />
          </Paper>
        </Grid>
        <Grid className={classes.form} item xs={5}>
          <h1 className="color-constrast u-margin-bottom-2">
            Bienvenido de vuelta
          </h1>
          <TextField
            className="input-field-login u-margin-top-2"
            label="Usuario"
            id="filled-user-nameuser"
            placeholder="Ingrese nombre de usuario"
            variant="filled"
            onChange={handleChange("username")}
          />
          <FormControl
            variant="filled"
            className="input-field-login u-margin-top-2"
          >
            <InputLabel htmlFor="filled-adornment-password">
              Contraseña
            </InputLabel>
            <FilledInput
              id="filled-user-password"
              type="password"
              onChange={handleChange("password")}
              placeholder="Ingresa tu contraseña"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    style={{ color: "white" }}
                    aria-label="toggle password visibility"
                    onClick={handleChangeType}
                    edge="end"
                  >
                    {showIcon ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            size="large"
            className="button-gradient-primary u-margin-top-2"
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
