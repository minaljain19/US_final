import React from "react";
import TextField from "@mui/material/TextField";
export default function CText(props) {
  return (
    <TextField
      fullWidth
      value={props.value}
      InputProps={{ disableUnderline: true }}
      onChange={props.change}
      name={props.name}
      InputLabelProps={{ shrink: true }}
      variant="filled"
      className="inputButton"
      sx={{ mb: "10px" }}
    />
  );
}
