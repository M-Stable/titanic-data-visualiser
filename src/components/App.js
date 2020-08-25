import React from "react";
import Menu from "./menu/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import './App.css';

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";

import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  appBar: {},
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
//tr
const App = () => {
  const trigger = useScrollTrigger();

  return (
    <div className={"app"}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar position="sticky" className={"app-bar"}>
          <Toolbar>
            <DirectionsBoatIcon style={{ marginRight: "10px" }} />
            <Typography variant="h6" noWrap>
              Titanic Passengers
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar id="back-to-top-anchor" />
      <Menu />
      <ScrollTop>
        <Fab style={{backgroundColor: "#44A08D"}} size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon style={{color: "ffffff"}}/>
        </Fab>
      </ScrollTop>
    </div>
  );
};

export default App;
