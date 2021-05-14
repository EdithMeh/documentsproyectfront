import { makeStyles } from "@material-ui/core/styles";
import {blue, deepPurple} from "@material-ui/core/colors";
export const useStyles = makeStyles((theme) => ({
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
  margin: {
    margin: "0.5em 0.5em",
  },
  container: {
    paddingTop: 16,
  },
  containerTable: {
    maxHeight: 440,
  },
  buttonAdd: {
    textTransform: "capitalize",
    color: "white",
    backgroundColor: "#2b3169",
  },
  toolbarHeader: {
    width: "100%",
    display: "flex",
    background: "#9FA2B4",
    justifyContent: "space-between",
    borderRadius: "5px 5px 0 0",
  },
  toolbarHeaderIndividual: {
    width: "100%",
    display: "flex",
    background: "#9FA2B4",
    borderRadius: "5px 5px 0 0",
  },
  message: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  members: {
    display: "flex",
    '& > *': {
      margin: theme.spacing(0.3),
    },
  },
  blue: {
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900],
  },
  mainColorBurble: {
    color: theme.palette.getContrastText("#2b3169") ,
    backgroundColor: "#2b3169",
  },
  modal: {
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "500px",
    margin: "auto",
    overflow: "visible",
  },
  modalHeader: {
    color: "white",
    padding: "0.5em 2em",
    background: "#363740",
  },
  modalBody: {
    padding: "1em 1em",
  },
  paper: {
    outline: "none",
    overflow: "visible",
    borderRadius: "10px",
    backgroundColor: theme.palette.background.paper,
  },
  alignCenter: {
    display: "flex",
    justifyContent: "center",
  },
  fieldWidth: {
    width: "100%",    
  },
  commentArea: {
    width: "100%",
  },
  text: {
    margin:0,
  },
  footer: {
    marginTop: "1rem",
    padding: "1rem",
    position: "fixed",
    bottom: 0,
    width: "86%",
  }
}));
