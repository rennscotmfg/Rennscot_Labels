document.getElementById('rta').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: RTAextractPageData,
                world: "MAIN"
            }, (injectionResults) => {
                if (injectionResults && injectionResults.length > 0 && injectionResults[0].result) {
                    const data = injectionResults[0].result;
                    const printData = {
                        toolNumber: data.toolNumber,
                        URL: data.url,
                    };
                    localStorage.setItem('RTAprintData', JSON.stringify(printData));
                    chrome.tabs.create({ url: "RTA/RTAprint.html" });
                } else {
                    console.error("No results returned from the content script.");
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
});

function RTAextractPageData() {
    const data = {
        toolNumber: '',
        url: '',
    };

    const toolNumber = document.querySelector('#adion-card-content-1 > table > tbody > tr.equipments-rtanumber > td.plainvalue');
    data.toolNumber = toolNumber.textContent;

    var regexp = /#+/g;
    url = window.location.href;
    data.url = url.replace(regexp, '');

    return data;
}