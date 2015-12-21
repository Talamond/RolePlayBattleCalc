import * as Abil from './abilities';

function roll(die) {
	return Math.floor((Math.random() * die) + 1);
}

function calcSpeed(char, init) {
	let agi = (char.agi.score || 0) + (char.agi.modifer || 0) + (char.agi.temp || 0);
	agi = agi + roll(init ? char.agi.die * 2 : char.agi.die);
	return agi;
}

function getEnd(char) {
	return (char.end.score || 0) + (char.end.modifer || 0) + (char.end.temp || 0);
}

function applyDamage(att, defChar) {
	if (att.miss) {
		return {
			res: 'Missed',
			dam: 0
		};
	}
	const end = getEnd(defChar);
	const res = defChar[att.type];
	let dam = att.dam - end;
	if (dam < 0) {
		dam = 0;
	}
	if (att.crit) {
		dam = dam * 2;
	}
	if (res === 'we') {
		return {
			res,
			dam: dam * 1.5,
			crit: att.crit ? 'Critical!' : ''
		};
	} else if (res === 'st') {
		return {
			res,
			dam: dam * 0.5,
			crit: att.crit ? 'Critical!' : ''
		};
	} else if (res === 'nu') {
		return {
			res,
			dam: 0,
			crit: att.crit ? 'Critical!' : ''
		};
	} else if (res === 'rf') {
		return {
			res,
			dam: dam,
			crit: att.crit ? 'Critical!' : ''
		};
	} else if (res === 'dr') {
		return {
			res,
			dam: dam * -1,
			crit: att.crit ? 'Critical!' : ''
		};
	}
	return {
		res,
		dam: dam,
		crit: att.crit ? 'Critical!' : ''
	};
}

function applyStatus(att, defChar) {
	const res = defChar[att.type];
	if (res === 'we') {
		att.chance = att.chance + 2;
	} else if (res === 'st') {
		att.chance = att.chance - 2;
	} else if (res === 'nu') {
		return {
			res,
			result: 'Failed'
		};
	} else if (res === 'rf') {
		return {
			res: 'rf'
		};
	}
	const rollRes = roll(att.chance);
	console.log('Status Roll: ' + rollRes);
	return {
		res,
		result: rollRes > 2 ? 'Success' : 'Failed'
	};
}

function applyInstant(att, defChar) {
	const res = defChar[att.type];
	let thres = 2;
	if (att.boosted) {
		thres = 4;
	}
	if (res === 'we') {
		thres = thres * 2;
	} else if (res === 'st') {
		thres = Math.floor(thres * 0.5);
	} else if (res === 'nu') {
		return {
			res,
			result: 'Failed'
		};
	} else if (res === 'rf') {
		return {
			res: 'rf'
		};
	}
	console.log('Instant Roll: ' + att.chance);
	console.log('Instant Thres: ' + thres);
	const result = att.chance <= thres;
	if (result || !att.mAtt) {
		return {
			res,
			result: result ? 'Success' : 'Failed'
		};
	}

	const backUp = applyDamage(att, defChar);

	return {
		...backUp,
		result: 'Failed'
	};
}

export function battle(attacker, aAbil, defender, dAbil) {
	const aSpeed = calcSpeed(attacker, true);
	const dSpeed = calcSpeed(defender, false);
	// TODO different ablilities
	const aAtt = Abil[aAbil](attacker);
	const dAtt = Abil[dAbil](defender);
	let aResult = {};
	let dResult = {};
	if (aAtt.type === 'men') {
		aResult = applyStatus(aAtt, defender);
	} else if (aAtt.type === 'lig' || aAtt.type === 'dar') {
		aResult = applyInstant(aAtt, defender);
	} else if (aAtt.type === 'heal') {
		dResult = {
			heal: 'Healed',
			healDam: aAtt.dam
		};
	} else if (aAtt.type === 'guard') {
		dResult = {
			heal: 'Guarded'
		};
	} else {
		aResult = applyDamage(aAtt, defender);
	}

	if (dAtt.type === 'men') {
		dResult = { ...applyStatus(dAtt, attacker), ...dResult };
	} else if (dAtt.type === 'lig' || dAtt.type === 'dar') {
		dResult = { ...applyInstant(dAtt, attacker), ...dResult};
	} else if (dAtt.type === 'heal') {
		aResult = {
			...aResult,
			heal: 'Healed',
			healDam: dAtt.dam
		};
	} else if (dAtt.type === 'guard') {
		aResult = {
			...aResult,
			heal: 'Guarded'
		};
	} else {
		dResult = { ...applyDamage(dAtt, attacker), ...dResult};
	}

	if (dResult.heal === 'Guarded') {
		dResult.dam = Math.floor(dResult.dam / 2);
	}
	if (aResult.heal === 'Guarded') {
		aResult.dam = Math.floor(aResult.dam / 2);
	}
	// TODO reflect
	return {
		aReceive: dResult,
		dReceive: aResult,
		speedResult: aSpeed >= dSpeed ? true : false
	};
}
