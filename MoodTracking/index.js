document.addEventListener('DOMContentLoaded', function () {
    const icons = document.querySelectorAll('.icon');
    const gif = document.querySelector('.gif img');
    let activeIcon = null;

    function handleIconClick(event) {
        const iconId = event.currentTarget.id;
        const gifPath = `../Assets/Emojis/${getEmotionById(iconId)}.gif`;
        gif.src = gifPath;

        // Remove 'active' class from the previously active icon
        if (activeIcon) {
            activeIcon.classList.remove('active');
        }

        // Add 'active' class to the clicked icon
        event.currentTarget.classList.add('active');

        // Update the reference to the currently active icon
        activeIcon = event.currentTarget;
    }

    function getEmotionById(id) {
        const emotions = ['depressed', 'stressed', 'sad', 'calm', 'happy'];
        return emotions[id];
    }

    icons.forEach(icon => {
        icon.addEventListener('click', handleIconClick);
    });
});
