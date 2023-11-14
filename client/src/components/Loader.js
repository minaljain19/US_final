import React from "react";
import Grid from "@mui/material/Grid";
import { ThreeDots } from "react-loader-spinner";
export default function Loader() {
  return (
    <Grid className="threeDott">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="rgb(75, 70, 70)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Grid>
  );
}
