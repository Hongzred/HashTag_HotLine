import React, {Component} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'


export default class Tag extends Component {
	state = {
		isDisable: false,
		label: this.props.label
	}

	toggleIcon = () => {
		const {isDisable} = this.state
		if (isDisable) {
			return <HighlightOffIcon />
		}
		return <AddCircleIcon />
	}

	toggleHandler = () => {
		const {isDisable} = this.state
		if (isDisable) {
			this.props.onDisable(this.props.label)
		}else {
			this.props.onEnable(this.props.label)
		}		
		this.setState(({isDisable})=>({
			isDisable:!isDisable
		}))
	}

	render(){
		return (
			<Chip
				label={this.props.label}
				onDelete={this.toggleHandler}
				deleteIcon={this.state.isDisable ? <HighlightOffIcon /> : <AddCircleIcon />}
			/>
		)
	}
}
