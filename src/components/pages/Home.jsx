import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ParticleComponent from "./ParticleComponent";

/** The home page for Titanic. Uses Particle library to create the
 * bubble effect in the background.
 * Uses css to fade in.
 */

const useStyles = makeStyles((theme) => ({
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingBottom: "25px",
    paddingTop: "25px",
    position: "relative",
    color: "#E8EBE2",
  },
  subheading: {
    fontSize: "35px",
    fontWeight: "bold",
    paddingBottom: "60px",
    textAlign: "center",
    position: "relative",
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: "7px",
    borderColor: theme.palette.primary,
    borderWidth: "3px",
    fontWeight: "bold",
    fontSize: "25px",
    padding: "15px 35px 15px 35px",
    "&:hover": {
      borderWidth: "3px",
      backgroundColor: "#205F58",
      color: "#ffffff",
    },
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Grid
      className={"welcome-page"}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ height: "calc(100vh - 65px)" }}
    >
      <ParticleComponent />
      <Grid item container direction="column" alignItems="center">
        <Typography className={classes.title} variant={"h1"}>
          Titanic
        </Typography>
        <Typography
          className={classes.subheading}
          variant={"h2"}
          color={"secondary"}
        >
          Dive into a deep look of the 1912 Titanic passengers
        </Typography>
        <Link to={"/data"} style={{ textDecoration: "none" }}>
          <Button
            variant={"outlined"}
            className={classes.button}
            color={"primary"}
          >
            View Data
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default Home;
