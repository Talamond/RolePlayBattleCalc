import React, { Component, PropTypes } from 'react';
import Routes from '../routes';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

@DragDropContext(HTML5Backend)
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
