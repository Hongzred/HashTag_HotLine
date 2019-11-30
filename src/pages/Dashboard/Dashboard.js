import React, { Component } from "react";
import MainConsole from "../../components/MainConsole/MainConsole";
import Map from "../../components/Map/Map";
import MapControls from "../../components/MapControls/MapControls";
import TagCloud from "../../components/TagCloud/TagCloud";
import fakeReports from "../../utils/fakeMapReports";
import {listReports} from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export default class Dashboard extends Component {
  state = {
    reports: []
  };

  async componentDidMount () {
     const reportData = await API.graphql(graphqlOperation(listReports));
     console.log("data" + reportData);
     const reports = [];
     if (reportData) {
     reportData.forEach(data => {
         const report = {
            "_id": data.id,
            "report": data.username,
            "description": data.post,
            "latitude": data.latitude,
            "longitude": data.longitude
         };
         reports.push(report);
     })
     console.log(reports);
    }
  }

  getReportData () {

  }

  render() {
    return (
      <MainConsole horizontal_controls="top">
        <Map
          width={"100%"}
          height={"100%"}
          zoom={10}
          latitude={40.73061}
          longitude={-73.93524}
          issues={this.state.reports}
        ></Map>
        <MapControls></MapControls>
        <TagCloud></TagCloud>
      </MainConsole>
    );
  }
}
