let breathingInterval;
let isBreathing = false;

function startStopBreathing() {
    const startStopBtn = document.getElementById("startStopBtn");
    const breathingAudio = document.getElementById("breathingAudio");
    const breathingText = document.getElementById("breathingText");

    if (!isBreathing) {
        // Start breathing
        breathingAudio.play();
        startStopBtn.innerHTML = "Stop";
        isBreathing = true;

        let cycleCount = 0;
        breathingInterval = setInterval(() => {
            cycleCount++;
            if (cycleCount % 2 === 1) {
                breathingText.innerHTML = "Breathe In";
            } else {
                breathingText.innerHTML = "Breathe Out";
            }

            if (cycleCount === 10) {
                cycleCount = 0;
            }
        }, 4000); // 1 second interval for text update
    } else {
        // Stop breathing
        breathingAudio.pause();
        breathingAudio.currentTime = 0;
        startStopBtn.innerHTML = "Start";
        isBreathing = false;
        clearInterval(breathingInterval);
        document.getElementById("breathingText").innerHTML = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Get the modal
    var modal = document.getElementById("modal");
  
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
  
    // When the page loads, open the modal
    modal.style.display = "block";
  
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  });
  