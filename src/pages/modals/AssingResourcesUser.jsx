// import React, { useEffect, useState } from "react";

// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Checkbox from "@material-ui/core/Checkbox";
// // or
// import Grid from "@material-ui/core/Grid";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import { useStyles } from "../../components/styled/UserStyled";
// import CloseIcon from "@material-ui/icons/Close";
// import axios from "axios";
// import { URL, HEADER } from "../../config/settings";
// import { ToastsStore } from "react-toasts";
// import SaveIcon from "@material-ui/icons/Save";
// const UserModal = (props) => {
//   const { openResource, handle, idUser, setItemRolUser, itemRolUser } = props;
  
//   /**
//    * Classes => Modal Clases and components Material UI
//    */
//   const classes = useStyles();
//   /**
//    * Handle => Close Modal
//    */
//   const handleClose = () => {
//     handle(false);
//   };
//   const [checked, setChecked] = useState(true);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };
//   useEffect(() => {
//     handleGetRole();
//   }, []);
//   const [stateRole, setStateRole] = useState([]);
//   const handleGetRole = () => {
//     axios
//       .get(`${URL}roles?state=ACTIVO`, HEADER)
//       .then((dataROLES) => {
//         const { data } = dataROLES;
//         setStateRole(data);
//       })
//       .catch((error) => {
//         ToastsStore.error("Ocurrio un error al obtener los usuarios");
//       });
//   };
//   console.log(stateRole, "LOS ROLES");
//   return (

//   );
// };

// export default UserModal;
