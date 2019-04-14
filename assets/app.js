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
    //converts to military time
    var trainTime = $("#time").val().trim();
    var trainFreq = $("#frequency").val().trim();

    database.ref().push({
        title: trainName,
        place: trainDestination,
        beginTime: trainTime,
        frequency: trainFreq
    })
})


function makeRow(response) {
  $("#trainDisplay").append(
    `
    <tr>
      <td>${response.title}</td>,
      <td>${response.place}</td>,
      <td>${response.beginTime}</td>,
      <td>${response.frequency}</td>,
      </tr>
    `
  )
}


  //update the page so that each entry displays once it is in the db
database.ref().on("child_added", function (childSnapshot) {
  var response = childSnapshot.val();
  makeRow(response);
})
