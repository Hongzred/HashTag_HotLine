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

//random stuff I need. Make sure to pass in as props or something after done fixing.
    function distanceValueLabelFormat(value) {
        return distance_marks.findIndex(mark => mark.value === value) + 1;
    }
    function timeValueLabelFormat(value) {
        return time_marks.findIndex(mark => mark.value === value) + 1;
    }
    function valuetext(value) {
        return `${value}`;
    }


    const drawerWidth = 240;

    const distance_marks = [
        {
            value: 5,
            label: '5mi'
        },
        {
            value: 25,
            label: '20mi'
        },
        {
            value: 50,
            label: '50mi'
        },
        {
            value: 100,
            label: '100mi'
        }
    ]

    const time_marks = [
        {
            value: 7,
            label: '1 week'
        },
        {
            value: 182,
            label: '6 months'
        },
        {
            value: 365,
            label: '1 year'
        },
    ]

    const useStyles = makeStyles(theme => ({
        root: {
            display: "flex"
        },
        toolbar: {
            paddingRight: 24 // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginRight: 36
        },
        menuButtonHidden: {
            display: "none"
        },
        title: {
            flexGrow: 1
        },
        drawerPaper: {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerPaperClose: {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9)
            }
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: "100vh",
            overflow: "auto"
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4)
        },
        paper: {
            padding: theme.spacing(4),
            display: "flex",
            overflow: "hidden",
            flexDirection: "column"
        },
        fixedHeight: {
            height: 540
        }
    }));
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    console.log(props.chartType)

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
                        {/**/}
                        <Typography id="distance-slider" gutterBottom>
                            Distance
                        </Typography>
                        <Slider 
                            defaultValue={5}
                            valueLabelFormat={distanceValueLabelFormat}
                            getAriaValueText={valuetext}
                            aria-labelledby="distance-slider"
                            step={null}
                            valueLabelDisplay="auto"
                            marks={distance_marks}
                            min={5}
                            valueLabelDisplay="off"
                        />
                        <Typography id="time-slider" gutterBottom>
                            Time
                        </Typography>
                        <Slider 
                            defaultValue={7}
                            valueLabelFormat={timeValueLabelFormat}
                            getAriaValueText={valuetext}
                            aria-labelledby="time-slider"
                            step={null}
                            valueLabelDisplay="auto"
                            marks={time_marks}
                            max={365}
                            valueLabelDisplay="off"
                        />
                        <VirtualizedList>
                        </VirtualizedList>
                        {/**/}
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper className={classes.paper}></Paper>
                </Grid>
            </Grid>
        </Container>
    )
}