import React from 'react'
import ChipInput from 'material-ui-chip-input'
import { UserStateContext } from '../../context/UserContext'

// TODO: Change defaultValue in the Chip Input to the session hashtags once
// Sam is done with that

export default function SessionTagCloud() {
	return (
		<UserStateContext.Consumer>
			{context => (
				<ChipInput
					defaultValue={context.state.settings.hashtags}
					label="Temporary Session Hashtags"
					placeholder="Type temporary filters here."
					onChange={context.onHashtagsChange}
					disableUnderline
				/>
			)}
		</UserStateContext.Consumer>
	)
}
