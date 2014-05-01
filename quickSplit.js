var pots = new Array;
var people = new Array;
var totalOwed;
var potSums;

var FALSEINDEX = -1;


function init(passedPeople, passedTotalOwed){
	totalOwed = passedTotalOwed; 
	// need checker to see this matches what people say they owe

	pots[1] = new Object;
	pots[5] = new Object;
	pots[10] = new Object; 
	pots[20] = new Object;

	for (var key in pots){
		var array = new Array;

		pots[key] = {
			value: 0,
			bills : array,
			empty : true
		};
	}

	for (var key in passedPeople){
		people[key] = passedPeople[key];
	}
	deposite();

	var toReturn = new Object;
	toReturn = {
		pots: pots,
		people: people
	};

	return toReturn;

}

//puts everyones bills in the pots
function deposite(){
	for (var person in people){ 
	//for each person
		for (var bill in people[person].bills){
		//for each monetary denominatoin
			for (var count = 0; count < people[person].bills[bill]; count++){
			//for each actual bill in their wallet
				var size = pots[bill].bills.length;
				pots[bill].bills[size] = new Object;
				pots[bill].bills[size] = {
					value: Number(bill),
					owner: people[person].name,
					ownerIndex: person,
					recinded: false,
				};
				pots[bill].value += Number(bill);
				pots[bill].empty = false;
				people[person].owes -= Number(bill);

			}

		}
	}
	potSums = pots[20].value + pots[10].value + pots[5].value + pots[1].value;
	golf();
}

//Gives people back some of their money
//First gives to those who have put in the most over
//What they should have paid, ie furthest away has next turn
//Like golf
function golf(){

	var finished = false;
	while (!finished){
		golfer = leastOwed();
		if (golfer == FALSEINDEX){
			finished = true;
		} else {

			if (using(20, golfer)){
				playThrough(20, golfer);
			} else if (using(10, golfer)){
				playThrough(10, golfer);
			} else if (using(5, golfer)){
				playThrough(5, golfer);
			} else if (using(1, golfer)){
				playThrough(1, golfer);
			} else {
				finished = true;
			}
		}

	}

}

//Finds who owes the least and returns their array index
function leastOwed(){
	var minPerson = 0;
	for (var person in people){
		if (people[person].owes < people[minPerson].owes){
			minPerson = person;
		}
	}
	if (people[minPerson].owed >= 0){
		return FALSEINDEX;
	}

	return minPerson;
}


function using(bill, person){
	// true if potSums - totalOwed is equal or more than the bill denomination
	// and if the person is owed equal or more than the bill demonination
	// and there is a unrecinded bill in the pot
	return ((potSums - totalOwed) >= bill
		&& (0 - people[person].owes) >= bill
		&& !pots[bill].empty);
}

function playThrough(bill, person){
	var inPotIndex = inPot(bill, people[person].name);
	var bottomedOutIndex = bottomedOut(bill);
	var alreadyTakenIndex = alreadyTaken(bill, person);
	var earliestUnrecindedIndex = earliestUnrecinded(bill);

		if (earliestUnrecindedIndex == FALSEINDEX){
			console.log("error in earliestUnrecinded");
		}
		//try to remove own
		if (inPotIndex != FALSEINDEX){
			pots[bill].bills[inPotIndex].recinded = true;
		}

		//try to remove from someone who has reached zero
		else if(bottomedOutIndex != FALSEINDEX){
			pots[bill].bills[bottomedOutIndex].recinded = true;
			var size = people[golfer].takenBills.length;
			people[golfer].takenBills[size] = {
				value: bill,
				owner: pots[bill].bills[bottomedOutIndex].owner,
				ownerIndex: pots[bill].bills[bottomedOutIndex].ownerIndex
			};
		}
		//try to remove someones you have already taken
		else if (alreadyTakenIndex != FALSEINDEX){
			pots[bill].bills[alreadyTakenIndex].recinded = true;
			var size = people[golfer].takenBills.length;
			people[golfer].takenBills[size] = {
				value: bill,
				owner: pots[bill].bills[alreadyTakenIndex].owner,
				ownerIndex: pots[bill].bills[alreadyTakenIndex].ownerIndex
			};
		}
		//take from anyone
		else{
			pots[bill].bills[earliestUnrecindedIndex].recinded = true;
			var size = people[golfer].takenBills.length;
			people[golfer].takenBills[size] = {
				value: bill,
				owner: pots[bill].bills[earliestUnrecindedIndex].owner,
				ownerIndex: pots[bill].bills[earliestUnrecindedIndex].ownerIndex
			};
		}
		pots[bill].value -= Number(bill);
		people[golfer].owes += Number(bill);
		potSums -= bill;
		pots[bill].empty = verifyEmptyStatus(bill);
}

function inPot(bill, name){

	for (var count in pots[bill].bills){
		if (pots[bill].bills[count].owner == name && !pots[bill].bills[count].recinded)
			return count;
	}
	return FALSEINDEX;

}

function bottomedOut(bill){
	for (var count in pots[bill].bills){
		if (!pots[bill].bills[count].recinded){
			var person = pots[bill].bills[count].ownerIndex;
			if (people[person].owes == 0){
				return count;
			}
		}
	}
	return FALSEINDEX;
}

function alreadyTaken(bill, taker){
	for (var count in pots[bill].bills){
		if (!pots[bill].bills[count].recinded){
			var takee = pots[bill].bills[count].ownerIndex;
			if (hasTaken(taker, takee)){
				return count;
			}
		}
	}
	return FALSEINDEX;
}

function earliestUnrecinded(bill){
	for (var count in pots[bill].bills){
		if (!pots[bill].bills[count].recinded){
			return count;
		}
	}
	return FALSEINDEX;
}

function verifyEmptyStatus(bill){

	return (pots[bill].value == 0);
}

function hasTaken(taker, takee){
	for (var count in people[taker].takenBills){
		if (people[taker].takenBills[count].ownerIndex == takee){
			return true;
		}
	}
	return false;
}
