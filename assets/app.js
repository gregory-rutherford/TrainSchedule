 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC4C5rc3LD9EwYuRG0K5XSP4JhzwuGe3Kg",
    authDomain: "trainschedule-6d54a.firebaseapp.com",
    databaseURL: "https://trainschedule-6d54a.firebaseio.com",
    projectId: "trainschedule-6d54a",
    storageBucket: "trainschedule-6d54a.appspot.com",
    messagingSenderId: "505581566337"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  

  //get the data from the from submission   //store the data in firebase
$(document).on("click", "#submit", function() {
    event.preventDefault();
    var trainName = $("#name").val().trim();
    var trainDestination = $("#destination").val().trim();





    //grabbing the user submitted time
    var firstTrain = $("#time").val().trim();
    console.log(firstTrain);
    //stores the user submitted first train time to a coordinated universal time
    var trainTime = moment.utc(firstTrain, "HH:mm");
    console.log(trainTime);
    //stores the user submitted train frequency in a variable
    var trainFreq = $("#frequency").val().trim();
    console.log(trainFreq);

    //adds the frequency to the first train time
    trainTime.add(trainFreq, "minutes");
    var updatedTime = trainTime.format("HH:mm");
    console.log(updatedTime);
    
    //stores the current time in the matching format as the updated time
    var currentTime = moment().format("HH:mm");
    console.log(currentTime);
    
    //now you have to add the frequency until the next arrival time is over the current time, once it surpasses it stop adding, then do your calculation for minutes away.  


    database.ref().push({
        title: trainName,
        place: trainDestination,
        beginTime: firstTrain,
        frequency: trainFreq
    })
})


function makeRow(response) {
  $("#trainDisplay").append(
    ` <tr> 
      <td>${response.title}</td>
      <td>${response.place}</td>
      <td>${response.beginTime}</td>
      <td>${response.frequency}</td>
      </tr>
    `
  );
}


  //update the page so that each entry displays once it is in the db
database.ref().on("child_added", function (childSnapshot) {
  var response = childSnapshot.val();
  makeRow(response);
})
