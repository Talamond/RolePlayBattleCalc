import React, { Component } from 'react';
import {store} from './store.js';
import { Provider } from 'react-redux';
import 'es5-shim';
// import 'es6-shim';	// SPM-34103 - conflict on FireFox
import AppContentContainer from './containers/appContentContainer';

export default class App extends Component {
	render() {
		return (
			<div>
				<Provider store={store}>
					{() => <AppContentContainer store={store} />}
				</Provider>
			</div>
		);
	}
}

React.render(<App />, document.getElementById('app'));
