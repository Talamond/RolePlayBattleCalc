import React, { Component, PropTypes } from 'react';
import './styles/main';
import { connect } from 'react-redux';

@connect(state => ({
	pathname: state.router.pathname,
	params: state.router.params
}))
export default class Main extends Component {
	static propTypes = {
		children: PropTypes.object,
		location: PropTypes.object,
		pathname: PropTypes.string,
		params: PropTypes.object
	};

	render() {
		return (
			<div>
				<section className="v-content">
					{this.props.children}
				</section>
			</div>
		);
	}
}
