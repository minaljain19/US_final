import React from "react";
import TableCell from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";
import "../App.css";
const CustomTableCell = ({ content, chipLabel, chipColor }) => (
  <TableCell style={{ width: "20%", fontWeight: "bold" }}>
    {content}
    {chipLabel && (
      <Chip className="ringingCall" label={chipLabel} color={chipColor} />
    )}
  </TableCell>
);

export default CustomTableCell;