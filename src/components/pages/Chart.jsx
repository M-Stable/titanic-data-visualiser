import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import Grid from "@material-ui/core/Grid";
import { Typography, Container, Button } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";

function Chart(props) {
  const { chartData, loading } = props;

  const gender = [
    {
      name: "M",
      people: chartData.male,
    },
    {
      name: "F",
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

  const RADIAN = Math.PI / 180;
  //To display correct pie chart information
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    payload,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={"middle"}
          dominantBaseline="central"
        >
          {`${payload.name + ": " + (percent * 100).toFixed(0)}%`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={"start"}
          fill="#333"
        >
          {payload.people}
        </text>
      </g>
    );
  };

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
              <Typography>Males to Female Ratio</Typography>
              <PieChart width={400} height={400}>
                <Pie
                  isAnimationActive={false}
                  data={gender}
                  cx={200}
                  cy={200}
                  label={renderCustomizedLabel}
                  dataKey="people"
                  nameKey="name"
                  outerRadius={100}
                  fill="#327F73"
                />
              </PieChart>
            </Grid>
            <Grid item container direction="column" alignItems="center" xs={6}>
              <Typography>Survival Ratio</Typography>
              <PieChart width={400} height={400}>
                <Pie
                  isAnimationActive={false}
                  data={survived}
                  cx={200}
                  cy={200}
                  label={renderCustomizedLabel}
                  dataKey="people"
                  nameKey="name"
                  outerRadius={100}
                  fill="#449A7B"
                />
              </PieChart>
            </Grid>
            <Grid item container direction="column" alignItems="center" xs={6}>
              <Typography>Places where passengers embarked</Typography>
              <BarChart width={400} height={400} data={embarked}>
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
