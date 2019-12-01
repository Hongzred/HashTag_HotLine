import React from 'react'
import MainConsole from '../../components/MainConsole/MainConsole'
import Map from '../../components/Map/Map'
import MapControls from '../../components/MapControls/MapControls'
import TagCloud from '../../components/TagCloud/TagCloud'
import fakeReports from '../../utils/fakeMapReports'

export default function Dashboard() {
  return (
    <>
      <MainConsole horizontal_controls="top">
        <Map
          width="100%"
          height="100%"
          zoom={10}
          latitude={40.73061}
          longitude={-73.93524}
          issues={fakeReports()}
        />
        <MapControls />
        <TagCloud />
      </MainConsole>
    </>
  )

// import React, { Component } from "react";
// import MainConsole from "../../components/MainConsole/MainConsole";
// import Map from "../../components/Map/Map";
// import MapControls from "../../components/MapControls/MapControls";
// import TagCloud from "../../components/TagCloud/TagCloud";
// import fakeReports from "../../utils/fakeMapReports";
// import { listReports } from "../../graphql/queries";
// import { API, graphqlOperation } from "aws-amplify";

// export default class Dashboard extends Component {
//   /**
//    * state contains list of report of type report
//    */

//   state = {
//     reports: []
//   };

//   /**
//    * updates state after components mounted
//    */
//   async componentDidMount() {
//     const reportsData = await this.getReportData();
//     console.log(reportsData);
//     this.setState({ reports: reportsData });
//   }
//   /**
//    * call listReports query and extract useful information for the use of map component
//    * @returns reports[]
//    */
//   async getReportData() {
//     const reportData = await API.graphql(graphqlOperation(listReports));
//     console.log(reportData);
//     const reports = [];

//     reportData.data.listReports.items.forEach(data => {
//       const report = {
//         _id: data.id,
//         report: data.username,
//         description: data.post,
//         latitude: data.latitude,
//         longitude: data.longtitude
//       };
//       reports.push(report);
//     });
//     return reports;
//   }
//   /**
//    * render map component, control components and tags componets
//    * @returns mainconsole layout
//    */
//   render() {
//     return (
//       <MainConsole horizontal_controls="top">
//         <Map
//           width={"100%"}
//           height={"100%"}
//           zoom={10}
//           latitude={40.73061}
//           longitude={-73.93524}
//           issues={this.state.reports}
//         ></Map>
//         <MapControls></MapControls>
//         <TagCloud></TagCloud>
//       </MainConsole>
//     );
//   }

}
