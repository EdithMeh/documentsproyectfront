import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Notifications from "@material-ui/icons/Notifications";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import FolderIcon from "@material-ui/icons/Folder";
import DescriptionIcon from "@material-ui/icons/Description";
import { AuthContext } from "../../context/useAuth";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: "none",
    color: "#424242",
    boxShadow: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  profile: {
    display: "flex",
    alignItems: "center",
  },
  nameProfile: {
    marginLeft: "2em",
  },
  notification: {
    background: "none",
    marginLeft: "3em",
    paddingRight: "3em",
    border: "none",
    borderRight: "1px solid#363740",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "#363740",
  },
  itemMenu: {
    textDecoration: "none",
  },
  marginTop: {
    marginTop: "1.4em"
  }
}));
const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        className: isCurrent ? "active-link" : "no-active-link",
      };
    }}
  />
);
const SideBar = ({ title }) => {
  const dataUSER = useContext(AuthContext);
  const CURRENT_USER = localStorage.getItem("user");
  dataUSER.username = CURRENT_USER;

  const [itemsMenu, setItemsMenu] = useState([
    { name: "Usuarios", route: "/usuarios" },
    { name: "Roles", route: "/roles" },
    { name: "Recursos", route: "/recursos" },
    { name: "Proyectos", route: "/proyectos" },
    { name: "Documentos", route: "/documentos" },
  ]);

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.header}>
          <Typography className="u-text-uppercase" variant="h5" noWrap>
            {title}
          </Typography>
          <div className={classes.profile}>
            <button className={classes.notification}>
              <Badge color="primary" variant="dot">
                <Notifications />
              </Badge>
            </button>
            <Typography className={`${classes.nameProfile} u-text-capitalize`}>
              {dataUSER.username}
            </Typography>
            <Avatar className="u-margin-left-1 u-text-uppercase">
              {dataUSER.username ? dataUSER.username.charAt(0) : ""}
            </Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link to="/home" className="logo-text">Innovative Apps</Link>
          </Typography>
        </Toolbar>
        <List className={classes.marginTop}>
          {itemsMenu.map((item, index) => (
            <NavLink key={index} to={item.route}>
              <ListItem button>
                <ListItemIcon style={{ color: "white" }}>
                  {index === 0 ? <SupervisorAccountIcon /> : ""}
                  {index === 1 ? <RecentActorsIcon /> : ""}
                  {index === 2 ? <AllInboxIcon /> : ""}
                  {index === 3 ? <FolderIcon /> : ""}
                  {index === 4 ? <DescriptionIcon /> : ""}
                  {index === 5 ? <SupervisorAccountIcon /> : ""}
                </ListItemIcon>
                <ListItemText
                  // className={classes.linkSize}
                  style={{ color: "white" }}
                  primary={item.name}
                />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
