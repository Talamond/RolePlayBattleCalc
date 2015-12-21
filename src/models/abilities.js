// export const passive = {
// 	phy_boost,
// 	phy_amp,
// 	fir_boost,
// 	fir_amp,
// 	ice_boost,
// 	ice_amp,
// 	win_boost,
// 	win_amp,
// 	thu_boost,
// 	thu_amp,
// 	men_boost,
// 	men_amp,
// 	dar_aid,
// 	dar_dam,
// 	lig_aid,
// 	lig_dam,
// 	crit_aid,
// 	ares_aid,
// 	god_aid,
// 	crit_mag,
// 	heal_boost,
// 	heal_amp
// };

// Fortune Roll

// Dia

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

function doMag(char, elem, preroll) {
	let die = char.int.die;
	if (char.passive[elem + '_boost']) {
		die = die + 2;
	}
	if (char.passive[elem + '_amp']) {
		die = die + 2;
	}
	let int = (char.int.score || 0) + (char.int.modifer || 0) + (char.int.temp || 0);
	int = int + (preroll || roll(die));
	return int;
}

function doHeal(char) {
	let die = char.cha.die;
	if (char.passive.heal_boost) {
		die = die + 2;
	}
	if (char.passive.heal_amp) {
		die = die + 2;
	}
	let cha = (char.cha.score || 0) + (char.cha.modifer || 0) + (char.cha.temp || 0);
	cha = (cha / 5) + roll(die);
	return cha;
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

function doDebuff(char) {
	let die = 6;
	if (char.passive.men_boost) {
		die = die + 2;
	}
	if (char.passive.men_amp) {
		die = die + 2;
	}
	return {
		type: 'men',
		chance: die
	};
}

function doInstant(char, elem) {
	const die = roll(8);
	if (char.passive[elem + '_dam']) {
		const dam = magicAttack(char, elem, die);
		return {
			type: elem,
			mAtt: dam,
			chance: die,
			boosted: char.passive[elem + '_aid']
		};
	}
	return {
		type: elem,
		chance: die,
		boosted: char.passive[elem + '_aid']
	};
}

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

export function bind(char) {
	return doDebuff(char);
}

export function debuff(char) {
	return doDebuff(char);
}

export function blind(char) {
	return doDebuff(char);
}

export function hama(char) {
	return doInstant(char, 'lig');
}

export function mudo(char) {
	return doInstant(char, 'dar');
}

export function dia(char) {
	return {
		type: 'heal',
		dam: doHeal(char)
	};
}
