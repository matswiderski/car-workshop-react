import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";

function NavItem(props) {
  return (
    <ListItem key={props.text} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 32,
          justifyContent: props.open ? "initial" : "center",
          px: 2.5,
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
        <ListItemText primary={props.text} sx={{ opacity: props.open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
}

export default NavItem;
