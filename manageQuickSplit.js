var results;
var returnStr; 
var globalPeople = new Array;

function testingPreInit(){
	results = new Object;
	var passedPeople = new Array;
	
	/*sallysBills = new Array;
	sallysBills[20] = 2;
	sallysBills[10] = 1;
	sallysBills[5] = 0; 
	sallysBills[1] = 1;

	passedPeople[0] = new Object;
	passedPeople[0]  = {
		name: "Sally", 
		owes: 23,
		bills: sallysBills,
		takenBills: new Array
	}

	dansBills = new Array;
	dansBills[20] = 1;
	dansBills[10] = 0; 
	dansBills[5] = 5;
	dansBills[1] = 4;

	passedPeople[1] = new Object;
	passedPeople[1] = {
		name: "Dan",
		owes: 18, 
		bills: dansBills,
		takenBills: new Array
	};

	suesBills = new Array;
	suesBills[20] = 1;
	suesBills[10] = 1; 
	suesBills[5] = 0;
	suesBills[1] = 2;

	passedPeople[2] = new Object;
	passedPeople[2] = {
		name: "Sue",
		owes: 15, 
		bills: suesBills,
		takenBills: new Array
	};
	passedTotalOwed = passedPeople[0].owes + passedPeople[1].owes + passedPeople[2].owes;
	console.log ("In preinit ", passedTotalOwed);*/

	/*var nickisBills = initializeBills (1, 0, 2, 0);

	passedPeople[0] = {
		name: "Nicki",
		owes: 9,
		bills: nickisBills,
//		takenBills: new Array
	};

	var rebeccasBills = initializeBills (1, 0, 0, 0);

	passedPeople[1] = {
		name: "Rebecca",
		owes: 13,
		bills: rebeccasBills,
//		takenBills: new Array
	};

	var briannasBills = initializeBills (0, 0, 2, 0);

	passedPeople[2] = {
		name: "Brianna",
		owes: 7,
		bills: briannasBills,
//		takenBills: new Array
	};

	var lisasBills = initializeBills (1, 1, 0, 3);

	passedPeople[3] = {
		name: "Lisa",
		owes: 16,
		bills: lisasBills,
//		takenBills: new Array
	};

	passedTotalOwed = passedPeople[0].owes + passedPeople[1].owes + passedPeople[2].owes + passedPeople[3].owes;*/

	monicasBills = initializeBills(2, 1, 0, 2);
	passedPeople[0] = {
		name: "Monica",
		owes: 33,
		bills: monicasBills,
	};

	rachelsBills = initializeBills(1, 0, 0, 13);
	passedPeople[1] = {
		name: "Rachel",
		owes: 24,
		bills: rachelsBills
	};

	pheobesBills = initializeBills(0, 2, 1, 0);
	passedPeople[2] = {
		name: "Pheobe",
		owes: 27,
		bills: pheobesBills
	};

	passedTotalOwed = passedPeople[0].owes + passedPeople[1].owes + passedPeople[2].owes - 3;


	managerInit(passedPeople, passedTotalOwed, 20);
	
}

function initializeBills(twenties, tens, fives, ones){
	var bills = new Array;

	bills[20] = twenties;
	bills[10] = tens;
	bills[5] = fives;
	bills[1] = ones;
	
	return  bills;
}

function managerPreInitAddPerson(){
 
	var name = document.getElementById('name');
	var twenties = document.getElementById('twenties');
	var tens = document.getElementById('tens');
	var fives = document.getElementById('fives');
	var ones = document.getElementById('ones');
	var owes = document.getElementById('owes');

	var bills = initializeBills(twenties.value, tens.value, fives.value, ones.value);
	globalPeople[globalPeople.length] = {
		name: name.value,
		owes: owes.value,
		bills: bills,

	};

	name.value = "User";
	twenties.value = 0;
	tens.value = 0;
	fives.value = 0;
	ones.value = 0;
	owes.value = 0;
}

function managerPreInitReady(){
	managerPreInitAddPerson();
//	var total = window.prompt("What is the total owed by your group? (if unsure enter anything, the program will self correct)");
	var tip = window.prompt("What tip percentage would you like everyone to pay?");
	managerInit(globalPeople, tip);
}

function managerInit (passedPeople, tipPercentage){

	//Functions for data checking and tip calculation
	/*if(!matchingTotals(passedPeople, passedTotalOwed)){
		//prompt box to continue with the passed people total
		var peopleSum = sumTotals(passedPeople)
		var prompt = "Your input total and the sum of the totals of all parties without tip do not match. \n";
		prompt += "Your input total is " + passedTotalOwed;
		prompt += " and the sum of the totals of all parties is " + peopleSum + "\n";
		prompt += "Press 'ok' to proceed with the sum of the totals of all parties ";
		prompt += "or press 'cancel' to re-enter all inputs";
		var okWithNewTotal = confirm(prompt);
		if(okWithNewTotal){
			newTotalOwed = peopleSum;
		} else {
			return;
		}
	} else {
		newTotalOwed = passedTotalOwed;
	}*/


	passedPeople = addTipCostToEveryone(passedPeople, tipPercentage);
	newTotalOwed = sumTotals(passedPeople); //This doesn't actually matter whoops

	returnStr = "<p id ='results'>";

	for (person in passedPeople){
		passedPeople[person].takenBills = new Array;
	}


	results = init(passedPeople, newTotalOwed);
	makeComprehencible();
}

function matchingTotals(people, totalOwed){

	var sum = sumTotals(people);
	return (sum == totalOwed);
}

function sumTotals(people){
	var sum = 0;
	for (person in people){
		sum += Number(people[person].owes);
	}
	return sum;
}

function addTipCostToEveryone(people, tip){
	var multiplier = 1 + (tip/100);
	for (person in people){
		people[person].owes = people[person].owes * multiplier;
	}
	return people;
}

function makeComprehencible(){
	
	for (person in results.people){
		returnStr += whatWasPaidToPot (person);
		//returnStr += "\n";
		returnStr += "</br>";
		returnStr += whatWasPaidToOthers(person);
		//returnStr += "\n";
		returnStr += "</br>";
		returnStr += results.people[person].name;
		if (results.people[person].owes > 0){
			returnStr += " still owes $";
			returnStr += roundTo2db(results.people[person].owes);
		} else {
			returnStr += " is still owed $";
			returnStr += roundTo2db((0 - results.people[person].owes));
		}
		//returnStr += "\n \n";
		returnStr += "</br> </br>";
	}
//	window.alert(returnStr);
	returnStr += "</p>"
	document.write(returnStr);

}

function roundTo2db(num){
	var newNum = num.toFixed(2);
	/*if ((num - Number(num.toFixed(0)) == 0)){
		newNum += "00";
	} else if ((num - Number(num.toFixed(1)) == 0)){
		newNum += "0";
	}*/
	return newNum;
}

function whatWasPaidToPot(person){
	str = results.people[person].name + " owes the pot ";
	twenties = countPotOwed(20, person);
	tens = countPotOwed(10, person);
	fives = countPotOwed(5, person);
	ones = countPotOwed(1, person);

	if (twenties + tens + fives + ones == 0){
		str += "nothing";
	} else {
		if (twenties != 0){
			str += twenties + " twenty dollar bill(s), ";
		}
		if (tens != 0){
			str += tens + " ten dollar bill(s), ";
		}
		if (fives != 0){
			str += fives + " five dollar bill(s), ";
		}
		if (ones != 0){
		str += ones + " one dollar bill(s)";
		}
	}

	return str;

}

function countPotOwed(bill, person){
	var count = 0;
	for (var each in results.pots[bill].bills){
		if (person == results.pots[bill].bills[each].ownerIndex &&
			!results.pots[bill].bills[each].recinded){
			count++;
		}
	}
	return count;
}

function whatWasPaidToOthers(person){
	var bigStr = "";
	for (var each in results.people){
		if (person != each){
			var str = results.people[person].name + " owes " + 	results.people[each].name + " ";
				var twenties = countPersonOwed(each, person, 20);
				var tens = countPersonOwed(each, person, 10);
				var fives = countPersonOwed(each, person, 5);
				var ones = countPersonOwed(each, person, 1);
			if (twenties+tens+fives+ones == 0){
				str += "nothing";
			} else {
				if (twenties != 0){
					str += twenties + " twenty dollar bill(s), ";
				}
				if (tens != 0){
					str += tens + " ten dollar bill(s), ";
				}
				if (fives != 0){
					str += fives + " five dollar bill(s), ";
				}
				if (ones != 0){
				str += ones + " one dollar bill(s)";
				}

			}
			bigStr += str;
			//bigStr += "\n";
			bigStr += "</br>";

		}
	}
	return bigStr;

}

function countPersonOwed(owee, ower, bill){
	var count = 0;
	for (var each in results.people[owee].takenBills){
		if(results.people[owee].takenBills[each].value == bill
			&& results.people[owee].takenBills[each].ownerIndex == ower){
			count++;
		}
	}
	return count;
}
