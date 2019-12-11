import React from 'react'
import { FormControl, InputLabel, Input, Button } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import { UserStateContext } from '../../context/UserContext'

const Settings = () => {
	return (
		<UserStateContext.Consumer>
			{context => (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						margin: 20,
						padding: 20,
					}}
				>
					<form style={{ width: '80%' }} onSubmit={context.onSave}>
						<ChipInput
							defaultValue={context.state.settings.hashtags.map(({name}) => name)}
							fullWidth
							label="Hashtags"
							placeholder="Type and press enter to add hashtags"
							onChange={context.onHashtagsChange}
						/>
						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="botMessage">
								Bot Message
							</InputLabel>
							<Input
								id="botMessage"
								type="text"
								onChange={context.onMessageChange}
								value={context.state.settings.botMessage}
							/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="resolvedMessage">
								Resolved Message
							</InputLabel>
							<Input
								id="resolvedMessage"
								type="text"
								onChange={context.onResolvedMessageChange}
								value={context.state.settings.resolvedMessage}
							/>
						</FormControl>
						<Button
							variant="contained"
							color="primary"
							size="medium"
							type="submit"
						>
							Save
						</Button>
					</form>
				</div>
			)}
		</UserStateContext.Consumer>
	)
}

export default Settings
