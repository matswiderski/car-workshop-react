import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import useTheme from "@mui/material/styles/useTheme";
import deepOrange from "@mui/material/colors/deepOrange";
import { useNavigate } from "react-router-dom";

import usePage from "../../hooks/usePage";
import useAuth from "../../hooks/useAuth";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const notifications = ["1", "2", "3", "4"];

function TopBar() {
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const handleLogout = () => {
    auth.setUser({});
    localStorage.removeItem("user-data");
    navigate("/", {replace: true});
  };

  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const theme = useTheme();
  const page = usePage();
  const auth = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        height: 60,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          id="page-name"
          variant="h5"
          noWrap
          sx={{
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: ".1rem",
            color: "inherit",
            transition: theme.transitions.create(["font-size", "transform"], {
              duration: theme.transitions.duration.standard,
            }),
            [theme.breakpoints.down("sm")]: {
              fontSize: 15,
            },
          }}
        >
          {page.currentPageName}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <Tooltip title="Open notifications">
          <IconButton onClick={handleOpenNotificationsMenu}>
            <NotificationsRoundedIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "35px" }}
          id="notifications-appbar"
          anchorEl={anchorElNotifications}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNotifications)}
          onClose={handleCloseNotificationsMenu}
        >
          {notifications.map((notification) => (
            <MenuItem key={notification} onClick={handleCloseNotificationsMenu}>
              <Typography textAlign="center">{notification}</Typography>
            </MenuItem>
          ))}
        </Menu>
        <Tooltip title="Profile details">
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: 24,
                height: 24,
                fontSize: 15,
              }}
            >
              {JSON.parse(auth.user).email.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "40px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key="Logout" onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default TopBar;
