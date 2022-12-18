const magic8BallButton = document.getElementById('magic-8-ball-button');
const closeButton = document.getElementById('close-button');
const miniWindow = document.getElementById('mini-window');

closeButton.addEventListener('click', function() {
  miniWindow.style.display = 'none';
});

magic8BallButton.addEventListener('click', function() {
  // Magic 8 ball responses
  const responses = [
    'Fate is certain',
    'The stars align in favor',
    'The cosmos confirm',
    'A clear affirmative',
    'Trust in the universe',
    'As the stars predict, yes',
    'Likely to be so',
    'Fortune favors the bold',
    'A positive omen',
    'The signs indicate yes',
    'Unclear, seek guidance',
    'Only time will tell',
    'The future is shrouded',
    'Meditate and ask again',
    'Doubt clouds the answer',
    'The universe denies',
    'The omens do not bode well',
    'Skepticism is warranted',
  ];

  // Display random magic 8 ball response in mini window
  const response = responses[Math.floor(Math.random() * responses.length)];
  message.textContent = response;
  miniWindow.style.opacity = '1';
  miniWindow.style.display = 'flex';
});

// Stars
const starsContainer = document.getElementById('stars-container');

for (let i = 0; i < Math.sqrt(window.innerWidth) * 1.7; i++) {
  // Create new star element
  const star = document.createElement('div');
  star.classList.add('star');

  // Generate random position (x and y coordinates)
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.8; // Top 80% of the screen

  // Set initial position using the `style` property
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  
  // Generate random delay
  const delay = Math.random() * 5000; // Between 0 and 5 seconds

  // Set animation duration and delay using the `animation` property
  star.style.animation = `twinkle 2000ms ${delay}ms infinite`;

  // Append new star element to the container
  starsContainer.appendChild(star);
}

// Set interval to check if a star should be moved every 5 seconds
setInterval(function() {
  // Select all star elements
  const stars = document.querySelectorAll('.star');

  // Loop through all stars
  for (let i = 0; i < stars.length; i++) {
    // Generate random number between 0 and 1
    const random = Math.random();

    // If random number is less than 0.05, move the star to a new position
    if (random < 0.05) {
      // Generate new random position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.8; // Top 80% of the screen

      // Set new position
      stars[i].style.left = `${x}px`;
      stars[i].style.top = `${y}px`;
    }
  }
}, Math.random() * 2000 + 1000); // Check every 1-3 seconds

// Shooting Stars
const shootingStarsContainer = document.querySelector('.shooting-stars-container');

// create an array to store the shooting stars
const shootingStars = [];

// create a shooting star every spawn interval
setInterval(createShootingStar, Math.random() * 5000 + 5300);

function createShootingStar() {
  // only create a new shooting star if there are less than 3 shooting stars on the screen
  if (shootingStars.length >= 3) {
    return;
  }
  
  // generate a random x and y position for the shooting star
  const x = random(0, window.innerWidth);
  const y = random(-100, window.innerHeight * 0.7);
  
  // create a p5.Vector for the position and velocity of the shooting star
  const position = createVector(x, y);
  const velocity = createVector(-11, 11);
  
  // create a div element for the shooting star
  const shootingStar = document.createElement('div');
  shootingStar.classList.add('shooting-star');
  
  // set the initial position of the shooting star
  shootingStar.style.left = `${x}px`;
  shootingStar.style.top = `${y}px`;
  
  // append the shooting star to the container
  shootingStarsContainer.appendChild(shootingStar);
  
  // add the shooting star to the array
  shootingStars.push({ element: shootingStar, position, velocity });
}

function draw() {
  // update the position and velocity of each shooting star
  shootingStars.forEach((shootingStar, index) => {
    // apply gravity to the velocity
    shootingStar.velocity.add(createVector(0, 0.2));
    
    // update the position using the velocity
    shootingStar.position.add(shootingStar.velocity);
    
    // update the position of the element using the position vector
    shootingStar.element.style.left = `${shootingStar.position.x}px`;
    shootingStar.element.style.top = `${shootingStar.position.y}px`;
    
    // remove the shooting star when it reaches the bottom of the screen
    if (shootingStar.position.y > window.innerHeight) {
      shootingStarsContainer.removeChild(shootingStar.element);
      shootingStars.splice(index, 1);

      // set a new interval for the next shooting star to be created
      setTimeout(createShootingStar, Math.random() * 6000 + 4300);
    }
  });
}