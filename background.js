// background.js

// This listener triggers when the active tab changes
chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId;  // Get the active tab's ID
  
    // Query for the active tab's information (e.g., URL)
    chrome.tabs.get(tabId, (tab) => {
      // Check if the tab and its URL are valid
      if (tab && tab.url) {
        const url = tab.url; // Get the URL of the active tab
        let popupFile = 'DEFAULT/default.html';
  
        // Determine which popup to show based on the URL
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
        }
  
        // If a valid popup was determined, set it
        if (popupFile) {
          chrome.action.setPopup({ popup: popupFile });
        } else {
            chrome.action.setPopup({popup: ''})
        }
      };
    });
  });
  

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check if the message contains the "setPopup" property
  if (message.setPopup) {
    // Dynamically set the popup based on the message content
    chrome.action.setPopup({ popup: message.setPopup });
  }
});