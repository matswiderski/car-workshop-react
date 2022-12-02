import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
export default function MouseOverPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="info">
      <HelpRoundedIcon
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{mx: "12px"}}
      />
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          <Typography sx={{ p: 1 }}>For testing purposes please use</Typography>
          <ul>
            <li>E-mail: "user@user.com"</li>
            <li>Password: "Password1!"</li>
          </ul>
        </Typography>
      </Popover>
    </div>
  );
}
