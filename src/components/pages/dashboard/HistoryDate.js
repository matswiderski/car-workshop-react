import React from "react";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

function HistoryDate(props) {
  const date = props.date
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/");
  return (
    <div className="history-date-wrapper">
      <CalendarMonthRoundedIcon fontSize="large" />
      <div className="history-date">
        <div className="date-month-day">
          <span>{date[1] + "." + date[0]}</span>
        </div>
        <div className="date-year">
          <span>{date[2]}</span>
        </div>
      </div>
    </div>
  );
}

export default HistoryDate;
