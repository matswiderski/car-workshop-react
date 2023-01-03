import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function TransitionsModal() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [email, setEmail] = useState("");
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{ p: 0, color: "primary.main", textTransform: "none" }}
      >
        Forgot password?
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Account recovery</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter e-mail address associated with the account
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Recover</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
