import React from "react";

const ReactMapGL = ({ height, width, children }) => {
    return (
        <div data-testid="mapbox" style={{ width, height }}>
            {children}
        </div>
    );
};

const Marker = ({ latitude, longitude, children }) => {
    return (
        <div data-testid="marker">
            <div>
                {latitude}:{longitude}
            </div>
            <div>{children}</div>
        </div>
    );
};

const Popup = ({ children }) => {
    return <div data-testid="popup">{children}</div>;
};

export default ReactMapGL;
export { Marker, Popup };
