import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Pin from "../Pin/Pin";
import MapPopup from "../MapPopup/MapPopup";

class Map extends React.Component {
    state = {
        viewport: {
            width: this.props.width,
            height: this.props.height,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            zoom: this.props.zoom
        },
        popupInfo: null
    };

    popupCloseHandler = () => {
        this.setState({ popupInfo: null });
    }
    
    pinClickHandler(data) {
        const popupInfo = this.state.popupInfo ? null : data;
        this.setState({ popupInfo });
    }

    createMarkers(issues) {
        if (issues) {
            const markers = issues.map(
                ({ latitude, longitude, description, id }) => (
                    <Marker
                        key={id}
                        latitude={latitude}
                        longitude={longitude}
                        offsetLeft={-10}
                        offsetTop={-25}
                    >
                        <Pin
                            pinClickHandler={this.pinClickHandler.bind(this, {
                                latitude,
                                longitude,
                                description
                            })}
                        />
                    </Marker>
                )
            );
            return markers;
        }
    }

    showPopUp() {
        const { popupInfo } = this.state;
        return (
            popupInfo && (
                <MapPopup
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    description={popupInfo.description}
                    popupCloseHandler={this.popupCloseHandler}
                />
            )
        );
    }

    render() {
        return (
            <ReactMapGL
                mapboxApiAccessToken="pk.eyJ1IjoiaGFzaHRhZ2hvdGxpbmUiLCJhIjoiY2syNWZtb2dyMGY5ejNobnJ6Mzh6ZWd1NyJ9.Nba6zcSBIodM09hWORbhHA"
                mapStyle={
                    "mapbox://styles/hashtaghotline/ck267dj38ia161cowt67mt6lb" ||
                    "mapbox://styles/hashtaghotline/ck2672kf95t691cpknmnqqn2h"
                }
                {...this.state.viewport}
                onViewportChange={viewport => this.setState({ viewport })}
            >
                {this.createMarkers(this.props.issues)}
                {this.showPopUp()}
            </ReactMapGL>
        );
    }
}

export default Map;
