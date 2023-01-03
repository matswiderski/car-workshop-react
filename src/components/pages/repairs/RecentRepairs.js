import { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fragment } from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Stack from "@mui/material/Stack";
function RecentRepairs({ repairs }) {
  const Row = (repair) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Fragment>
          <TableRow sx={{ "& > td": { border: 0 } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell scope="row">{repair.repair.car.licensePlate}</TableCell>
            <TableCell align="right">{repair.repair.workshop.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Services
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Price ($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {repair.repair.services.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell component="th" scope="row">
                            {service.name}
                          </TableCell>
                          <TableCell>{service.category}</TableCell>
                          <TableCell align="right">{service.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </Fragment>
      </>
    );
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>License plate</TableCell>
              <TableCell align="right">Workshop</TableCell>
            </TableRow>
          </TableHead>
          {repairs.length > 0 ? (
            <TableBody>
              {repairs.map((repair) => (
                <Row key={repair.id} repair={repair} />
              ))}
            </TableBody>
          ) : (
            <></>
          )}
        </Table>
      </TableContainer>
      {repairs.length === 0 ? (
        <Stack height="100%" alignItems="center" justifyContent="center">
          <InfoRoundedIcon />
          You haven't added any repairs yet
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
}

export default RecentRepairs;
