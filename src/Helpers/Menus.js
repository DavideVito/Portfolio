import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import EmojiPeopleOutlinedIcon from "@material-ui/icons/EmojiPeopleOutlined";
import Typography from "@material-ui/core/Typography";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import { getLingua } from "../Helpers/Utils";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Hamburger from "./Hamburger.js";
import AccountCircle from "@material-ui/icons/AccountCircle";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function LeftMenu(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Hamburger>
              <div style={{ height: "50px" }}></div>
              <ListItem
                button
                key={"Chi sono?"}
                onClick={() => {
                  window.location.href = "/me";
                }}
              >
                <ListItemIcon>
                  <EmojiPeopleOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={getLingua() === "en" ? "Who am I?" : "Chi sono?"}
                />
              </ListItem>
              <Divider />
              <ListItem
                button
                key={"Dove ho studiato"}
                onClick={() => {
                  window.location.href = "/study";
                }}
              >
                <ListItemIcon>
                  <ImportContactsOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    getLingua() === "en"
                      ? "Where have I studied?"
                      : "Dove ho studiato?"
                  }
                />
              </ListItem>
              <ListItem
                button
                key={getLingua() === "en" ? "Skills" : "Competenze"}
                onClick={() => {
                  window.location.href = "/competenze";
                }}
              >
                <ListItemIcon>
                  <EmojiPeopleOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={getLingua() === "en" ? "Skills" : "Competenze"}
                />
              </ListItem>
              <Divider />
              <ListItem
                button
                key={"Cosa ho fatto"}
                onClick={() => {
                  window.location.href = "/projects";
                }}
              >
                <ListItemIcon>
                  <CodeRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    getLingua() === "en"
                      ? "What have I done?"
                      : "Cosa ho fatto?"
                  }
                />
              </ListItem>

              <Divider />
            </Hamburger>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My portfolio
          </Typography>

          <div>
            <IconButton
              aria-label="My page"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Myself</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
