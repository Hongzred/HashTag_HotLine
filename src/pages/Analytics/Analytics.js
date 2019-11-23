import React, {useState} from "react";
import MainConsole from "../../components/MainConsole/MainConsole"
import TweetChart from '../../components/TweetCharts/TweetChart'
import TweetChartsControls from '../../components/TweetChartsControls/TweetChartsControls'
import {dashboardTheme} from '../../components/Dashboard2/DashboardTheme'
import { makeStyles } from "@material-ui/core/styles";


export default function Analytics(props) {
  const useStyles = makeStyles(dashboardTheme);
  const classes = useStyles();
  const [chartType, setChartType] = useState("Day")

  return (
    <>
    <MainConsole classes={classes}>
                        <TweetChart chartType={chartType}/>
                        <TweetChartsControls click={setChartType} classes={classes}/>
                    </MainConsole> 
    </>
  );
}
