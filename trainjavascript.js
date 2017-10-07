
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAUUUM2lCCRn7kLodfELWMRUCv8552xeZk",
    authDomain: "trainscheduler-f2b03.firebaseapp.com",
    databaseURL: "https://trainscheduler-f2b03.firebaseio.com",
    projectId: "trainscheduler-f2b03",
    storageBucket: "",
    messagingSenderId: "21297646255"
  };
  firebase.initializeApp(config);
/////////////////////////////////////////////////////////////

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var name = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $('#time-input').val().trim();
  var frequency = $("#frequency-input").val().trim();

        

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: name,
    destination: destination,
    time: firstTrain,  // 2:22 in my example
    frequency: frequency,
  
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);
  //console.log(newTrain.nextTrainFormatted);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
    
    return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry

  database.ref().on("child_added", function(childSnapshot){
    
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var time = childSnapshot.val().time;
  var key = childSnapshot.key;
  var remove = "<button class='glyphicon glyphicon-trash' id=" + key + "></button>"
  
   //math to find the next train time and minutes until next arrival based off of frequency value and first train time value.

        //convert first train time back a year to make sure it is set before current time.

        var firstTrainConverted = moment(time, "hh:mm").subtract(1, "years");
        console.log(firstTrainConverted);

        //set a variable equal to the current time from moment.js

         var currentTime = moment();
        /console.log("Current Time: " + moment(currentTime).format("hh:mm"));


        //find the difference between the first train time and the current time

        var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
        console.log("Difference In Time: " + timeDiff);

        //find the time apart by finding the remainder of the time difference and the frequency - use modal to get whole remainder number

        var timeRemainder = timeDiff % frequency;
        console.log(timeRemainder);

        //find the minutes until the next train

        var nextTrainMin = frequency - timeRemainder;
        console.log("Minutes Till Train: " + nextTrainMin);

        //find the time of the next train arrival

        var nextTrainAdd = moment().add(nextTrainMin, "minutes");
        var nextTrainArr = moment(nextTrainAdd).format("hh:mm");
        console.log("Arrival Time: " + nextTrainArr);
  
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  frequency  + "</td><td>" + nextTrainArr + "</td><td>"+ nextTrainMin + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
