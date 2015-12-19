import React, { Component, PropTypes } from 'react';
import { reduxRouteComponent } from 'redux-react-router';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import Main from './main';
import * as Containers from './containers';

export default class Routes extends Component {
	static propTypes = {
		store: PropTypes.object
	};

	render() {
		const RouteComponent = reduxRouteComponent(this.props.store);

		return (
			<Router history={history}>
				<Route component={RouteComponent}>
					<Route component={Main}>
						<Route path="/" component={Containers.RolePlayContainer}/>
						<Route path="/newCharacter" component={Containers.NewCharacterContainer}/>
					</Route>
				</Route>
			</Router>
		);
	}
}
