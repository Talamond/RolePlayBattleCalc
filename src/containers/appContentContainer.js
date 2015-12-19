import React, { Component, PropTypes } from 'react';
import Routes from '../routes';

export default class AppContentContainer extends Component {

	static propTypes = {
		store: PropTypes.object,
		locale: PropTypes.shape({
			localeCode: PropTypes.string,
			messages: PropTypes.object
		})
	};

	render() {
		const {store} = this.props;
		return ( <Routes store={store} />);
	}
}
