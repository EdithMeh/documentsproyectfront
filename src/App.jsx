import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import { ToastsContainer, ToastsStore } from "react-toasts";
import axios from "axios";
// Pages
import { AuthContext } from "./context/useAuth";
// Pages
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/home";
import Usuarios from "./pages/dashboard/usuarios";
import Roles from "./pages/dashboard/roles";
import Recursos from "./pages/dashboard/recursos";
import Proyectos from "./pages/dashboard/proyectos";
import Documentos from "./pages/dashboard/documentos";
import { HEADER } from "./config/settings";
import { navigate } from "@reach/router";
const App = () => {
  const [currentUser, setCurrentUser] = useState([]);

  axios.defaults.baseURL = "https://projectssystems.herokuapp.com/api";
  axios.interceptors.response.use(undefined, (error) => {
    if (error.message === "Network Error" && !error.response) {
      ToastsStore.error("Ocurrio un error NETWORk");
    }
    const { status, data, config } = error.response;
    if (status === 403) {
      ToastsStore.error("Ocurrio un error");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
    // if (status === 404) {
    //   console.log("ERROR 404");
    // }
    // if (
    //   status === 400 &&
    //   config.method === "get" &&
    //   data.errors.hasOwnProperty("id")
    // ) {
    //   console.log("ERROR 400");
    // }
    // if (status === 500) {
    //   console.log("ERROR 5000");
    // }
  });
  useEffect(() => {
    // axios
    //   .get(`${URL}users?state=ACTIVO`, HEADER)
    //   .then((dataUSER) => {
    //     const { data } = dataUSER;
    //     setCurrentUser((prevState) => ({ ...prevState, data }));
    //   })
    //   .catch((error) => {
    //   console.log(error, "error")
    //     ToastsStore.error("Sessión expirada");
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //     navigate("/");
    //   });
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      <ToastsContainer store={ToastsStore} />
      <Router>
        <Login path="login" default />
        <Home path="home" />
        <Usuarios path="usuarios" />
        <Roles path="roles" />
        <Recursos path="recursos" />
        <Proyectos path="proyectos" />
        <Documentos path="documentos" />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
