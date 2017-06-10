 


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

	//definitons

		//.val()- method that returns or sets the value attribute of the selected form element

		//.trim()- method that removes the whitespace from the beginning and end of the string 

	//Values for each variable and place them correctly in the html
	var name= ("#nameInput").val().trim();
	var dest= ("#destInput").val().trim();
	var time= ("#timeInput").val().trim();
	var freq= ("#freqInput").val().trim();

	//Push the variables and reference them to the database location
	database.ref().push({

		// key: value (variables created)
		name: name,
		destination: dest,
		time: time,
		frequence: freq,
		timeAdded: firebase.database.ServerValue.TIMESTAMP  //Ask the TA's why we do this

		//
	});


	//No refresh
	$("input").val("");
	return false;
});


// On-click Child Functions


// Convert Train Times



// Table Data


// errorObject


