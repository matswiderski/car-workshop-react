import { useEffect, useState } from "react";
import usePage from "../hooks/usePage";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import axios from "../../api/axios";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useNotification from "../hooks/useNotification";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import LinearProgress from "@mui/material/LinearProgress";

function Cars(props) {
  const page = usePage();
  useEffect(() => {
    page.setCurrentPageName(props.pageName);
  }, [page.currentPageName]);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const notification = useNotification();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [productionYear, setProductionYear] = useState(0);
  const [licensePlateErrors, setLicensePlateErrors] = useState({
    isOpen: false,
    errors: [],
  });
  const [modelErrors, setModelErrors] = useState({
    isOpen: false,
    errors: [],
  });
  const [brandErrors, setBrandErrors] = useState({
    isOpen: false,
    errors: [],
  });
  const [productionYearErrors, setProductionYearErrors] = useState({
    isOpen: false,
    errors: [],
  });
  useEffect(() => {
    (async function () {
      setDataLoading(true);
      try {
        const response = await axios({
          method: "get",
          url: "car/get-all",
          headers: { "Content-Type": "application/json" },
        });
        setDataLoading(false);
        setRows(response.data);
      } catch (error) {
        setDataLoading(false);
      }
    })();
  }, []);

  const handleDelete = async () => {
    handleClose();
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "car/delete",
        data: selectedRows,
        headers: { "Content-Type": "application/json" },
      });
      notification.setNotification("Rows deleted successfully");
      setRows(
        rows.filter(
          (r) => selectedRows.filter((sr) => sr.id === r.id).length < 1
        )
      );
    } catch (error) {}
    setLoading(false);
  };
  const handleCreate = async (e) => {
    setLoading(true);
    e.preventDefault();
    clearErrors();
    const carCreateData = {
      brand,
      model,
      licensePlate,
      productionYear,
    };
    try {
      const response = await axios({
        method: "post",
        url: "car/create",
        data: carCreateData,
        headers: { "Content-Type": "application/json" },
      });
      setRows([...rows, response.data]);
      notification.setNotification("Car created successfully");
      handleClose();
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors !== undefined) {
        if (errors.hasOwnProperty("licensePlate")) {
          setLicensePlateErrors({
            isOpen: true,
            errors: error.response.data.errors.licensePlate,
          });
        }
        if (errors.hasOwnProperty("model")) {
          setModelErrors({
            isOpen: true,
            errors: error.response.data.errors.model,
          });
        }
        if (errors.hasOwnProperty("brand")) {
          setBrandErrors({
            isOpen: true,
            errors: error.response.data.errors.brand,
          });
        }
        if (errors.hasOwnProperty("productionYear")) {
          setProductionYearErrors({
            isOpen: true,
            errors: error.response.data.errors.productionYear,
          });
        }
      }
    }
    setLoading(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onRowsSelectionHandler = (ids) => {
    setSelectedRows(ids.map((id) => rows.find((row) => row.id === id)));
  };
  const clearErrors = () => {
    setProductionYearErrors({ isOpen: false, errors: [] });
    setBrandErrors({ isOpen: false, errors: [] });
    setModelErrors({ isOpen: false, errors: [] });
    setLicensePlateErrors({ isOpen: false, errors: [] });
  };

  const columns = [
    { field: "licensePlate", headerName: "License plate", width: 150 },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "model", headerName: "Model", width: 150 },
    {
      field: "productionYear",
      headerName: "Production year",
      type: "number",
      width: 150,
    },
  ];

  return (
    <>
      <Grid item xs={12} sx={{ height: "400px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          components={{
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                You haven't added any cars yet
              </Stack>
            ),
          }}
          loading={dataLoading}
        />
      </Grid>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {selectedRows.length > 0
            ? "Delete seleceted cars?"
            : "Add new car"}
        </DialogTitle>
        <DialogContent>
          {selectedRows.length === 0 && (
            <Box id="create-form" component="form" onSubmit={handleCreate}>
              <TextField
                id="license-plate"
                margin="normal"
                required
                fullWidth
                label="License Plate"
                name="license-plate"
                autoComplete="license-plate"
                autoFocus
                variant="standard"
                error={licensePlateErrors.isOpen}
                helperText={licensePlateErrors.errors?.map((msg, i) => {
                  return <li key={i}>{msg}</li>;
                })}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
              <TextField
                id="model"
                margin="normal"
                required
                fullWidth
                name="model"
                label="Model"
                variant="standard"
                autoComplete="model"
                error={modelErrors.isOpen}
                helperText={modelErrors.errors?.map((msg, i) => {
                  return <li key={i}>{msg}</li>;
                })}
                onChange={(e) => setModel(e.target.value)}
              />
              <TextField
                id="brand"
                margin="normal"
                required
                fullWidth
                name="brand"
                label="Brand"
                variant="standard"
                autoComplete="brand"
                error={brandErrors.isOpen}
                helperText={brandErrors.errors?.map((msg, i) => {
                  return <li key={i}>{msg}</li>;
                })}
                onChange={(e) => setBrand(e.target.value)}
              />
              <TextField
                id="production-year"
                margin="normal"
                required
                fullWidth
                type="number"
                name="production-year"
                label="Production Year"
                variant="standard"
                autoComplete="production-year"
                error={productionYearErrors.isOpen}
                helperText={productionYearErrors.errors?.map((msg, i) => {
                  return <li key={i}>{msg}</li>;
                })}
                onChange={(e) => setProductionYear(e.target.value)}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-around" }}>
          {selectedRows.length > 0 ? (
            <>
              <Button onClick={handleClose}>No</Button>
              <LoadingButton
                onClick={handleDelete}
                loading={loading}
                variant="contained"
              >
                Yes
              </LoadingButton>
            </>
          ) : (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton
                type="submit"
                form="create-form"
                loading={loading}
                variant="contained"
              >
                Create
              </LoadingButton>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Fab
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        {selectedRows.length > 0 ? <DeleteRoundedIcon /> : <AddIcon />}
      </Fab>
    </>
  );
}

export default Cars;
