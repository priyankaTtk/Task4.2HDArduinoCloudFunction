// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBuz0Ku1uDT-7_Xz7h_lYmywtSORiwRhIs",
    authDomain: "traffic-1ed25.firebaseapp.com",
    databaseURL: "https://traffic-1ed25-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "traffic-1ed25",
    storageBucket: "traffic-1ed25.appspot.com",
    messagingSenderId: "397607073152",
    appId: "1:397607073152:web:1fde8e49afea352d743d65",
    measurementId: "G-3YXLK7PQN0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function() {
    var database = firebase.database();

    // Function to update light status in the UI
    function updateLightUI(lightStatus, lightClass, toggleButtonId) {
        if (lightStatus === "1") {
            $(lightClass).addClass("on");
            $(toggleButtonId).addClass("active");
        } else {
            $(lightClass).removeClass("on");
            $(toggleButtonId).removeClass("active");
        }
    }

    // Function to toggle light in Firebase
    function toggleLight(lightStatus, lightName) {
        var newStatus = lightStatus === "1" ? "0" : "1";
        database.ref().child(lightName).set(newStatus);
    }

    // Listen for changes in Firebase and update UI accordingly
    database.ref().on("value", function(snapshot) {
        var redLightStatus = snapshot.val().redLightStatus;
        var yellowLightStatus = snapshot.val().yellowLightStatus;
        var greenLightStatus = snapshot.val().greenLightStatus;

        // Update the UI based on the latest status from Firebase
        updateLightUI(redLightStatus, ".red-light", "#toggleRed");
        updateLightUI(yellowLightStatus, ".yellow-light", "#toggleYellow");
        updateLightUI(greenLightStatus, ".green-light", "#toggleGreen");
    });

    // Red Light Toggle
    $("#toggleRed").click(function() {
        database.ref().once("value", function(snapshot) {
            var redLightStatus = snapshot.val().redLightStatus;
            toggleLight(redLightStatus, "redLightStatus");
        });
    });

    // Yellow Light Toggle
    $("#toggleYellow").click(function() {
        database.ref().once("value", function(snapshot) {
            var yellowLightStatus = snapshot.val().yellowLightStatus;
            toggleLight(yellowLightStatus, "yellowLightStatus");
        });
    });

    // Green Light Toggle
    $("#toggleGreen").click(function() {
        database.ref().once("value", function(snapshot) {
            var greenLightStatus = snapshot.val().greenLightStatus;
            toggleLight(greenLightStatus, "greenLightStatus");
        });
    });
});
