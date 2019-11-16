import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dashboard from "../Dashboard/Dashboard";
import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports";
import { withAuthenticator } from 'aws-amplify-react';
Amplify.configure(awsconfig);

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    input: {
        display: "none"
    }
}));

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <Dashboard></Dashboard>
        </div>
    );
}

export default withAuthenticator(App, true);
// export default App;