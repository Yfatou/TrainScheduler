
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

      //If the user did not put all the informations
      if(trainName == "" || destination == "" || frequency == "" || firstTrainTime == ""){
          alert("Incomplete informations, the train can't be added");
      } 
      else {//If all the input boxes, are filled
        database.ref().push({//and insert them in the database
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            firstTrainTime: firstTrainTime,
            //dateAded: firebase.database.ServerValue.TIMESTAMP
        }); 

        emptyInputBoxes();//We clear the inputBoxes
      }
  });


  //on click event to allow the user to cancel 
  $(".cancel-add").on("click", function(){
    event.preventDefault();

    emptyInputBoxes();//we clear the input boxes

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


    //Convert the first train time
    var firstTrainTimeConverted = moment(pushFirstTrainTime, "HH:mm").subtract(1, "years");
    console.log("first train time: " + pushFirstTrainTime);
    console.log("time converted: " + firstTrainTimeConverted);  
    
    //current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    console.log("Current time (nf): " + currentTime);

    //Difference between the times (????)
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //Time appart
    var timeAppart = diffTime % pushFrequency;
    console.log("Time appart: " + timeAppart);

    //Minutes away
    var minutesAway = pushFrequency - timeAppart;
    console.log("Minutes till train: " + minutesAway);

    //Next train
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + nextArrival);

    //Then we display the data on our HTML page
    $(".train-table").append("<tr> <td>" + pushTrainName + "</td><td>" + pushDestination + "</td><td>" + pushFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
    //empty();

  }, function(errorObject){

    console.log("Errors handled: " + errorObject.code);

  });

  //This function will empty the input boxes after the datas are inserted in firebase
  function emptyInputBoxes(){
     $("#inputTrainName").val("");
     $("#inputDestination").val("");
     $("#inputFirstTrainTime").val("");
     $("#inputFrequency").val("");
  }

    


   
  
   

 

     



   