import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";

function NavItem(props) {
  return (
    <Link to={props.path} style={{textDecoration: "none", color: "inherit"}}>
      <ListItem key={props.text} disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 32,
            justifyContent: props.open ? "initial" : "center",
            px: 2.5,
            borderRadius: "30px",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {props.children}
          </ListItemIcon>
          <ListItemText
            primary={props.text}
            sx={{ opacity: props.open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default NavItem;
