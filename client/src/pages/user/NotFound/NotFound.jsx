import { Grid, Typography } from "@mui/material";
import React from "react";

function NotFound() {
  return (
    <>
      <Grid>
        <Grid item>
          <Typography
            align="center"
            fontWeight={"bold"}
            fontSize={100}
            marginTop={20}
          >
            404
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" fontSize={40}>
            Page Not Found
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default NotFound;
