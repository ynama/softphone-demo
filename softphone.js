(function() {
    // Ensure the Salesforce Open CTI library is loaded
    if (!sforce || !sforce.opencti) {
        console.error("Open CTI library not available.");
        return;
    }

    // Initialise the softphone
    sforce.opencti.onReady(function() {
        console.log("Softphone is ready!");

        // Example: Display a message when the softphone loads
        sforce.opencti.setSoftphonePanelVisibility({ visible: true });

        // Add click handlers for demo buttons
        document.getElementById("startCall").addEventListener("click", function() {
            startCall();
        });

        document.getElementById("endCall").addEventListener("click", function() {
            endCall();
        });
    });

    // Simulate starting a call
    function startCall() {
        console.log("Starting call...");
        sforce.opencti.screenPop({
            type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
            params: { recordId: "003XXXXXXXXXXXX" } // Replace with a Contact ID for demo
        });
        alert("Inbound call started. Screen pop triggered!");
    }

    // Simulate ending a call
    function endCall() {
        console.log("Ending call...");
        alert("Call ended. Voice Call record will be logged.");
    }
})();
