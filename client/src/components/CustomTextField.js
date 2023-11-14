import React from "react";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from "@mui/material/TextField";
const CustomTextField = (props) => {
  const { value, name, placeholder, onChange, error, fullWidth, type } = props;
  return (
    <TextField
      id={name}
      name={name}
      placeholder={placeholder}
      InputProps={{ disableUnderline: true }}
      InputLabelProps={{ shrink: true }}
      onChange={onChange}
      type={type == "password" ? "password" : "text"}
      fullWidth={fullWidth}
      value={value}
      variant="filled"
      className="inputButton"
      sx={{ mb: "10px" }}
      error={error}
      helperText={error}
    />
  );
};
export default CustomTextField;
