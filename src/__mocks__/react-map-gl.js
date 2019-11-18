import React, { Component } from "react";
import { Visibility } from "@material-ui/icons";

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

class Popup extends Component {
    state = {
        hidden: false
    };
    render() {
        const popup = this.state.hidden || (
            <div data-testid="popup">
                {this.props.children}
                <button
                    data-testid="close_map_popup"
                    onClick={() => {
                        this.props.onClose();
                        this.setState({ hidden: true });
                    }}
                />
            </div>
        );

        return <div>{popup}</div>;
    }
}

export default ReactMapGL;
export { Marker, Popup };
