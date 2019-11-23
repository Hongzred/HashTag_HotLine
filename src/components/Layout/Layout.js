import React from "react";
import classnames from "classnames";
// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import PageTitle from '../PageTitle/PageTitle'
import Copyright from '../Copyright/Copyright'


// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar navigation={props.navigation}/>
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
              <PageTitle title={props.title}/>
              {React.createElement(props.page)}
              <Copyright/>
      
          </div>
        </>
    </div>
  );
}

export default Layout;
