document.addEventListener('DOMContentLoaded', function() {
    // Sample JSON data for multiple songs
    const musicData = {
        music1: {
            title: "Down the River",
            artist: "Painting with Passion",
            duration: "Stress track | 10-15 mins",
            source: "../Games/Breathing Game/music.mp3"
        },
        music2: {
            title: "Soft Rain",
            artist: "Soothing Relaxation",
            duration: "Some duration",
            source: "../Games/Breathing Game/music.mp3"
        },
        music3: {
            title: "Soft Rain11",
            artist: "Soothing Relaxation",
            duration: "Some duration",
            source: "../Games/Breathing Game/music.mp3"
        },
        // Add more music entries as needed
    };

    // Function to play music
    function playMusic(id) {
        const musicContainer = document.getElementById(id);
        if (!musicContainer) {
            console.error(`Element with ID ${id} not found.`);
            return;
        }

        const mtext = musicContainer.querySelector('.mtext');
        const audioSource = musicData[id].source;

        // Assuming you have an audio element for playback
        const audioElement = new Audio(audioSource);

        // Update the text content
        mtext.querySelector('h2').textContent = musicData[id].title;
        mtext.querySelector('h6').textContent = musicData[id].artist;

        // Play the audio
        audioElement.play();

        // You can also add more logic for pausing, stopping, etc., as needed
    }

    // Add event listeners for play buttons
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const musicId = this.getAttribute('data-music-id');
            playMusic(musicId);
        });
    });
    
    

    // Additional functions or code can be added here
});
