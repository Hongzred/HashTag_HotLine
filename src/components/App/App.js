import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dashboard from "../Dashboard/Dashboard";
import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports.js";
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';

Amplify.configure(awsconfig);

const query =  `
query list {
    listTweets (filter: {
      description: {
        contains: "test"
      }
    }){
      items {
        id
        description
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    input: {
        display: "none"
    }
}));

class App extends Component {
    state = {tweet: []};
    async componentDidMount() {
        const data = await API.graphql(graphqlOperation(query));
        console.log(data);
        this.setState({
            tweet: data.data.listTweets.items
        })
    }
    render() {
    // const classes = useStyles();
    return (
        <div className="App">
            <Dashboard></Dashboard>
            <p>{
                this.state.tweet.map((tweet, index) => (
                    <p key={index}>{tweet.description}</p>
                ))
            }</p>
        </div>
    );
}
}

export default withAuthenticator(App, true);