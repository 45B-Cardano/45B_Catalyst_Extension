// content.js

// Function to click on the specified elements
function clickElements() {
  const elements = document.querySelectorAll('.idea-vote-btn .icon-chevron-up');

  elements.forEach(element => {
    element.click();
  });
}

// Listen for messages from the popup and trigger upvoting
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'upvote') {
    clickElements();
  }
});

// Wait for the page to be fully loaded before clicking elements
document.addEventListener('DOMContentLoaded', () => {
  // If the page uses AJAX or dynamically loads content, you may need to use additional listeners.
  clickElements();
});
