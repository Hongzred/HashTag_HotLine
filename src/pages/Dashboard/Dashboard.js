import React from "react";
import MainConsole from "../../components/MainConsole/MainConsole";
import Map from "../../components/Map/Map";
import MapControls from "../../components/MapControls/MapControls";
import fakeReports from "../../utils/fakeMapReports";

export default function Dashboard(props) {
    return (
        <>
            <MainConsole>
                <Map
                    width={"100%"}
                    height={"100%"}
                    zoom={10}
                    latitude={40.73061}
                    longitude={-73.93524}
                    issues={fakeReports()}
                />
                <MapControls />
            </MainConsole>
        </>
    );
}
