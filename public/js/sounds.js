const sounds = {
  green: new Audio('/sounds/green-tone.mp3'),
  red: new Audio('/sounds/red-tone.mp3'),
  yellow: new Audio('/sounds/yellow-tone.mp3'),
  blue: new Audio('/sounds/blue-tone.mp3')
};

// Function to play the corresponding sound based on the pad index
function playSound(index) {
  switch (index) {
    case 0: sounds.green.play(); break;
    case 1: sounds.red.play(); break;
    case 2: sounds.yellow.play(); break;
    case 3: sounds.blue.play(); break;
  }
}
