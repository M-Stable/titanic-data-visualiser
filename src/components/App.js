import React, {useState} from "react";
import Menu from "./menu/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  createMuiTheme,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import "./App.css";
import Home from "./menu/Home";
import Chart from "./menu/Chart";

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
  logo: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "20px",
    color: "white",
    width: "400px",
  },
}));

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 85,
      width: "100%",
      backgroundColor: theme.palette.primary.contrastText,
    },
    height: "2px",
  },
  root: {
    float: "right",
    paddingRight: "20px",
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "20px",
    color: "white",
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

//When the user scrolls down the page, the appbar will hide and a button
//on the bottom right will appear to scroll back to the top
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

//overried primary colors
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3F9786",
    },
    secondary: {
      main: "#093737",
    },
  },
});

//function to check if the user is home for conditional rendering
const isHome = () => {
  return window.location.pathname === "/";
}

const App = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const allTabs = ["/", "/data", "/chart"];
  const [chartData, setChartData] = useState({
    male: 0,
    female: 0,
    c: 0,
    q: 0,
    s: 0,
    survived: 0,
    dead: 0,
    cheap: 0,
    regular: 0,
    expensive: 0,
  });

  //Wrap with a theme provider to pass down the custom theme. Use tabs to route between different pages.
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className={"app"}>
          <Route
            path="/"
            render={({ location }) => (
              <React.Fragment>
                <Slide appear={false} direction="down" in={!trigger}>
                  <AppBar position="sticky" className={"app-bar"}>
                    <Toolbar>
                      <DirectionsBoatIcon style={{ marginRight: "10px" }} />
                      <Typography className={classes.logo} variant="h6" noWrap>
                        Titanic Passengers
                      </Typography>
                      <div style={{ width: "100%" }}>
                        <StyledTabs
                          value={location.pathname}
                          aria-label="styled tabs example"
                        >
                          <StyledTab
                            label="Home"
                            value="/"
                            component={Link}
                            to={allTabs[0]}
                          />
                          <StyledTab
                            label="Data"
                            value="/data"
                            component={Link}
                            to={allTabs[1]}
                          />
                          <StyledTab
                            label="Chart"
                            value="/chart"
                            component={Link}
                            to={allTabs[2]}
                          />
                        </StyledTabs>
                      </div>
                    </Toolbar>
                  </AppBar>
                </Slide>
                {!isHome() && <Toolbar id="back-to-top-anchor" />}
                <div>
                  <Switch>
                    <Route path={allTabs[1]} render={() => <Menu setChartData={setChartData} chartData={chartData}/>} />
                    <Route path={allTabs[2]} render={() => <Chart chartData={chartData}/>} />
                    <Route path={allTabs[0]} render={() => <Home />} />
                  </Switch>
                </div>
                <ScrollTop>
                  <Fab
                    style={{ backgroundColor: "#44A08D" }}
                    size="small"
                    aria-label="scroll back to top"
                  >
                    <KeyboardArrowUpIcon style={{ color: "ffffff" }} />
                  </Fab>
                </ScrollTop>
              </React.Fragment>
            )}
          />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
