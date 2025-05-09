const goButton = document.getElementById('goButton');
const statusMessage = document.getElementById('statusMessage');

let sequence = [];
let userIndex = 0;

goButton.addEventListener('click', startGame);

function startGame() {
  sequence = [];
  userIndex = 0;
  allowUserInput = false;
  statusMessage.textContent = "";

  // Generate 3-step random sequence
  const colors = ['green', 'red', 'yellow', 'blue'];
  for (let i = 0; i < 3; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
  }

  playSequence(sequence);
}

function playSequence(seq) {
  let index = 0;
  allowUserInput = false;

  const interval = setInterval(() => {
    const color = seq[index];
    const pad = document.querySelector(`.pad[data-color="${color}"]`);
    
    pad.classList.add('active');
    playSound(color);

    setTimeout(() => {
      pad.classList.remove('active');
    }, 300);

    index++;
    if (index === seq.length) {
      clearInterval(interval);
      setTimeout(() => {
        allowUserInput = true;
        userIndex = 0;
      }, 500); // brief pause before allowing input
    }
  }, 600);
}

function handleUserClick(color) {
  if (color === sequence[userIndex]) {
    userIndex++;
    if (userIndex === sequence.length) {
      statusMessage.textContent = "✅ Correct!";
      allowUserInput = false;
    }
  } else {
    statusMessage.textContent = "❌ Try Again!";
    allowUserInput = false;
  }
}

function playSound(color) {
  const sounds = {
    green: new Audio('/sounds/green-tone.mp3'),
    red: new Audio('/sounds/red-tone.mp3'),
    yellow: new Audio('/sounds/yellow-tone.mp3'),
    blue: new Audio('/sounds/blue-tone.mp3')
  };
  sounds[color].play();
}