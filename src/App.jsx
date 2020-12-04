import React from "react";
import { Router } from "@reach/router";
import { ToastsContainer, ToastsStore } from "react-toasts";
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
const App = (props) => {
  const user = {};
  return (
    <AuthContext.Provider value={user}>
      <ToastsContainer store={ToastsStore} />
      <Router>
        <Login path="/" />

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
