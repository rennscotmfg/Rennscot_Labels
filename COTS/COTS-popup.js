document.getElementById('cots').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: COTSextractPageData,
                world: "MAIN"
            }, (injectionResults) => {
                if (injectionResults && injectionResults.length > 0 && injectionResults[0].result) {
                    const data = injectionResults[0].result;
                    const printData = {
                        cotsNumber: data.cotsNumber,
                        URL: data.url,
                    };
                    localStorage.setItem('COTSprintData', JSON.stringify(printData));
                    chrome.tabs.create({ url: "COTS/COTSprint.html" });
                } else {
                    console.error("No results returned from the content script.");
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
});

function COTSextractPageData() {
    const data = {
        cotsNumber: '',
        url: '',
    };

    const cotsNumber = document.querySelector('#adion-card-content-8 > table > tbody > tr.ots-otsid > td.plainvalue');
    data.cotsNumber = cotsNumber.textContent;

    var regexp = /#+/g;
    url = window.location.href;
    data.url = url.replace(regexp, '');

    return data;
}