import React from "react";

import Grid from "@material-ui/core/Grid";
// tab material
import Task from "../task/Task";

const Menu = () => {
  return (
    <div>
      <Grid container xs={12} justify="center" style={{paddingBottom:"5em"}}>
        <Task />
      </Grid>
    </div>
  );
};

export default Menu;
