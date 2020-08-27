import React from "react";

import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
// tab material
import Task from "../task/Task";

//Uses the loading to prop to show a progress bar when fetching data.
const Data = (props) => {
  const {
    setChartData,
    data,
    filteredData,
    setFilteredData,
    loading,
    updateChartData,
  } = props;
  return (
    <div>
      {!loading ? (
        <LinearProgress />
      ) : (
        <Grid
          container
          justify="center"
          style={{ paddingBottom: "2em" }}
        >
          <Task
            setChartData={setChartData}
            data={data}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            loading={loading}
            updateChartData={updateChartData}
          />
        </Grid>
      )}
    </div>
  );
};

export default Data;
