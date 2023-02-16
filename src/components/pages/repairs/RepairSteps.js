import React from "react";
import { useState, useEffect } from "react";
import { useAxios } from "../../../api/axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@emotion/react";
import { grey } from "@mui/material/colors";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import useNotification from "../../hooks/useNotification";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Stack from "@mui/material/Stack";

const steps = ["Select car", "Chose workshop", "Provide details"];

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function RepairSteps({ setRepairs, repairs }) {
  const theme = useTheme();
  const { privateInstance } = useAxios();
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [activeStep, setActiveStep] = useState(0);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState({});
  const [selectedWorkshop, setSelectedWorkshop] = useState({});
  const [cars, setCars] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const notification = useNotification();
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.id}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  useEffect(() => {
    (async function () {
      try {
        const getCars = await privateInstance({
          method: "get",
          url: "car/get-all",
          headers: { "Content-Type": "application/json" },
        });
        setCars(getCars.data);

        const getServices = await privateInstance({
          method: "get",
          url: "service/get-all",
          headers: { "Content-Type": "application/json" },
        });
        setLeft(getServices.data);
        const getWorkshops = await privateInstance({
          method: "get",
          url: "workshop/get-all",
          headers: { "Content-Type": "application/json" },
        });
        setWorkshops(getWorkshops.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (selectedCar.id !== undefined && selectedWorkshop.id !== undefined)
      setStepCompleted(true);
    else setStepCompleted(false);
  };

  const handleBack = () => {
    if (selectedCar.id !== undefined || selectedWorkshop.id !== undefined)
      setStepCompleted(true);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCarClick = (car) => {
    setStepCompleted(true);
    setSelectedCar(car);
  };
  const handleWorkshopClick = (workshop) => {
    setStepCompleted(true);
    setSelectedWorkshop(workshop);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const repair = {
      car: selectedCar,
      workshop: selectedWorkshop,
      services: right,
      message,
    };
    try {
      const response = await privateInstance({
        method: "post",
        url: "repair/create",
        data: repair,
        headers: { "Content-Type": "application/json" },
      });
      setLoading(false);
      notification.setNotification("Repair added successfully");
      setRepairs([...repairs, response.data]);
      setSelectedWorkshop({});
      setSelectedCar({});
      setActiveStep(0);
      setStepCompleted(false);
      setMessage("");
      setLeft([...left, ...right]);
      setRight([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ minHeight: "400px" }}>
      <Stepper
        activeStep={activeStep}
        orientation={windowSize.innerWidth <= 600 ? "vertical" : "horizontal"}
      >
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        {
          {
            0:
              cars.length > 0 ? (
                <TableContainer
                  sx={{
                    height: 300,
                    overflow: "auto",
                    mt: 5,
                  }}
                >
                  <Table sx={{ width: "100%" }} stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>License Plate</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Production year</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cars.map((car) => {
                        return (
                          <TableRow
                            key={car.id}
                            selected={selectedCar.id === car.id}
                            onClick={() => handleCarClick(car)}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell>{car.licensePlate}</TableCell>
                            <TableCell>{car.brand}</TableCell>
                            <TableCell>{car.model}</TableCell>
                            <TableCell>{car.productionYear}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ height: "400px" }}
                >
                  <InfoRoundedIcon />
                  You haven't added any cars yet
                </Stack>
              ),
            1: (
              <TableContainer
                sx={{
                  height: 300,
                  overflow: "auto",
                  mt: 5,
                }}
              >
                <Table sx={{ width: "100%" }} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Latitude</TableCell>
                      <TableCell>Longitude</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workshops.map((workshop) => {
                      return (
                        <TableRow
                          key={workshop.id}
                          selected={selectedWorkshop.id === workshop.id}
                          onClick={() => handleWorkshopClick(workshop)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell>{workshop.name}</TableCell>
                          <TableCell>
                            {workshop.localization.latitude}
                          </TableCell>
                          <TableCell>
                            {workshop.localization.longitude}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ),
            2: (
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 5 }}
              >
                <Grid item>{customList("Services", left)}</Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>{customList("Chosen services", right)}</Grid>
                <Grid
                  item
                  flexGrow={1}
                  display="flex"
                  justifyContent="center"
                  sx={{ height: 300 }}
                >
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Optional message to workshop"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: "100%",
                      height: "100%",
                      resize: "none",
                      backgroundColor:
                        theme.palette.mode === "dark" ? grey[900] : "white",
                      color: theme.palette.mode === "dark" ? "white" : "black",
                    }}
                  />
                </Grid>
              </Grid>
            ),
          }[activeStep]
        }
        <Box sx={{ display: "flex", pt: 2 }}>
          {activeStep >= 1 && (
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          )}
          <Box sx={{ flex: "1 1 auto" }} />
          {stepCompleted && activeStep + 1 < steps.length ? (
            <>
              <LoadingButton onClick={handleNext} variant="contained">
                Next
              </LoadingButton>
            </>
          ) : (
            <>
              {activeStep + 1 === steps.length && right.length > 0 && (
                <LoadingButton
                  loading={activeStep === steps.length - 1 && loading}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </LoadingButton>
              )}
            </>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default RepairSteps;
