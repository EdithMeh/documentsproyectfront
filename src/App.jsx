import React, {useEffect, useState} from "react";
import {Router} from "@reach/router";
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from "react-toasts";
import axios from "axios";
import {AuthContext} from "./context/useAuth";
import {Users} from "./pages/users";
import {navigate} from "@reach/router";
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
        const {status, data, config} = error.response;
        if (status === 403) {
            ToastsStore.error("Ocurrio un error");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        }
    });

    return (
        <AuthContext.Provider value={currentUser}>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT}/>
            <Router>
                <Login path="login" default/>
                <Home path="home"/>
                <Users path="usuarios"/>
                <Roles path="roles"/>
                <Resources path="recursos"/>
                <Projects path="proyectos"/>
                <Documents path="documentos"/>
            </Router>
        </AuthContext.Provider>
    );
}
