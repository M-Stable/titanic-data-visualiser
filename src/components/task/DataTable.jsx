import React, { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
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
} from "@material-ui/core";

function DataTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    embarked,
    survived,
    gender,
    ticket,
    data,
    filteredData,
    setFilteredData,
    updateChartData,
  } = props;

  //check if screen size is medium
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  //functions to change the data table page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //If no filters have been applied, show all records
  function allFalse(filterList) {
    for (var filter in filterList) if (filterList[filter]) return false;
    return true;
  }

  //Checks if filter is applied, filters data and updates values for the charts
  useEffect(() => {
    if (data !== undefined) {
      const dataByEmbarked = data.filter(
        (record) => allFalse(embarked) || embarked[record.fields.embarked]
      );
      const dataBySurvived = dataByEmbarked.filter(
        (record) => allFalse(survived) || survived[record.fields.survived]
      );
      const dataByGender = dataBySurvived.filter(
        (record) => allFalse(gender) || gender[record.fields.sex]
      );
      const filteredData = dataByGender.filter(
        (record) => allFalse(ticket) || ticket[record.fields.fare]
      );
      setFilteredData(filteredData);
      updateChartData(filteredData);
    }
  }, [embarked, survived, gender, ticket, data]);

  /*Ticket, PClass, ParCH and Cabin columns will be hidden if screensize is smaller.
   Mapping cannot be used for this reason*/

  //generate table cells for headers
  function HeaderList() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Sex</TableCell>
          <TableCell>Survived</TableCell>
          <TableCell>Fare</TableCell>
          {matches && <TableCell>Ticket</TableCell>}
          <TableCell>Embarked</TableCell>
          {matches && <TableCell>PClass</TableCell>}
          {matches && <TableCell>ParCh</TableCell>}
          {matches && <TableCell>Cabin</TableCell>}
        </TableRow>
      </TableHead>
    );
  }
  //generate table cells for body
  function DataList(props) {
    const data = props.data;
    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((obj, i) => (
        //Due to missing properties, mapping will not guarantee correct order
        //This makes sure that information matches headers
        <TableRow key={`Row_${i}`}>
          <TableCell align="left" style={{ width: "350px" }}>
            {obj.fields.name}
          </TableCell>
          <TableCell>{obj.fields.age}</TableCell>
          <TableCell>{obj.fields.sex}</TableCell>
          <TableCell>{obj.fields.survived}</TableCell>
          <TableCell style={{ width: "100px" }}>{obj.fields.fare}</TableCell>
          {matches && (
            <TableCell style={{ width: "150px" }}>
              {obj.fields.ticket}
            </TableCell>
          )}
          <TableCell>{obj.fields.embarked}</TableCell>
          {matches && <TableCell>{obj.fields.pclass}</TableCell>}
          {matches && <TableCell>{obj.fields.parch}</TableCell>}
          {matches && (
            <TableCell style={{ width: "100px" }}>{obj.fields.cabin}</TableCell>
          )}
        </TableRow>
      ));
  }

  return (
    <div>
      <Card style={{margin: "0 100px 0 100px"}}>
        <CardContent>
          <Typography>Passengers of Titanic (1912)</Typography>
          <Table size={"medium"}>
            <HeaderList />
            <TableBody>
              <DataList data={filteredData} />
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default DataTable;
