import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import HistoryDate from "./HistoryDate";
import HistoryDetails from "./HistoryDetails";

const data = [
  {
    date: new Date(),
    title: "Neque porro quisquam est qui",
    category: "Car body and main parts",
  },
  {
    date: new Date(),
    title: "Lorem ipsum dolor sit amet",
    category: "Interior",
  },
  {
    date: new Date(),
    title: "Maecenas fermentum scelerisque",
    category: "Power-train and chassis",
  },
  {
    date: new Date(),
    title: "Sed lacinia ipsum ac bibendum",
    category: "Miscellaneous auto parts",
  },
  {
    date: new Date(),
    title: "Nulla ullamcorper ac urna sit",
    category: "Power-train and chassis",
  },
  {
    date: new Date(),
    title: "Maecenas dictum eros nulla",
    category: "Interior",
  },
];

function History() {
  return (
    <List disablePadding>
      {data.map((item, index) => (
        <>
          <ListItem sx={{ px: 0 }}>
            <ListItemButton>
              <ListItemIcon>
                <HistoryDate date={item.date} />
              </ListItemIcon>
              <HistoryDetails title={item.title} category={item.category} />
            </ListItemButton>
          </ListItem>
          {index != data.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
}

export default History;
