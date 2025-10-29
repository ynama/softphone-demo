(function() {
    // Ensure the Salesforce Open CTI library is loaded
    if (!sforce || !sforce.opencti) {
        console.error("Open CTI library not available. Retrying...");
        setTimeout(function() {
            if (!sforce || !sforce.opencti) {
                console.error("Open CTI library still not available. Exiting.");
                return;
            }
        }, 2000); // Retry after 2 seconds
        return;
    }<br>

    // Initialise the softphone
    sforce.opencti.onReady(function() {
        console.log("Softphone is ready!");<br>

        // Set softphone panel visibility
        sforce.opencti.setSoftphonePanelVisibility({
            visible: true,
            callback: function(response) {
                if (response.success) {
                    console.log("Softphone panel is now visible.");
                } else {
                    console.error("Error setting softphone panel visibility: ", response.errors);
                }
            }
        });<br>

        // Add click handlers for demo buttons
        const startCallButton = document.getElementById("startCall");
        const endCallButton = document.getElementById("endCall");<br>

        if (startCallButton) {
            startCallButton.addEventListener("click", function() {
                startCall();
            });
        } else {
            console.warn("Start Call button not found.");
        }<br>

        if (endCallButton) {
            endCallButton.addEventListener("click", function() {
                endCall();
            });
        } else {
            console.warn("End Call button not found.");
        }
    });<br>

    // Simulate starting a call
    function startCall() {
        const recordId = prompt("Enter the Contact ID for the screen pop:", "003dv000005OSgDAAW");
        if (recordId) {
            console.log("Starting call...");
            sforce.opencti.screenPop({
                type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
                params: { recordId: recordId },
                callback: function(response) {
                    if (response.success) {
                        console.log("Screen pop successful.");
                    } else {
                        console.error("Error during screen pop: ", response.errors);
                    }
                }
            });
            alert("Inbound call started. Screen pop triggered!");
        } else {
            console.warn("No Contact ID provided. Screen pop canceled.");
        }
    }<br>

    // Simulate ending a call
    function endCall() {
        console.log("Ending call...");
        sforce.opencti.logACall({
            subject: "Call Ended",
            phone: "123-456-7890", // Replace with the actual phone number
            callback: function(response) {
                if (response.success) {
                    console.log("Call logged successfully.");
                } else {
                    console.error("Error logging call: ", response.errors);
                }
            }
        });
        alert("Call ended. Voice Call record logged.");
    }
})();
