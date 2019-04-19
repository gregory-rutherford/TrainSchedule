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

function makeRow(response) {
  $("#trainDisplay").append(
    ` <tr> 
      <td>${response.title}</td>
      <td>${response.place}</td>
      <td class="nextArr">${response.nextArrival}</td>
      <td>${response.frequency}</td>
      <td class="minAway">${response.mAway}</td>
      </tr>
    `
  );
}

//update the page so that each entry displays once it is in the db
database.ref().on("child_added", function(childSnapshot) {
  var response = childSnapshot.val();
  makeRow(response);
});

  // update the variables so that it updates every 60 seconds using set interval
//   var trainTime = response.beginTrain;
//   console.log(trainTime);
// });

// function updateDb() {
//   database.ref().on(
//     "value",
//     function(snapshot) {
//       var values = Object.values(snapshot.val());
//       console.log(values);
//       values.forEach(function(train) {
//         var trainTime = train.beginTrain;
//         console.log(trainTime);
//         var diffTime = (moment().format("HH:mm").unix() - moment(trainTime, "HH:mm").unix()) / 600;
//         console.log(diffTime);
//         var trainFreq = train.frequency;
//         console.log(trainFreq);
//         var trainRemainder = diffTime % trainFreq;
//         console.log(trainRemainder);
//         var tMinutesTillTrain = trainFreq - trainRemainder;
//         console.log(tMinutesTillTrain);
//         var nextTrain = moment().add(tMinutesTillTrain, "minutes");

//         var nextTrainFormat = nextTrain.format("h:mm a");
 
//         database.ref().set({
//           nextArrival: nextTrainFormat,
//           mAway: tMinutesTillTrain
//         });
//       });
//     },
//     function(errorObject) {
//       console.log("errors handled" + errorObject.code);
//     }
//   );
// }

// setInterval(updateDb, 5000);
