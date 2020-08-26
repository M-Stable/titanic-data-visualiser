import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, Label } from "recharts";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

function Chart(props) {
  const { chartData } = props;

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
    <Grid container justify="center">
      <Grid item>
        <Typography>Gender ratio</Typography>
        <BarChart width={400} height={400} data={gender}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="people" fill="#327F73" />
        </BarChart>
      </Grid>
      <Grid item>
      <Typography>Places where passengers embarked</Typography>
        <BarChart width={400} height={400} data={embarked}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="people" fill="#327F73" />
        </BarChart>
      </Grid>
      <Grid item>
      <Typography>Number that survived</Typography>
        <BarChart width={400} height={400} data={survived}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="people" fill="#327F73" />
        </BarChart>
      </Grid>
      <Grid item>
      <Typography>Ticket count by class</Typography>
        <BarChart width={400} height={400} data={ticketClass}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="people" fill="#327F73" />
        </BarChart>
      </Grid>
    </Grid>
  );
}

export default Chart;
