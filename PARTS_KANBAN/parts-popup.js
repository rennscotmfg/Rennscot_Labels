
document.getElementById('order').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: partsextractPageData,
                world: "MAIN"
            }, (injectionResults) => {
                if (injectionResults && injectionResults.length > 0 && injectionResults[0].result) {
                    const data = injectionResults[0].result;
                    const printData = {
                        PartNumber: data.partNumber,
                        PartName: data.partName,
                    };
                    localStorage.setItem('partsprintData', JSON.stringify(printData));
                    localStorage.setItem('qty', document.getElementById('qty').value);
                    localStorage.setItem('action', document.getElementById('action').value);                    
                    chrome.tabs.create({ url: "PARTS_KANBAN/parts-print.html" });
                } else {
                    console.error("No results returned from the content script.");
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
});

function partsextractPageData() {
    const data = {
        partNumber: '',
        partName: '',
    };

    const partNumber = document.querySelector('#mainAtts_partNumber_value');
    data.partNumber = partNumber.textContent;
    const partName = document.querySelector('#mainAtts_partName_value');
    data.partName = partName.textContent;

    return data;
}