// popup.js

// Function to send a message to the background script to trigger upvoting
function upvoteNow() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "upvote" });
    });
  }
  
  // Attach click event listener to the button
  document.getElementById('upvoteButton').addEventListener('click', upvoteNow);
  