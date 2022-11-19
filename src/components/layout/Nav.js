import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";

import ThemeButton from "./ThemeButton";
import NavItem from "./NavItem";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Nav() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            ...(!open && { display: "none" }),
            minHeight: 60,
          }}
        >
          <IconButton href="#" sx={{ mx: "auto", p: 0.5 }}>
            <ConstructionRoundedIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <DrawerHeader
          sx={{
            ...(open && { display: "none" }),
            justifyContent: "center",
            p: 0.5,
            minHeight: 60,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuRoundedIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <NavItem text="Dashboard" open={open}>
            <DashboardRoundedIcon sx={{ fontSize: 20 }} />
          </NavItem>
          <NavItem text="Find workshop" open={open}>
            <HomeRepairServiceRoundedIcon sx={{ fontSize: 20 }} />
          </NavItem>
        </List>
        <Divider sx={{ flexGrow: 1 }} />
        <List sx={{ mt: "auto", minHeight: 60 }}>
          <ListItem
            key="themeButton"
            disablePadding
            sx={{ display: "block", textAlign: "center" }}
          >
            <ThemeButton />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
export default Nav;
