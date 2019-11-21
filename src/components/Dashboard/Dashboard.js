import React from "react";

import clsx from "clsx";

import { Route, BrowserRouter as Router } from 'react-router-dom'

// Material UI Imports
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
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from '@material-ui/core';

// HashtagHotline  Imports
import MainConsole from "../MainConsole/MainConsole"
import Map from '../Map/Map'
import MapControls from '../MapControls/MapControls'
import TweetChart from '../TweetCharts/TweetChart'
import TweetChartsControls from '../TweetChartsControls/TweetChartsControls'
import fakeReports from "../../utils/fakeMapReports"
import { mainListItems, secondaryListItems } from "../ListItems/listItems";
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

    // Set the Theme
    const useStyles = makeStyles(dashboardTheme);
    const classes = useStyles();

    // Initialize State
    const [open, setOpen] = React.useState(true);
    const [chartType, setChartType] = React.useState("Day")

    // Handlers
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Establish Routes
    const routes = [
        {
            path: '/map',
            exact: true,
            main: () => <MainConsole classes={classes}>
                            <Map width={"100%"} height={"100%"} zoom={10}
                                latitude= {40.73061} longitude={-73.93524} 
                                issues={fakeReports()}
                            />
                            <MapControls/>
                        </MainConsole>
        },
        {
            path: '/chart',
            exact: true,
            main: () => <MainConsole classes={classes}>
                            <TweetChart chartType={chartType}/>
                            <TweetChartsControls click={setChartType} classes={classes}/>
                        </MainConsole>    
        }
    ]


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

                    <Route path="/map" component={routes[0].main}></Route>
                    <Route path="/chart" component={routes[1].main}></Route>

                    <Copyright />
                </main>
            </div>
        </Router>
    );
}
