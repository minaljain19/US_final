import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import logo from "./../logo22.png";
export default function Header() {
  return (
    <>
      <Box className="header" sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="appBar">
          <Toolbar>
            <Typography
              variant="h6"
              className="layerone"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={logo} className="logoStyle" />
            </Typography>
            {/* <Button color="inherit">Logout</Button> */}
            <Button>{/* <NotificationsNoneIcon /> */}</Button>
            <Button>{/* <AccountCircleIcon /> */}</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
