document.getElementById('tool').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: TOOLextractPageData,
                world: "MAIN"
            }, (injectionResults) => {
                if (injectionResults && injectionResults.length > 0 && injectionResults[0].result) {
                    const data = injectionResults[0].result;
                    const printData = {
                        toolNumber: data.toolNumber,
                        URL: data.url,
                    };
                    localStorage.setItem('TOOLprintData', JSON.stringify(printData));
                    chrome.tabs.create({ url: "TOOL/TOOLprint.html" });
                } else {
                    console.error("No results returned from the content script.");
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
});

function TOOLextractPageData() {
    const data = {
        toolNumber: '',
        url: '',
    };

    const toolNumber = document.querySelector('#adion-card-content-7 > table > tbody > tr.tools-toolNumber > td.plainvalue');
    data.toolNumber = toolNumber.textContent;

    var regexp = /#+/g;
    url = window.location.href;
    data.url = url.replace(regexp, '');

    return data;
}