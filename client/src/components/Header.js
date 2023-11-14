import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import "../App.css";
import Typography from "@mui/material/Typography";
import logo from "../Assests/logo22.png";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
export default function Header(props) {


  return (

        <AppBar position="static" className={props.clsName}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              
            >
             <Button> <img src={logo} className="logoStyle" /></Button>
             </Typography>
             {props.name?(<>
              <Typography className="firstName">
              {props.name}
            </Typography>
            <Grid>
              <Button onClick={props.funName}>
                <Avatar>
                  {props?.name?.slice(0, 1)?.toUpperCase()}
                </Avatar>
              </Button>
            </Grid>
             </>):null}
          
       
          </Toolbar>
        </AppBar>
  
    
  );
}
