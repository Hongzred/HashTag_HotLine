import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

class Map extends React.Component {
    state = {
        viewport: {
            width: this.props.width,
            height: this.props.height,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            zoom: this.props.zoom
        }
    };

    createMarkers(issues) {
        if (issues) {
            const markers = issues.map(
                ({ latitude, longitude, description, id }) => (
                    <Marker key={id} latitude={latitude} longitude={longitude}>
                        {description}
                    </Marker>
                )
            );
            return markers;
        }
    }

    render() {
        return (
            <ReactMapGL
                mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
                mapStyle={
                    "mapbox://styles/hashtaghotline/ck267dj38ia161cowt67mt6lb" ||
                    "mapbox://styles/hashtaghotline/ck2672kf95t691cpknmnqqn2h"
                }
                {...this.state.viewport}
                onViewportChange={viewport => this.setState({ viewport })}
            >
                {this.createMarkers(this.props.issues)}
            </ReactMapGL>
        );
    }
}

export default Map;
