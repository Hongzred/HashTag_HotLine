import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Layout
import Layout from "./Layout/Layout";

// pages
import Dashboard from "../pages/Dashboard/Dashboard";
import Analytics from "../pages/Analytics/Analytics";
import Feed from "../pages/Feed/Feed";
import Settings from "../pages/Settings/Settings";
import Error from "../pages/Error/Error";

//aws
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { withAuthenticator } from "aws-amplify-react";
Amplify.configure(awsconfig);

const routes = [
    { path: "/", title: "Overview", page: Dashboard },
    { path: "/analytics", title: "Analytics", page: Analytics },
    { path: "/feed", title: "Feed", page: Feed },
    { path: "/settings", title: "Settings", page: Settings }
];

const App = () => {
    const navigation = routes.map(({ path, title }) => ({
        link: path,
        label: title
    }));
    return (
        <Router>
            <Switch>
                {routes.map(({ path, page, title }, index) => (
                    <Route
                        key={index}
                        exact
                        path={path}
                        component={() => (
                            <Layout
                                page={page}
                                title={title}
                                navigation={navigation}
                            />
                        )}
                    />
                ))}
                <Route component={Error} />
            </Switch>
        </Router>
    );
};

export default withAuthenticator(App);