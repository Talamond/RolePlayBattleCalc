export const passive = {
	PHYS_BOOST: 'PHYS_BOOST',
	PHYS_AMP: 'PHYS_AMP',
	FIRE_BOOST: 'FIRE_BOOST',
	FIRE_AMP: 'FIRE_AMP',
	ICE_BOOST: 'ICE_BOOST',
	ICE_AMP: 'ICE_AMP',
	WIND_BOOST: 'WIND_BOOST',
	WIND_AMP: 'WIND_AMP',
	THUN_BOOST: 'THUN_BOOST',
	THUN_AMP: 'THUN_AMP',
	MENT_BOOST: 'MENT_BOOST',
	MENT_AMP: 'MENT_AMP',
	DARK_BOOST: 'DARK_BOOST',
	DARK_DAM: 'DARK_DAM',
	LIGH_BOOST: 'LIGH_BOOST',
	LIGHT_DAM: 'LIGHT_DAM',
	CRIT_AID: 'CRIT_AID',
	ARES_AID: 'ARES_AID',
	GOD_AID: 'GOD_AID'
};

function roll(die) {
	if (die > 12) {
		return Math.floor((Math.random() * 20) + 1);
	}
	return Math.floor((Math.random() * die) + 1);
}

function doCrit(char) {
	const ret = {
		miss: false,
		crit: false
	};
	let rollRes = 0;
	if (char.passive.CRIT_AID) {
		rollRes = roll(8);
	} else if (char.passive.ARES_AID) {
		rollRes = roll(10);
	} else if (char.passive.GOD_AID) {
		rollRes = roll(12);
	} else {
		rollRes = roll(6);
		if (rollRes === 6) {
			ret.crit = true;
		}
	}
	if (rollRes >= 7) {
		ret.crit = true;
	}
	if (rollRes === 1) {
		ret.miss = true;
	}
	return ret;
}

function doPhys(char) {
	let die = char.str.die;
	if (char.passive.PHYS_BOOST) {
		die = die + 2;
	}
	if (char.passive.PHYS_AID) {
		die = die + 2;
	}
	let str = (char.str.score || 0) + (char.str.modifer || 0) + (char.str.temp || 0);
	str = str + roll(die);
	return str;
}

export function attack(char) {
	const crit = doCrit(char);
	const phys = doPhys(char);
	return {
		type: 'phys',
		miss: crit.miss,
		crit: crit.crit,
		dam: phys
	};
}
