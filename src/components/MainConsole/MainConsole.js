// React Includes
import React from 'react';

//Material UI Includes
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import useStyles from "./styles";


// Other Includes
import clsx from "clsx";


export default function MainConsole(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    if(props.horizontal_controls === 'bottom'){
        return(
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>

                    {/* Primary Information Paper (Maps, Graphs, etc.) */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            {/*<TweetChart chartType={props.chartType}/>*/}
                            {props.children[0]}
                            {/**/}
                        </Paper>
                    </Grid>

                    {/* Secondary Information (Twitter Feed, Controls) */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            {props.children[1]}
                        </Paper>
                    </Grid>

                    {/*Footer Controls*/}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {props.children[2]}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )        
    }
    else if(props.horizontal_controls === 'top'){
        return(
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>

                    {/*Header Controls*/}
                    <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {props.children[2]}
                            </Paper>
                    </Grid>

                    {/* Primary Information Paper (Maps, Graphs, etc.) */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            {/*<TweetChart chartType={props.chartType}/>*/}
                            {props.children[0]}
                            {/**/}
                        </Paper>
                    </Grid>

                    {/* Secondary Information (Twitter Feed, Controls) */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            {props.children[1]}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }

}