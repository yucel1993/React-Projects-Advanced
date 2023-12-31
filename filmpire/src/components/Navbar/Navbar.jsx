import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Search } from "..";
import useStyles from "./styles";
import { useState, useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";

import { ColorModeContext } from "../../utills/ToggleColorMode";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const {  currentUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);
  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prev) => !prev)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {currentUser ? (
              <Button color="inherit" onClick={() => navigate("/profile")}>
                Profile &nbsp;{" "}
                <img
                  
                  src={ <AccountCircle />}
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                onClick={() => navigate("/profile")}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  alt="Profile"
                  src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prev) => !prev)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
