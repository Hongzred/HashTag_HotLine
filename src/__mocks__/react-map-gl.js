import React from 'react'


const ReactMapGL = ({height, width, latitude, longitude, mapstyle,zoom}) => {

    return (
        <div data-testid="mapbox" style={{width, height}} >
            {JSON.stringify({latitude, longitude, mapstyle,zoom})}
        </div>
    )
}


export default  ReactMapGL



