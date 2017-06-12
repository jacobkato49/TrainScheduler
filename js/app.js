 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBJIvQZ1ZZPfsOvCmM_uA786V0J2QyET8A",
    authDomain: "train-scheduler-344a6.firebaseapp.com",
    databaseURL: "https://train-scheduler-344a6.firebaseio.com",
    projectId: "train-scheduler-344a6",
    storageBucket: "train-scheduler-344a6.appspot.com",
    messagingSenderId: "141092307237"
  };

 firebase.initializeApp(config);


// Variable for to house Firebase
var database= firebase.database()




// CAPTURE BUTTON CLICK
$("#submit").on("click", function() {
	event.preventDefault();

	//DEFINITION
		//.val()- method that returns or sets the value attribute of the selected form element
		//.trim()- method that removes the whitespace from the beginning and end of the string 

	//Values for each variable and place them correctly in the html
	var name= $("#nameInput").val().trim();
	var dest= $("#destInput").val().trim();
	var time= $("#timeInput").val().trim();
	var freq= $("#freqInput").val().trim();


	//Push the variables and reference them to the database location
	database.ref().push({

		// key: value (variables created)
		name: name,
		destination: dest,
		time: time,
		frequency: freq,
		timeStamp: firebase.database.ServerValue.TIMESTAMP  //Ask the TA's why we do this

	});

	//No refresh
	$("input").val("");
	return false;
});


// On-click Child Function
database.ref().on("child_added", function(childSnapshot){ 
	//childSnapshot returns an object
	console.log("The childSnapshot Data", childSnapshot.val());


	var name = childSnapshot.val().name;
	var dest = childSnapshot.val().destination;
	var time = childSnapshot.val().time;
	var freq = childSnapshot.val().frequency;

	// DEFINITION- 
		//child_added event is typically used when retrieving a list of items from the database

	// DEBUG HERE
	// console.log("name: " + name);
	// console.log("time: " + time);



	//***Convert TRAIN TIMES***//

		// DEFINITION-
			//The parseInt() function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems).

	var freq = parseInt(freq); //making sure the frequency is a numerical value

	//Current Time
	var currentTime= moment(); //this obtains current date and time from MOMENT JS

	//FIRST TIME: PUSHED BACK ONE YEAR TO COME BEFORE CURRENT TIME
	var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years'); //military time notation
	console.log("DATE CONVERTED: " + dConverted);

	var trainTime = moment(dConverted).format('HH:mm');
	console.log("TRAIN TIME : " + trainTime);
	
	//DIFFERENCE B/T THE TIMES 
	var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
	var tDifference = moment().diff(moment(tConverted), 'minutes');
	console.log("DIFFERENCE IN TIME: " + tDifference);

	//REMAINDER 
	var tRemainder = tDifference % freq;
	console.log("TIME REMAINING: " + tRemainder);

	//MINUTES UNTIL NEXT TRAIN
	var minsAway = freq - tRemainder;
	console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);

	//NEXT TRAIN
	var nextTrain = moment().add(minsAway, 'minutes');
	console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));



// Table Data
$("#currentTime").text(currentTime);
$("#trainTable").append(
		"<tr><td id='nameDisplay'>" + childSnapshot.val().name +
		"</td><td id='destDisplay'>" + childSnapshot.val().destination +
		"</td><td id='freqDisplay'>" + childSnapshot.val().frequency +
		"</td><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
		"</td><td id='awayDisplay'>" + minsAway  + ' minutes until arrival' + "</td></tr>");


},

// errorObject
function errorObject () {
    console.log("Read failed: " + errorObject.code)

});




