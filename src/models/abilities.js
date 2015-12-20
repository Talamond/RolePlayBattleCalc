export const passive = {
	phy_boost: 'phy_boost',
	phy_amp: 'phy_amp',
	fir_boost: 'fir_boost',
	fir_amp: 'fir_amp',
	ice_boost: 'ice_boost',
	ice_amp: 'ice_amp',
	win_boost: 'win_boost',
	win_amp: 'win_amp',
	thu_boost: 'thu_boost',
	thu_amp: 'thu_amp',
	men_boost: 'men_boost',
	men_amp: 'men_amp',
	dar_boost: 'dar_boost',
	dar_dam: 'dar_dam',
	lig_boost: 'lig_boost',
	lig_dam: 'lig_dam',
	crit_aid: 'crit_aid',
	ares_aid: 'ares_aid',
	god_aid: 'god_aid',
	crit_mag: 'crit_mag'
};

// Fortune Roll
// Bind
// Double Up

// Dia

// Regain
// Buff
// Blind
// Debuff
// Mudo
// Guard

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
	if (char.passive.crit_aid) {
		rollRes = roll(8);
	} else if (char.passive.ares_aid) {
		rollRes = roll(10);
	} else if (char.passive.god_aid) {
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
	if (char.passive.phy_boost) {
		die = die + 2;
	}
	if (char.passive.phy_aid) {
		die = die + 2;
	}
	let str = (char.str.score || 0) + (char.str.modifer || 0) + (char.str.temp || 0);
	str = str + roll(die);
	return str;
}

function doMag(char, elem) {
	let die = char.int.die;
	if (char.passive[elem + '_boost']) {
		die = die + 2;
	}
	if (char.passive[elem + '_amp']) {
		die = die + 2;
	}
	let int = (char.int.score || 0) + (char.int.modifer || 0) + (char.int.temp || 0);
	int = int + roll(die);
	return int;
}

function magicAttack(char, elem) {
	let crit = false;
	if (char.passive.crit_mag) {
		crit = doCrit(char);
	}
	const mag = doMag(char, elem);
	return {
		type: elem,
		crit: crit.crit,
		dam: mag
	};
}

// function dlAttack(char, elem) {
// 	const die = 8;
// 	const result = roll(die);
// 	return {
// 		dam:
// 		boosted:
// 		result
// 	}
// }

export function attack(char) {
	const crit = doCrit(char);
	const phys = doPhys(char);
	return {
		type: 'phy',
		miss: crit.miss,
		crit: crit.crit,
		dam: phys
	};
}

export function agi(char) {
	return magicAttack(char, 'fir');
}

export function zio(char) {
	return magicAttack(char, 'thu');
}

export function bufu(char) {
	return magicAttack(char, 'ice');
}

export function garu(char) {
	return magicAttack(char, 'win');
}
