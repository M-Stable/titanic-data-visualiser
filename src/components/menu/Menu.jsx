import React from "react";

import Grid from "@material-ui/core/Grid";
// tab material
import Task from "../task/Task";

const Menu = (props) => {
  return (
    <div>
      <Grid container xs={12} justify="center" style={{paddingBottom:"2em"}}>
        <Task setChartData={props.setChartData} chartData={props.chartData}/>
      </Grid>
    </div>
  );
};

export default Menu;
