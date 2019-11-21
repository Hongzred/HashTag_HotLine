import React from 'react';

import Slider from '@material-ui/core/Slider';
import VirtualizedList from '../TwitterFeed/TwitterFeed.js'
import Typography from "@material-ui/core/Typography";

export default function MapControls(props) {

    const distance_marks = [
        {value: 5,   label: '5mi'},
        {value: 25,  label: '20mi'},
        {value: 50,  label: '50mi'},
        {value: 100, label: '100mi'}
    ]

    const time_marks = [
        {value: 7,   label: '1 week'},
        {value: 182, label: '6 months'},
        {value: 365, label: '1 year'}
    ]

    function distanceValueLabelFormat(value) {
        return distance_marks.findIndex(mark => mark.value === value) + 1;
    }
    function timeValueLabelFormat(value) {
        return time_marks.findIndex(mark => mark.value === value) + 1;
    }
    function valuetext(value) {
        return `${value}`;
    }

    return(
        <React.Fragment>
            <Typography id="distance-slider" gutterBottom>
                Distance
            </Typography>
            <Slider 
                defaultValue={5}
                valueLabelFormat={distanceValueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="distance-slider"
                step={null}
                valueLabelDisplay="auto"
                marks={distance_marks}
                min={5}
                valueLabelDisplay="off"
            />
            <Typography id="time-slider" gutterBottom>
                Time
            </Typography>
            <Slider 
                defaultValue={7}
                valueLabelFormat={timeValueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="time-slider"
                step={null}
                valueLabelDisplay="auto"
                marks={time_marks}
                max={365}
                valueLabelDisplay="off"
            />
            <VirtualizedList>
            </VirtualizedList>
        </React.Fragment>
    );
}