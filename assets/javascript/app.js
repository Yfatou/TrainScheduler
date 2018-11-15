
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDmNWR2CtUS7D8XykI3s0RLf7r5_nKvFbw",
    authDomain: "train-scheduler-7211b.firebaseapp.com",
    databaseURL: "https://train-scheduler-7211b.firebaseio.com",
    projectId: "train-scheduler-7211b",
    storageBucket: "train-scheduler-7211b.appspot.com",
    messagingSenderId: "230081520462"
   };
   firebase.initializeApp(config);

  //Firebase database declaration
  var database = firebase.database();

  //Global variables
  var trainName = "";
  var destination = "";
  var frequency = 0;
  var firstTrainTime ;

 //Global variables
 //var trainName1  ;
 //var destination1  ;
 //var frequency1 ;
 //var firstTrainTime1 ;

  //on click event for when the user click on the button to add a new train
  $(".add-Train").on("click", function(){
      event.preventDefault();

      trainName = $("#inputTrainName").val().trim();//get the value in the input boxes...
      destination = $("#inputDestination").val().trim();
      frequency = $("#inputFrequency").val().trim();
      firstTrainTime = $("#inputFirstTrainTime").val().trim();
      
      console.log(trainName);
      console.log(destination);
      console.log(frequency);
      console.log(firstTrainTime);

      $("#inputTrainName").empty();
      $("#inputDestination").empty();
      $("#inputFirstTrainTime").empty();
      $("#inputFrequency").empty();


      database.ref().push({//and insert them in the database
          trainName: trainName,
          destination: destination,
          frequency: frequency,
          firstTrainTime: firstTrainTime,
          //dateAded: firebase.database.ServerValue.TIMESTAMP
      });
  });

  //This function is retrieving the data inserted by the user in firebase
  database.ref().on("child_added", function(childSnapshot){
    //We're putting the retrieved datas in variables
    var pushTrainName = childSnapshot.val().trainName;
    var pushDestination = childSnapshot.val().destination;
    var pushFrequency = childSnapshot.val().frequency;
    var pushFirstTrainTime = childSnapshot.val().firstTrainTime;

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrainTime);

    //The lines of code below will calculate the next arrival train and the number of minutes away
    //relative to the current time
    

    //The formula used is the following
    //Current minute - 00 = difference time
    //difference time  modulo frequency = time appart
    //frencency - time appart = minutes away
    //minutes away + current time = next arrival

    //current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    //Convert the first train time
    var firstTrainTimeConverted = moment(pushFirstTrainTime, "HH:mm").subtract(1, "years");
    console.log("first train time: " + pushFirstTrainTime);
    console.log("time converted: " + firstTrainTimeConverted);  
    

    //Difference between the times (????)
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //Time appart
    var timeAppart = diffTime % frequency;
    console.log(timeAppart);

    //Minutes away
    var minutesAway = frequency - timeAppart;
    console.log()

    //Next train
    var nextArrival = moment().add(minutesAway, "minutes");

    //Then we display the data on our HTML page
    $(".train-table").append("<tr> <td>" + pushTrainName + "</td><td>" + pushDestination + "</td><td>" + pushFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
    //empty();

  }, function(errorObject){

    console.log("Errors handled: " + errorObject.code);

  });

//function that empty the input boxes after insert
//   function empty(){
//       $("#inputTrainName").empty();
//       $("#inputDestination").empty();
//       $("#inputFirstTrainTime").empty();
//       $("#inputFrequency").empty();
//   }



    


   
  
   

 

     



   