import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Pin from "../Pin/Pin";

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
                <Popup
                    tipSize={5}
                    anchor="top-right"
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeOnClick={true}
                    onClose={() => this.setState({ popupInfo: null })}
                >
                    <div>
                        <h6>Location:{popupInfo.latitude}-{popupInfo.longitude}</h6>
                        <h6>Report:{popupInfo.description}</h6>
                    </div>
                </Popup>
            )
        );
    }

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
            >
                {this.createMarkers(this.props.issues)}
                {this.showPopUp()}
            </ReactMapGL>
        );
    }
}

export default Map;
