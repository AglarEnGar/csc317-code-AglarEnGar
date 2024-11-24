// Add this JavaScript code to trigger the animation and removal of the flash message
window.onload = function() {
    var flashMessage = document.getElementById('flash-message');
    flashMessage.classList.add('flash-show');
    
    setTimeout(function() {
      flashMessage.classList.remove('flash-show');
      flashMessage.parentNode.removeChild(flashMessage);
    }, 6000); // Adjust the timeout value (in milliseconds) to change how long the flash message stays on the screen
  };