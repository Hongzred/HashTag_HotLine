import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "../Dashboard/Dashboard";
import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports.js";
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
    return (
        <div className="App">
            <Dashboard></Dashboard>
        </div>
    );
}

export default withAuthenticator(App, true);