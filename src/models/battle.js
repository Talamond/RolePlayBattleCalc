import * as Abil from './abilities';

// function roll(die) {
// 	return Math.floor((Math.random() * die) + 1);
// }

// function calcSpeed(char, init) {
// 	let agi = (char.agi.score || 0) + (char.agi.modifer || 0) + (char.agi.temp || 0);
// 	agi = agi + roll(init ? char.agi.die * 2 : char.agi.die);
// 	return agi;
// }

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
			res: 'Weak',
			dam: dam * 1.5,
			crit: att.crit ? 'Critical!' : ''
		};
	} else if (res === 'st') {
		return {
			res: 'Resisted',
			dam: dam * 0.5,
			crit: att.crit ? 'Critical!' : ''
		};
	} else if (res === 'nu') {
		return {
			res: 'Nulled',
			dam: 0,
			crit: att.crit ? 'Critical!' : ''
		};
	} else if (res === 'rf') {
		return {
			res: 'Reflected',
			dam: dam,
			crit: att.crit ? 'Critical!' : ''
		};
	} else if (res === 'dr') {
		return {
			res: 'Drain',
			dam: dam * -1,
			crit: att.crit ? 'Critical!' : ''
		};
	}
	return {
		res: 'Normal',
		dam: dam,
		crit: att.crit ? 'Critical!' : ''
	};
}

export function battle(attacker, defender) {
	// const aSpeed = calcSpeed(attacker, true);
	// const dSpeed = calcSpeed(defender, false);
	// TODO different ablilities
	const aAtt = Abil.attack(attacker);
	const dAtt = Abil.attack(defender);
	const aResult = applyDamage(aAtt, defender);
	const dResult = applyDamage(dAtt, attacker);
	// TODO reflect
	return {
		aReceive: dResult,
		dReceive: aResult
	};
}
