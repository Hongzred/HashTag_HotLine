import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import Pin from '../Pin/Pin'
import MapPopup from '../MapPopup/MapPopup'

/**
 * GettingStarted Component
 * 
 * 	-this contains all user needs to know in order to use the app
 * @param
 * @param {number} width
 * @param {number} height
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {number} zoom
 * @param {object} issues Ex: [{location: { latitude: 40.73061, longitude: -73.935242 },description: 'description1',id: '123',},{location: { latitude: 40.74161, longitude: -73.946242 },description: 'description2',id: '321',},]
 */
class Map extends React.Component {
	state = {
		viewport: {
			width: this.props.width,
			height: this.props.height,
			latitude: this.props.latitude,
			longitude: this.props.longitude,
			zoom: this.props.zoom,
		},
		popupInfo: null,
	}

	popupCloseHandler = () => {
		this.setState({ popupInfo: null })
	}

	pinClickHandler(data) {
		this.setState(prevState => {
			return prevState.popupInfo
				? { popupInfo: null }
				: { popupInfo: data }
		})
	}

	createMarkers(issues) {
		if (issues) {
			const markers = issues.map(
				({
					location: { longitude, latitude },
					post: description,
					id: _id,
				}) => (
					<Marker
						key={_id}
						latitude={latitude}
						longitude={longitude}
						offsetLeft={-10}
						offsetTop={-25}
					>
						<Pin
							key={_id}
							pinClickHandler={this.pinClickHandler.bind(this, {
								latitude,
								longitude,
								description,
							})}
						/>
					</Marker>
				),
			)
			return markers
		}
		return null
	}

	showPopUp() {
		const { popupInfo } = this.state
		return (
			popupInfo && (
				<MapPopup
					longitude={popupInfo.longitude}
					latitude={popupInfo.latitude}
					description={popupInfo.description}
					popupCloseHandler={this.popupCloseHandler}
				/>
			)
		)
	}

	render() {
		return (
			<ReactMapGL
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
				mapStyle={
					'mapbox://styles/hashtaghotline/ck267dj38ia161cowt67mt6lb' ||
					'mapbox://styles/hashtaghotline/ck2672kf95t691cpknmnqqn2h'
				}
				{...this.state.viewport}
				onViewportChange={viewport => this.setState({ viewport })}
			>
				{this.createMarkers(this.props.issues)}
				{this.showPopUp()}
			</ReactMapGL>
		)
	}
}

export default Map
