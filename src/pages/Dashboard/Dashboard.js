import React from "react";
import MainConsole from "../../components/MainConsole/MainConsole"
import Map from '../../components/Map/Map'
import MapControls from '../../components/MapControls/MapControls'
import fakeReports from "../../utils/fakeMapReports"
import {dashboardTheme} from '../../components/Dashboard2/DashboardTheme'
import { makeStyles } from "@material-ui/core/styles";



export default function Dashboard(props) {
  const useStyles = makeStyles(dashboardTheme);
  const classes = useStyles();
  return (
    <>
      <MainConsole classes={classes}>
          <Map width={"100%"} height={"100%"} zoom={10}
              latitude= {40.73061} longitude={-73.93524} 
              issues={fakeReports()}
          />
          <MapControls/>
      </MainConsole>
    </>
  );
}
