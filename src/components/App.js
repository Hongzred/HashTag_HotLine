import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import shortid from 'shortid'
// Layout
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import Layout from './Layout/Layout'

// pages
import Dashboard from '../pages/Dashboard/Dashboard'
import Analytics from '../pages/Analytics/Analytics'
import Feed from '../pages/Feed/Feed'
import Settings from '../pages/Settings/Settings'
import Error from '../pages/Error/Error'

// aws
import awsconfig from '../aws-exports'
import { UserProvider } from '../context/UserContext'

Amplify.configure(awsconfig)

const routes = [
	{
		path: '/',
		title: 'Overview',
		page: Dashboard,
	},
	{
		path: '/analytics',
		title: 'Analytics',
		page: Analytics,
	},
	{
		path: '/feed',
		title: 'Feed',
		page: Feed,
	},
	{
		path: '/settings',
		title: 'Settings',
		page: Settings,
	},
]

const App = () => {
	const navigation = routes.map(({ path, title }) => ({
		id: shortid.generate(),
		link: path,
		label: title,
	}))
	return (
		<UserProvider>
			<Router>
				<Switch>
					{routes.map(({ path, page, title }) => (
						<Route
							key={shortid.generate()}
							exact
							path={path}
							component={() => (
								<Layout
									page={page}
									title={title}
									navigation={navigation}
								/>
							)}
						/>
					))}
					<Route component={Error} />
				</Switch>
			</Router>
		</UserProvider>
	)
}

export default withAuthenticator(App)
