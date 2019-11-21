// React Includes
import React from 'react';

//Material UI Includes
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from "@material-ui/core/styles";

// React-Router Includes
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// Other Includes
import clsx from "clsx";

// HashtagHotline Includes
import VirtualizedList from '../TwitterFeed/TwitterFeed.js'
import TweetChart from '../TweetCharts/TweetChart'

export default function MainConsole(props) {

    const classes = props.classes;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    return(
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>

                {/* Primary Information Paper (Maps, Graphs, etc.) */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        {/**/}
                        <TweetChart chartType={props.chartType}/>
                        {/**/}
                    </Paper>
                </Grid>

                {/* Secondary Information (Twitter Feed, Controls) */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>

                    </Paper>
                </Grid>

                {/*Footer Controls*/}
                <Grid item xs={12}>
                    <Paper className={classes.paper}></Paper>
                </Grid>
            </Grid>
        </Container>
    )
}