import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components for tables
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
// Components
import Layout from "../../components/layout/layout";
import { LoaderBlock } from "../../components/styled/LoaderBlock";
// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import PropTypes from "prop-types";
import axios from "axios";
import { URL, HEADER } from "../../config/settings";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  toolbarContainer: {},
  // Table
  selectEmpty: {
    padding: "0.5em",
    borderRadius: "5px",
    background: "white",
  },
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  buttonAdd: {
    textTransform: "capitalize",
    color: "white",
  },
  toolbarHeader: {
    width: "100%",
    display: "flex",
    background: "#9FA2B4",
    justifyContent: "space-between",
    borderRadius: "5px 5px 0 0",
  },
  modal: {
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeader: {
    color: "white",
    padding: "0.5em 2em",
    background: "#363740",
  },
  modalBody: {
    padding: "0.5em 2em",
  },
  paper: {
    outline: "none",
    overflow: "hidden",
    borderRadius: "10px",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Usuarios = (props) => {
  const { path } = props;
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
  const [listState, setListState] = React.useState("");

  const handleChange = (event) => {
    setListState(event.target.value);
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

  const [stateUser, setStateUser] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL}users?state=ACTIVO`, HEADER)
      .then((dataUSER) => {
        const { data } = dataUSER;
        setStateUser((prevState) => ({ ...prevState, data }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // FOR MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Layout namePath={path}>
      <Toolbar className={classes.toolbarHeader}>
        <Button
          onClick={handleOpen}
          variant="contained"
          className={`${classes.buttonAdd} button-gradient-primary`}
          startIcon={<DeleteIcon />}
        >
          Adicionar Nuevo
        </Button>
        <FormControl size="small" className={`${classes.formControl}`}>
          {/* <Select
            labelId="stateSelect"
            id="demo-simple-select-filled"
            value={listState}
            onChange={handleChange}
          > */}
          <Select
            value={listState}
            onChange={handleChange}
            className={`${classes.selectEmpty} input-state-select`}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">Estado</MenuItem>
            <MenuItem value={"ACT"}>Activo</MenuItem>
            <MenuItem value={"BLOCK"}>Bloqueado</MenuItem>
            <MenuItem value={"DEL"}>Eliminado</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
      {stateUser.data === undefined ? (
        <LoaderBlock />
      ) : (
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
                  {stateUser.data.map((item) => (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.telephone}</TableCell>
                      <TableCell>
                        <IconButton>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton>
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
      )}

      <div>
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
              <Grid container>
                <Grid item xs={6}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam dolor ratione qui animi quisquam libero quae in,
                  maxime aspernatur dolorum incidunt, ullam repudiandae ducimus
                  explicabo labore, modi minima est officia?
                </Grid>
                <Grid item xs={6}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam dolor ratione qui animi quisquam libero quae in,
                  maxime aspernatur dolorum incidunt, ullam repudiandae ducimus
                  explicabo labore, modi minima est officia?
                </Grid>
              </Grid>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Usuarios;
