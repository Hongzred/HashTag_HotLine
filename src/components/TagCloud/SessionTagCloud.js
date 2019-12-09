import React from 'react'
import ChipInput from 'material-ui-chip-input'
import { UserStateContext } from '../../context/UserContext'

// TODO: Change defaultValue in the Chip Input to the session hashtags once
// Sam is done with that

export default function SessionTagCloud() {
	return (
		<UserStateContext.Consumer>
			{({sessionHashtags,onSessionHashtagsChange}) => (
				<ChipInput
					defaultValue={sessionHashtags.map(({name}) => name)}
					onChange={onSessionHashtagsChange}
					label="Hashtags and Filters"
					placeholder="Type temporary filters here."
					disableUnderline
				/>
			)}
		</UserStateContext.Consumer>
	)
}
