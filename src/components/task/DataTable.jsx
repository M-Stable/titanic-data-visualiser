import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TablePagination,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";

const headCells = [
  { id: "name", label: "Name" },
  { id: "age", label: "Age" },
  { id: "sex", label: "Sex" },
  { id: "survived", label: "Survived" },
  { id: "fare", label: "Fare" },
  { id: "ticket", label: "Ticket" },
  { id: "embarked", label: "Embarked" },
  { id: "pclass", label: "PClass" },
  { id: "parch", label: "ParCh" },
  { id: "cabin", label: "Cabin" },
];

//generate table cells for headers
function HeaderList() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function DataTable() {
  const classes = useStyles();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          if (farePrice > 0 && farePrice <= 20) record.fields.fare = "Cheap"
          else if (farePrice > 20 && farePrice <=100) record.fields.fare = "Regular"
          else if (farePrice > 100) record.fields.fare = "Expensive"

          //make sure there's no long floats
          if (record.fields.age < 1) record.fields.age = "<1"
        });
        console.log(records);
        //remove any records that did not pay for a fare
        setData(records.filter(record => record.fields.fare !== 0));
      });
    setLoading(true);
  };

  //fetch data on initial render
  useEffect(() => {
    getData();
  }, []);

  //generate table cells for body
  function DataList(props) {
    const data = props.data;
    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((obj, i) => (
        //Due to missing properties, mapping will not guarantee correct order
        //This makes sure that information matches headers
        <TableRow key={`Row_${i}`}>
          <TableCell align="left" style={{width: "350px"}}>{obj.fields.name}</TableCell>
          <TableCell>{obj.fields.age}</TableCell>
          <TableCell>{obj.fields.sex}</TableCell>
          <TableCell>{obj.fields.survived}</TableCell>
          <TableCell style={{width: "100px"}}>{obj.fields.fare}</TableCell>
          <TableCell style={{width: "150px"}}>{obj.fields.ticket}</TableCell>
          <TableCell>{obj.fields.embarked}</TableCell>
          <TableCell>{obj.fields.pclass}</TableCell>
          <TableCell>{obj.fields.parch}</TableCell>
          <TableCell style={{width: "100px"}}>{obj.fields.cabin}</TableCell>
        </TableRow>
      ));
  }

  return (
    <Card style={{ width: "1700px" }}>
      {!loading ? (
        <CircularProgress />
      ) : (
        <CardContent>
          <Typography>List of all passengers of Titanic (1912)</Typography>
          <Table size={"medium"}>
            <HeaderList classes={classes} />
            <TableBody>
              <DataList data={data} />
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </CardContent>
      )}
    </Card>
  );
}

export default DataTable;
