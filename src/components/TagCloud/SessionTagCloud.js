import React from 'react'
import ChipInput from 'material-ui-chip-input'
import { UserStateContext } from '../../context/UserContext'

export default function SessionTagCloud() {
	return (
		<UserStateContext.Consumer>
			{context => (
				<ChipInput
					defaultValue={context.state.settings.hashtags}
					label="Hashtags"
					onChange={context.onHashtagsChange}
					disableUnderline
				/>
			)}
		</UserStateContext.Consumer>
	)
}
