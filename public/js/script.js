
let allowUserInput = false;

document.querySelectorAll('.pad').forEach(pad => {
  // Associate each color with its sound file
  const sounds = {
    green: new Audio('/sounds/green-tone.mp3'),
    red: new Audio('/sounds/red-tone.mp3'),
    yellow: new Audio('/sounds/yellow-tone.mp3'),
    blue: new Audio('/sounds/blue-tone.mp3')
  };

  // When a pad is clicked, play the corresponding sound
  pad.addEventListener('click', () => {
    if (!allowUserInput) return;

    const color = pad.getAttribute('data-color');
    
    // Play the sound for the corresponding color
    sounds[color].play();

    // Add the active class to give visual feedback
    pad.classList.add('active');
    setTimeout(() => {
      pad.classList.remove('active');
    }, 200); // Flash duration

    handleUserClick(color);
  });
});