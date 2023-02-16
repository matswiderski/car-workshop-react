import { useEffect, useState } from "react";
import { useAxios } from "../../api/axios";
import usePage from "../hooks/usePage";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

function Cars(props) {
  const page = usePage();
  const { privateInstance } = useAxios();
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
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
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
        const response = await privateInstance({
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
      const response = await privateInstance({
        method: "post",
        url: "car/delete",
        data: selectedRows,
        headers: { "Content-Type": "application/json" },
      });
      notification.setNotification("Cars deleted successfully");
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
    let carData = {};
    if (editMode) {
      carData = {
        id: selectedRows[0].id,
        brand,
        model,
        licensePlate,
        productionYear,
      };
    } else {
      carData = {
        brand,
        model,
        licensePlate,
        productionYear,
      };
    }
    try {
      const response = await privateInstance({
        method: editMode ? "patch" : "post",
        url: editMode ? "car/update" : "car/create",
        data: carData,
        headers: { "Content-Type": "application/json" },
      });
      if (editMode) {
        setRows((prevRows) => {
          return prevRows.map((row) =>
            row.id === carData.id
              ? {
                  id: carData.id,
                  licensePlate: carData.licensePlate,
                  brand: carData.brand,
                  model: carData.model,
                  productionYear: carData.productionYear,
                }
              : row
          );
        });
        notification.setNotification("Car updated successfully");
      } else {
        setRows([...rows, response.data]);
        notification.setNotification("Car created successfully");
      }
      handleClose();
    } catch (error) {
      const errors = error.response?.data.errors;
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

  const handleClickOpen = (deleteMode) => {
    if (selectedRows.length === 0 && deleteMode) {
      setCreateMode(true);
    } else {
      if (!deleteMode) {
        setEditMode(true);
        setBrand(selectedRows[0].brand);
        setProductionYear(selectedRows[0].productionYear);
        setLicensePlate(selectedRows[0].licensePlate);
        setModel(selectedRows[0].model);
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setTimeout(() => {
      setEditMode(false);
      setCreateMode(false);
    }, 300);
    setProductionYear(0);
    setLicensePlate("");
    setBrand("");
    setModel("");
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
    {
      field: "licensePlate",
      headerName: "License plate",
      flex: 0.25,
      minWidth: 100,
    },
    { field: "brand", headerName: "Brand", flex: 0.25, minWidth: 100 },
    { field: "model", headerName: "Model", flex: 0.25, minWidth: 100 },
    {
      field: "productionYear",
      headerName: "Production year",
      type: "number",
      flex: 0.25,
      minWidth: 100,
    },
  ];

  return (
    <>
      <Grid
        item
        sx={{
          height: "73vh",
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          sx={{
            "&::-webkit-scrollbar": {
              width: 20,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "orange",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "red",
              borderRadius: 2,
            },
          }}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          components={{
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <InfoRoundedIcon />
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
          <>
            {!editMode && !createMode ? (
              "Delete seleceted cars?"
            ) : (
              <>{editMode ? "Update car details" : "Add new car"}</>
            )}
          </>
        </DialogTitle>
        <DialogContent>
          {(editMode || createMode) && (
            <Box id="create-form" component="form" onSubmit={handleCreate}>
              <TextField
                id="license-plate"
                margin="normal"
                required
                fullWidth
                label="License Plate"
                name="license-plate"
                autoComplete="license-plate"
                vaalue={licensePlate}
                defaultValue={editMode ? selectedRows[0].licensePlate : ""}
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
                vaalue={model}
                defaultValue={editMode ? selectedRows[0].model : ""}
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
                vaalue={brand}
                defaultValue={editMode ? selectedRows[0].brand : ""}
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
                vaalue={productionYear}
                defaultValue={editMode ? selectedRows[0].productionYear : ""}
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
          {editMode || createMode ? (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton
                type="submit"
                form="create-form"
                loading={loading}
                variant="contained"
              >
                {editMode ? "Update" : "Create"}
              </LoadingButton>
            </>
          ) : (
            <>
              <LoadingButton
                onClick={handleDelete}
                loading={loading}
                variant="contained"
              >
                Yes
              </LoadingButton>
              <Button onClick={handleClose}>No</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Fab
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        color="primary"
        aria-label="add"
        disabled={createMode || editMode}
        onClick={() => {
          handleClickOpen(true);
        }}
      >
        {selectedRows.length > 0 ? <DeleteRoundedIcon /> : <AddIcon />}
      </Fab>
      {selectedRows.length === 1 && (
        <Fab
          sx={{ position: "absolute", bottom: 16, right: 80 }}
          color="secondary"
          aria-label="edit"
          disabled={createMode || editMode}
          onClick={() => {
            handleClickOpen(false);
          }}
        >
          <EditRoundedIcon />
        </Fab>
      )}
    </>
  );
}

export default Cars;
