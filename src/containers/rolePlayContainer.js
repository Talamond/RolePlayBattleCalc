import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/main';
import _ from 'lodash';
import { store } from '../store';

@connect(state => ({
	rolePlay: state.rolePlay
}))
export default class RolePlayContainer extends Component {

	static propTypes = {
		rolePlay: PropTypes.object
	};

	componentWillMount() {
		store.actions.rolePlayActions.getCharacters();
	}

	// componentWillReceiveProps(nextProps) {
	// 	const thisNavigation = this.props.composer.sidebar.navigation;
	// 	const nextNavigation = nextProps.composer.sidebar.navigation;

	// 	if (this.props.params.id !== nextProps.params.id ||
	// 			thisNavigation.searchChecked !== nextNavigation.searchChecked ||
	// 			thisNavigation.favoritesChecked !== nextNavigation.favoritesChecked) {
	// 		store.actions.composerServiceActions.queueRequestGetData(nextProps.params.id, nextProps.location.query && nextProps.location.query.select);
	// 	}
	// }

	onChangeAttacker(e) {
		console.log(e);
	}

	onChangeDefender(e) {
		console.log(e);
	}

	renderCharacters() {
		const { rolePlay: { characters } } = this.props;
		const dd = [];
		_.forEach(characters, (c, index) => {
			dd.push(<option value={index}>{c.name}</option>);
		});
		return dd;
	}

	render() {
		return (
			<div>
				<div>
					<select onChange={this.onChangeAttacker.bind(this)}>
						{this.renderCharacters()}
					</select>
				</div>
				<div>
					<select onChange={this.onChangeDefender.bind(this)}>
						{this.renderCharacters()}
					</select>
				</div>
			</div>
		);
	}
}
