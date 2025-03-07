import { neonCursor } from './js/lib/threejs-toys.module.js'

// Wrap logo letters
function wrapLogoLetters() {
  const logo = document.querySelector('.logo');
  const text = logo.textContent;
  logo.textContent = '';
  
  // Wrap each letter in a span with data-letter attribute
  text.split('').forEach(letter => {
    const span = document.createElement('span');
    span.className = 'logo-letter';
    span.textContent = letter;
    span.setAttribute('data-letter', letter);
    logo.appendChild(span);
  });
}

// Function to get cursor parameters based on screen size
function getCursorParams() {
  const width = window.innerWidth;
  
  if (width <= 480) {
    return {
      shaderPoints: 8,
      curvePoints: 40,
      curveLerp: 0.5,
      radius1: 3,
      radius2: 15,
      velocityTreshold: 10,
      sleepRadiusX: 50,
      sleepRadiusY: 50,
      sleepTimeCoefX: 0.0025,
      sleepTimeCoefY: 0.0025
    };
  } else if (width <= 768) {
    return {
      shaderPoints: 12,
      curvePoints: 60,
      curveLerp: 0.5,
      radius1: 4,
      radius2: 20,
      velocityTreshold: 10,
      sleepRadiusX: 75,
      sleepRadiusY: 75,
      sleepTimeCoefX: 0.0025,
      sleepTimeCoefY: 0.0025
    };
  } else {
    return {
      shaderPoints: 16,
      curvePoints: 80,
      curveLerp: 0.5,
      radius1: 5,
      radius2: 30,
      velocityTreshold: 10,
      sleepRadiusX: 100,
      sleepRadiusY: 100,
      sleepTimeCoefX: 0.0025,
      sleepTimeCoefY: 0.0025
    };
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  wrapLogoLetters();
  
  // Initialize neon cursor with responsive parameters
  neonCursor({
    el: document.getElementById('app'),
    ...getCursorParams()
  });
  
  // Update cursor parameters on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const cursor = document.querySelector('canvas');
      if (cursor) {
        cursor.remove();
        neonCursor({
          el: document.getElementById('app'),
          ...getCursorParams()
        });
      }
    }, 250);
  });
});
