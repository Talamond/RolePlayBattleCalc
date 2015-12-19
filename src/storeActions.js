import { bindActionCreators } from 'redux';
import * as rolePlayActionCreators from './actions/rolePlayActions';
import * as newCharacterActionCreators from './actions/newCharacterActions';

export function createActions(store) {
	return (
		store.actions = {
			rolePlayActions: bindActionCreators(rolePlayActionCreators, store.dispatch),
			newCharacterActions: bindActionCreators(newCharacterActionCreators, store.dispatch)
		}
	);
}
