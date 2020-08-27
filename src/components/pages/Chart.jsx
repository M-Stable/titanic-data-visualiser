import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Grid from "@material-ui/core/Grid";
import { Typography, Container, Button } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";

function Chart(props) {
  const { chartData, loading } = props;

  const gender = [
    {
      name: "Males",
      people: chartData.male,
    },
    {
      name: "Females",
      people: chartData.female,
    },
  ];

  const embarked = [
    {
      name: "Cherbourg",
      people: chartData.c,
    },
    {
      name: "Queenstown",
      people: chartData.q,
    },
    {
      name: "Southampton",
      people: chartData.s,
    },
  ];

  const survived = [
    {
      name: "Yes",
      people: chartData.survived,
    },
    {
      name: "No",
      people: chartData.dead,
    },
  ];

  const ticketClass = [
    {
      name: "Cheap",
      people: chartData.cheap,
    },
    {
      name: "Regular",
      people: chartData.regular,
    },
    {
      name: "Expensive",
      people: chartData.expensive,
    },
  ];

  return (
    <div>
      {!loading ? (
        <LinearProgress />
      ) : (
        <Container>
          <Grid container justify="center" spacing={10}>
            <Grid item container justify="center" xs={12}>
              <Typography variant="h2">Charts by filtered data</Typography>
            </Grid>
            <Grid item container direction="column" alignItems="center" xs={6}>
              <Typography>Number of males and females</Typography>
              <BarChart width={400} height={400} data={gender}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="people" fill="#327F73" />
              </BarChart>
            </Grid>
            <Grid item container direction="column" alignItems="center" xs={6}>
              <Typography>Places where passengers embarked</Typography>
              <BarChart width={400} height={400} data={embarked}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="people" fill="#449A7B" />
              </BarChart>
            </Grid>
            <Grid item container direction="column" alignItems="center" xs={6}>
              <Typography>Number that survived</Typography>
              <BarChart width={400} height={400} data={survived}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="people" fill="#64B47D" />
              </BarChart>
            </Grid>
            <Grid item container direction="column" alignItems="center" xs={6}>
              <Typography>Ticket count by class</Typography>
              <BarChart width={400} height={400} data={ticketClass}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="people" fill="#8ECD79" />
              </BarChart>
            </Grid>
            <Grid item container justify="center" xs={12}>
              <Link to={"/data"} style={{ textDecoration: "none" }}>
                <Button size="large" variant="outlined" color="primary">
                  Change filters
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
}

export default Chart;
