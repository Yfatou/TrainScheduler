//Initialize Firebase
var config = {
    apiKey: "AIzaSyDmNWR2CtUS7D8XykI3s0RLf7r5_nKvFbw",
    authDomain: "train-scheduler-7211b.firebaseapp.com",
    databaseURL: "https://train-scheduler-7211b.firebaseio.com",
    projectId: "train-scheduler-7211b",
    storageBucket: "",
    messagingSenderId: "230081520462"
  };

  firebase.initializeApp(config);

  //Firebase database declaration
  var database = firebase.database();

  //Global variables
  var trainName = "";
  var destination = "";
  var frequency = 0;

  //on click event for when the user click on teh button to add a new train
  $(".addTrain").on("click", function(){
      trainName = $("#inputTrainName").val().trim();//get the value in the input boxes...
      destination = $("#inputDestination").val().trim();
      frequency = $("#inputFrequency").val().trim();

      database.ref().push({//and insert them in out database
          trainName = trainName,
          destination = destination,
          frequency = frequency,
          dateAded: firebase.database.ServerValue.TIMESTAMP
      });
  });

  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);

  }, function(errorObject){
    console.log("Errors handled: " + errorObject.code);
  });

  database.ref().on("child_added",function(snapshot){
      var pushTrainName = snapshot.val().trainName;
      var pushDestination = snapshot.val().destination;
      var pushFrequency = snapshot.val().frequency;

    $(".train-table").append("<tr> <td>" + pushTrainName + "</td><td>" + pushDestination + "</td><td>" + pushFrequency + "</td></tr>");
  });

