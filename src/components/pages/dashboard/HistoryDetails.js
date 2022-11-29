import React from "react";
import ListItemText from "@mui/material/ListItemText";


function HistoryDetails(props) {
  return (
    <div className="history-details">
      <ListItemText primary={props.title} />
      <span className="category">{props.category}</span>
    </div>
  );
}

export default HistoryDetails;
