import pkg from 'mongodb';
const { MongoClient } = pkg;

const url = process.env.MONGODB_URI;

function randomLevel() {
	let level;
	do {
		level = Math.floor(Math.random() * 39) + 1;
	} while (level === 20)
	return level;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let level = randomLevel();
console.log("level: " + level);
let hp = 30 + 50 * level;
console.log("hp: " + hp);
let gold = level * 25;
console.log("gold: " + gold);
let exp = level * 20;
console.log("exp: " + exp);

let diff;
let statInfo;
/*1-3: 'critter', 6-9 
4-7: 'weak', 11-21
8-11: 'easy', 23-33
12-15: 'normal', 35-45
16-19: 'hard', 47-57
21-23: 'expert', 59-69
24-27: 'usuper', 71-81
28-31: 'deathwish', 89-93
32-35: 'mythical', 95-105
36-39: 'godlike', 107-117*/
switch (level) {
	case 1:
	case 2:
	case 3: diff = "critter"; statInfo = [1, 3, 6, 9]; break;
	case 4:
	case 5:
	case 6:
	case 7: diff = "weak"; statInfo = [4, 7, 11, 21]; break;
	case 8:
	case 9:
	case 10:
	case 11: diff = "easy"; statInfo = [8, 11, 23, 33]; break;
	case 12:
	case 13:
	case 14:
	case 15: diff = "normal"; statInfo = [12, 15, 35, 45]; break;
	case 16:
	case 17:
	case 18:
	case 19: diff = "hard"; statInfo = [16, 19, 47, 57]; break;
	//	case 20:
	case 21:
	case 22:
	case 23: diff = "expert"; statInfo = [21, 23, 59, 69]; break;
	case 24:
	case 25:
	case 26:
	case 27: diff = "usuper"; statInfo = [24, 27, 71, 81]; break;
	case 28:
	case 29:
	case 30:
	case 31: diff = "deathwish"; statInfo = [28, 31, 89, 93]; break;
	case 32:
	case 33:
	case 34:
	case 35: diff = "mythical"; statInfo = [32, 35, 95, 105]; break;
	case 36:
	case 37:
	case 38:
	case 39: diff = "godlike"; statInfo = [36, 39, 107, 117]; break;
}

console.log("diff: " + diff);
//console.log("statinfo: " + statInfo);

let diffszintek = (statInfo[1] - statInfo[0]) + 1;
let diffpontok = statInfo[3] - statInfo[2];
let leveltavolsag = level - statInfo[0];
let pontokszintenkent = diffpontok / diffszintek;
let baloldal = Math.round(leveltavolsag * pontokszintenkent + statInfo[2]);
let jobboldal = Math.round((leveltavolsag + 1) * pontokszintenkent + statInfo[2]);
let stat = random(baloldal, jobboldal);

/*console.log("diffszintek: " + diffszintek);
console.log("diffpontok: " + diffpontok);
console.log("leveltavolsag: " + leveltavolsag);
console.log("pontokszintenkent: " + pontokszintenkent);
console.log("baloldal: " + baloldal);
console.log("jobboldal: " + jobboldal);*/
console.log("stat:" + stat);


let defense = random(1, stat - 3);
let statdefenseutan = stat - defense;
console.log("defense: " + defense);
//console.log("statdefenseutan: " + statdefenseutan);

let strength = random(1, statdefenseutan - 2);
let statstrengthutan = statdefenseutan - strength;
console.log("strength: " + strength);
//console.log("statstrengthutan: " + statstrengthutan);

let intellect = random(1, statstrengthutan - 1);
let statintellectutan = statstrengthutan - intellect;
console.log("intellect: " + intellect);
//console.log("statintellectutan: " + statintellectutan);

let agility = statintellectutan;
let statagilityutan = statintellectutan - agility;
console.log("agility: " + agility);
//console.log("statagilityutan: " + statagilityutan);

//console.log("stat sum: " + (defense + strength + intellect + agility));

let mage = (defense + strength + agility <= intellect);
console.log(mage);

let myobj = {
	name: 'Fox',
	description: 'woof',
	race: 'Beast',
	id: 'A-2',
	level: level,
	hp: hp,
	maxHp: hp,
	armor: 0,
	defense: defense,
	strength: strength,
	intellect: intellect,
	agility: agility,
	gold: gold,
	experience: exp,
	mage: mage,
	diff: diff,
	type: 'monster'
};

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	let dbo = db.db("mydb");
	dbo.collection("Characters").insertOne(myobj, function (err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
	});
});
