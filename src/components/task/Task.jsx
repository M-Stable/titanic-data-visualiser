import React, { useState } from "react";
import DataTable from "./DataTable";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";

// import data from "../../data";

// Use the following url to access the data
// https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=1000
// HINT: You should use "fetch".
// If you have trouble with this, you can access a subset of the data through the uncommenting import "data" file above
// console.log(data);

// To find out about the fields inside the data, you can have a look at the data dictionary in the data description
// on Kaggle here
//  https://www.kaggle.com/c/titanic/data

function Task(props) {

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
  const [loading, setLoading] = useState(false);

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
      {loading && (
        <Card style={{ padding: 15}}>
          <Grid container direction="row" justify="center" alignItems="center">
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
                    labelPlacement="start"
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
                    labelPlacement="start"
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
                    labelPlacement="start"
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
                    labelPlacement="start"
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
                    labelPlacement="start"
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
                    labelPlacement="start"
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
                    labelPlacement="start"
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
                    label="Cheap"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleTicketChange}
                        name="Regular"
                      />
                    }
                    label="Regular"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleTicketChange}
                        name="Expensive"
                      />
                    }
                    label="Expensive"
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      )}
      <br />
      <DataTable
        embarked={embark}
        survived={survive}
        gender={gender}
        ticket={ticket}
        setLoading={setLoading}
        setChartData={props.setChartData}
        chartData={props.chartData}
      />
    </div>
  );
}

export default Task;
