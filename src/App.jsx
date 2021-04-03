import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import { ToastsContainer, ToastsStore } from "react-toasts";
import axios from "axios";
import { AuthContext } from "./context/useAuth";
import {Users} from "./pages/users";
import { navigate } from "@reach/router";
import {Roles} from "./pages/roles";
import {Resources} from "./pages/resources";
import {Documents} from "./pages/documents";
import {Projects} from "./pages/projects";
import {Home} from "./pages/dashboard";
import {Login} from "./pages/auth";
export function App() {
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
        <Users path="usuarios" />
        <Roles path="roles" />
        <Resources path="recursos" />
        <Projects path="proyectos" />
        <Documents path="documentos" />
      </Router>
    </AuthContext.Provider>
  );
}
