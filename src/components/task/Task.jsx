import React, { useState } from "react";
import DataTable from "./DataTable";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

// Use the following url to access the data
// https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=1000
// HINT: You should use "fetch".
// If you have trouble with this, you can access a subset of the data through the uncommenting import "data" file above
// console.log(data);

// To find out about the fields inside the data, you can have a look at the data dictionary in the data description
// on Kaggle here
//  https://www.kaggle.com/c/titanic/data

/**This component renders the filterbox and datatable */

function Task(props) {
  //These are all the initial states for filtering. When user checks a checkbox,
  //the corresponding values are set to true and passed down to the datatable.
  const [embark, setEmbark] = useState({
    C: false,
    Q: false,
    S: false,
  });
  const [survive, setSurvive] = useState({
    Yes: false,
    No: false,
  });
  const [gender, setGender] = useState({
    female: false,
    male: false,
  });
  const [ticket, setTicket] = useState({
    Cheap: false,
    Regular: false,
    Expensive: false,
  });
  const {
    setChartData,
    data,
    filteredData,
    setFilteredData,
    loading,
    updateChartData,
  } = props;

  //functions to update filter state
  const handleEmbarkChange = (event) => {
    setEmbark({ ...embark, [event.target.name]: event.target.checked });
  };

  const handleSurviveChange = (event) => {
    setSurvive({ ...survive, [event.target.name]: event.target.checked });
  };

  const handleGenderChange = (event) => {
    setGender({ ...gender, [event.target.name]: event.target.checked });
  };

  const handleTicketChange = (event) => {
    setTicket({ ...ticket, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Card style={{ padding: 15, margin: "0 100px 0 100px" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item container xs={11}>
            <Grid item xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Embarked</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleEmbarkChange}
                        name="C"
                      />
                    }
                    label="C"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleEmbarkChange}
                        name="Q"
                      />
                    }
                    label="Q"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleEmbarkChange}
                        name="S"
                      />
                    }
                    label="S"
                    labelPlacement="bottom"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Survived</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleSurviveChange}
                        name="Yes"
                      />
                    }
                    label="Yes"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleSurviveChange}
                        name="No"
                      />
                    }
                    label="No"
                    labelPlacement="bottom"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleGenderChange}
                        name="female"
                      />
                    }
                    label="Female"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleGenderChange}
                        name="male"
                      />
                    }
                    label="Male"
                    labelPlacement="bottom"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Ticket Class</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleTicketChange}
                        name="Cheap"
                      />
                    }
                    label="$"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleTicketChange}
                        name="Regular"
                      />
                    }
                    label="$$"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleTicketChange}
                        name="Expensive"
                      />
                    }
                    label="$$$"
                    labelPlacement="bottom"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Link to={"/chart"} style={{ textDecoration: "none" }}>
              <Button fullWidth variant="outlined" color="primary">
                View Charts
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Card>
      <br />
      <DataTable
        embarked={embark}
        survived={survive}
        gender={gender}
        ticket={ticket}
        setChartData={setChartData}
        data={data}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        loading={loading}
        updateChartData={updateChartData}
      />
    </div>
  );
}

export default Task;
