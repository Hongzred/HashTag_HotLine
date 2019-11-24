import React from "react";
import MainConsole from "../../components/MainConsole/MainConsole";
import Map from "../../components/Map/Map";
import MapControls from "../../components/MapControls/MapControls";
import TagCloud from "../../components/TagCloud/TagCloud"
import fakeReports from "../../utils/fakeMapReports";

export default function Dashboard(props) {
    return (
        <>
            <MainConsole horizontal_controls='top'>
                <Map
                    width={"100%"}
                    height={"100%"}
                    zoom={10}
                    latitude={40.73061}
                    longitude={-73.93524}
                    issues={fakeReports()}
                />
                <MapControls />
                <TagCloud />
            </MainConsole>
        </>
    );
}
