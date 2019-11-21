import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slider from '@material-ui/core/Slider';
// import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { mainListItems, secondaryListItems } from "../ListItems/listItems";
import Map from '../Map/Map'
import TweetChart from '../TweetCharts/TweetChart'
import VirtualizedList from '../TwitterFeed/TwitterFeed.js'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Link } from '@material-ui/core';
import fakeReports from "../../utils/fakeMapReports"

import MainConsole from "../MainConsole/MainConsole"
import {dashboardTheme} from './DashboardTheme'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="#">
                Hashtag Hotline
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function Dashboard() {

    const drawerWidth = 240;
    const useStyles = makeStyles(dashboardTheme);
    const classes = useStyles();

    const routes = [
        {
            path: '/map',
            exact: true,
            main: () => <Map width={"100%"} height={"100%"} zoom={10}
                latitude= {40.73061}
                longitude={-73.93524} issues={fakeReports()}
            />
        },
        {
            path: '/chart',
            exact: true,
            main: () => <MainConsole chartType={chartType} classes={classes}/>    
        }
    ]

    const [open, setOpen] = React.useState(true);
    const [chartType, setChartType] = React.useState("Day")
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={clsx(classes.appBar, open && classes.appBarShift)}
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(
                                classes.menuButton,
                                open && classes.menuButtonHidden
                            )}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <AccountCircleIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(
                            classes.drawerPaper,
                            !open && classes.drawerPaperClose
                        )
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Route path="/chart" component={routes[1].main}></Route>

                    <Copyright />
                </main>
            </div>
        </Router>
    );
}
