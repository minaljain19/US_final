import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
export default function TabRow() {
  return (
    <TableRow>
      <TableCell className="heading" style={{ width: "14%" }}>
        S.No.
      </TableCell>
      <TableCell className="heading" style={{ width: "17%" }}>
        From
      </TableCell>
      <TableCell className="heading" style={{ width: "18%" }}>
        To
      </TableCell>
      <TableCell className="heading" style={{ width: "20%" }}>
        Date
      </TableCell>
      <TableCell className="heading" style={{ width: "13%" }}>
        Time
      </TableCell>
      <TableCell className="heading" style={{ width: "23%" }}>
        Duration
      </TableCell>
      <TableCell className="heading" style={{ width: "20%" }}>
        Recording
      </TableCell>
    </TableRow>
  );
}
