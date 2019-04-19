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
  
  
  var trainName = $("#name")
    .val()
    .trim();
  var trainDestination = $("#destination")
    .val()
    .trim();
  var firstTrain = $("#time")
    .val()
    .trim();
  var trainFreq = $("#frequency")
    .val()
    .trim();
  //current time is represented by "moment()" it finds the difference between the current time and the start train time in minutes

  var trainTime = moment(firstTrain, "HH:mm").subtract(1, "years");

  var currentMoment = moment();

  var diffTime = currentMoment.diff(moment(trainTime), "minutes");

  var trainRemainder = diffTime % trainFreq;

  var tMinutesTillTrain = trainFreq - trainRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  var nextTrainFormat = nextTrain.format("h:mm a");

  database.ref().push({
    title: trainName,
    place: trainDestination,
    nextArrival: nextTrainFormat,
    frequency: trainFreq,
    mAway: tMinutesTillTrain,
    beginTrain: firstTrain
  });
  //clears the form
  $("#trainForm")[0].reset();
});
// displaying firebase data on the page
function makeRow(response) {
  $("#trainDisplay").append(
    ` <tr>
      <td id = "title">${response.title}</td>
      <td>${response.place}</td>
      <td class="nextArr">${response.nextArrival}</td>
      <td>${response.frequency}</td>
      <td class="minAway">${response.mAway}</td>
      </tr>
    `
  );
}

//grabbing the response snapshot from fb
database.ref().on("child_added", function(childSnapshot) {
  var response = childSnapshot.val();
  makeRow(response);
});