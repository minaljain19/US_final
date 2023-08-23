import React from "react";
import TextField from "@mui/material/TextField";
const CustomTextField = ({ value, name, placeholder, onChange, error, fullWidth }) => (
  <TextField
    id={name}
    name={name}
    placeholder={placeholder}
    InputProps={{ disableUnderline: true }}
    InputLabelProps={{ shrink: true }}
    onChange={onChange}
    fullWidth={fullWidth}
    value={value}
    variant="filled"
    className="inputButton"
    sx={{ mb: "10px" }}
    error={!!error}
    helperText={error}
  />
);

export default CustomTextField;