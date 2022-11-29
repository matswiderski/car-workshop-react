import Typography from "@mui/material/Typography";
function SummaryCard(props) {
  return (
    <>
      {props.children}
      <div className="card-text">
        <Typography variant="h4">{props.value}</Typography>
        <span>{props.text}</span>
      </div>
    </>
  );
}

export default SummaryCard;
