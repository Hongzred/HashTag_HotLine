import React from "react";
import ReactMapGL from "react-map-gl";

class Map extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        viewport: {
            width: this.props.width,
            height: this.props.height,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            zoom: this.props.zoom
        }
    };

    render() {
        return (
            <ReactMapGL
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle={
                    "mapbox://styles/hashtaghotline/ck267dj38ia161cowt67mt6lb" ||
                    "mapbox://styles/hashtaghotline/ck2672kf95t691cpknmnqqn2h"
                }
                {...this.state.viewport}
                onViewportChange={viewport => this.setState({ viewport })}
            />
        );
    }
}

export default Map;
