import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import shortid from 'shortid'
// Layout
import { withAuthenticator } from 'aws-amplify-react'
import Amplify from 'aws-amplify'
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
import { LayoutProvider } from '../context/LayoutContext'

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
		title: 'Documentation',
		page: Feed,
	},
	{
		path: '/settings',
		title: 'Settings',
		page: Settings,
	},
]
/**
 * App Component
 * 
 * 	-this contains route and global layout
 * @summary this is our app component,
 * @summary contains route and global layout
 * 
 *  
 */

const App = () => {
	const navigation = routes.map(({ path, title }) => ({
		id: shortid.generate(),
		link: path,
		label: title,
	}))
	return (
		<LayoutProvider>
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
		</LayoutProvider>
	)
}

export default withAuthenticator(App)
