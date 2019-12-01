import React, {Component} from 'react'
import {Popup} from 'react-map-gl'
import reverseGeocode from '../../utils/reverseGeocode'

export default class MapPopup extends Component {
  state = {
    address: 'Loading...',
  }

  async componentDidMount() {
    const {latitude, longitude} = this.props
    const address = await reverseGeocode(latitude, longitude)
    this.setState({
      address,
    })
  }

  render() {
    return (
      <div>
        <Popup
          tipSize={5}
          anchor="top-right"
          longitude={this.props.longitude}
          latitude={this.props.latitude}
          closeOnClick
          onClose={this.props.popupCloseHandler}
        >
          <div>
            <h6 data-testid="location_popup">Location:{this.state.address}</h6>
            <h6 data-testid="report_popup">Report:{this.props.description}</h6>
          </div>
        </Popup>
      </div>
    )
  }
}
