// content-script.js

// Function to check the current URL and determine which popup to set
function checkAndSendPopupRequest() {
    const url = window.location.href;
    let popupFile = 'DEFAULT/default.html';
  
    // Check the URL and set the appropriate popup
    if (url.includes('purchaseorders')) {
      popupFile = 'VPO/VPO-popup.html';
    } else if (url.includes('workorders')) {
      popupFile = 'WO/WO-popup.html';
    } else if (url.includes('nonconformancereports')) {
      popupFile = 'NCR/NCR-popup.html';
    } else if (url.includes('tools')) {
      popupFile = 'TOOL/TOOL-popup.html';
    } else if (url.includes('rtas')) {
      popupFile = 'RTA/RTA-popup.html';
    } else if (url.includes('parts')) {
      popupFile = 'PARTS_KANBAN/parts-popup.html';
    } else if (url.includes('ots')) {
      popupFile = 'COTS/COTS-popup.html';
    }
    
  
    // If there's a match, send a message to the background script
    if (popupFile) {
      chrome.runtime.sendMessage({ setPopup: popupFile });
    }
  }
  
  // Run the function when the content script is injected
  checkAndSendPopupRequest();
  