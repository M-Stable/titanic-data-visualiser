import React, { useState, useEffect } from "react";
import axios from "axios";
import Data from "./pages/Data";
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
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import Home from "./pages/Home";
import Chart from "./pages/Chart";

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
};

const App = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const allTabs = ["/", "/data", "/chart"];
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [loading, setLoading] = useState(false);
  //Chart data will be gathered from here. Every time a data filter is applied, the values are updated.
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

  //fetches data, set loading to true while fetching
  const getData = async () => {
    await axios
      .get(
        "https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=1000"
      )
      .then((result) => {
        const records = result.data.records;
        records.map((record) => {
          //Some records have missing age and cabin. Set default to N/A
          !("cabin" in record.fields) && (record.fields.cabin = "N/A");
          !("age" in record.fields) && (record.fields.age = "N/A");

          const farePrice = record.fields.fare;
          if (farePrice > 0 && farePrice <= 20) record.fields.fare = "Cheap";
          else if (farePrice > 20 && farePrice <= 100)
            record.fields.fare = "Regular";
          else if (farePrice > 100) record.fields.fare = "Expensive";

          //make sure there's no long floats
          if (record.fields.age < 1) record.fields.age = "<1";
        });
        //remove any records that did not pay for a fare
        setData(records.filter((record) => record.fields.fare !== 0));
        setFilteredData(records.filter((record) => record.fields.fare !== 0));
        //necessary if no filters are applied. Chart values are set to default.
        updateChartData(records.filter((record) => record.fields.fare !== 0));
      });
    setLoading(true);
  };

  //fetch data on initial render
  useEffect(() => {
    getData();
  }, []);

  //This function will update the chart data by counting the number of records that
  // match the condition.
  function updateChartData(records) {
    const males = records.filter((obj) => obj.fields.sex === "male").length;
    const females = records.filter((obj) => obj.fields.sex === "female").length;
    const c = records.filter((obj) => obj.fields.embarked === "C").length;
    const q = records.filter((obj) => obj.fields.embarked === "Q").length;
    const s = records.filter((obj) => obj.fields.embarked === "S").length;
    const survived = records.filter((obj) => obj.fields.survived === "Yes")
      .length;
    const dead = records.filter((obj) => obj.fields.survived === "No").length;
    const cheap = records.filter((obj) => obj.fields.fare === "Cheap").length;
    const regular = records.filter((obj) => obj.fields.fare === "Regular")
      .length;
    const expensive = records.filter((obj) => obj.fields.fare === "Expensive")
      .length;

    setChartData({
      male: males,
      female: females,
      c: c,
      q: q,
      s: s,
      survived: survived,
      dead: dead,
      cheap: cheap,
      regular: regular,
      expensive: expensive,
    });
  }

  //Wrap with a theme provider to pass down the custom theme. Use tabs to route between different pages.
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className={"app"}>
          <Route
            path="/"
            render={({ location }) => (
              <React.Fragment>
                {/* Slide so that app bar hides when scrolled */}
                <Slide appear={false} direction="down" in={!trigger}>
                  {/* APP BAR */}
                  <AppBar position="sticky" className={"app-bar"}>
                    <Toolbar>
                      {/* TOP LEFT LOGO */}
                      <DirectionsBoatIcon style={{ marginRight: "10px" }} />
                      <Typography className={classes.logo} variant="h6" noWrap>
                        Titanic Passengers
                      </Typography>
                      {/* TOP RIGHT TABS */}
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
                {/* Anchor for scroll to top. Home page does not need this */}
                {!isHome() && <Toolbar id="back-to-top-anchor" />}
                {/* ROUTING INFORMATION. Renders pages based on link */}
                <div>
                  <Switch>
                    <Route
                      path={allTabs[1]}
                      render={() => (
                        <Data
                          setChartData={setChartData}
                          data={data}
                          filteredData={filteredData}
                          setFilteredData={setFilteredData}
                          loading={loading}
                          updateChartData={updateChartData}
                        />
                      )}
                    />
                    <Route
                      path={allTabs[2]}
                      render={() => (
                        <Chart chartData={chartData} loading={loading} />
                      )}
                    />
                    <Route path={allTabs[0]} render={() => <Home />} />
                  </Switch>
                </div>
                {/* SCROLL UP BUTTON */}
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
