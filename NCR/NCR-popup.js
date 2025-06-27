document.getElementById('ncr').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: NCRextractPageData,
                world: "MAIN"
            }, (injectionResults) => {
                if (injectionResults && injectionResults.length > 0 && injectionResults[0].result) {
                    const data = injectionResults[0].result;
                    const printData = {
                        NCRNumber: data.ncrNumber,
                        PartNumber: data.partNumber,
                        Rev: data.rev,
                        URL: data.url,
                        NCRCode: data.ncr_code,
                        CauseCode: data.cause_code,
                        PartName: data.partName
                    };
                    localStorage.setItem('NCRprintData', JSON.stringify(printData));
                    chrome.tabs.create({ url: "NCR/NCRprint.html" });
                } else {
                    console.error("No results returned from the content script.");
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
});

function NCRextractPageData() {
    const data = {
        ncrNumber: '',
        partNumber: '',
        rev: '',
        url: '',
        ncr_code: '',
        cause_code: '',
        partName: ''
    };

    const partNumber = document.querySelector('#horizontalMainAtts > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > a');
    if (partNumber) {
    data.partNumber = partNumber.textContent;
    } else {
        data.partNumber = '';
    }
    const ncrNumber = document.querySelector('#horizontalMainAtts_ncrrefnumber_value');
    data.ncrNumber = ncrNumber.textContent;
    const rev = document.querySelector('#horizontalMainAtts > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)');
    data.rev = rev.textContent;
    const ncr_code = document.querySelector('#mainEditingForm > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(1) > td:nth-child(2)');
    if (ncr_code.textContent.length > 22) {
        data.ncr_code = ncr_code.textContent.substring(0, 22) + '...';
    }
    else {
        data.ncr_code = ncr_code.textContent;
    }
    const cause_code = document.querySelector('#mainEditingForm > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)');
    if (cause_code.textContent.length > 22) {
        data.cause_code = cause_code.textContent.substring(0, 22) + '...';
    }
    else {
        data.cause_code = cause_code.textContent;
    }
    const partName = document.querySelector('#horizontalMainAtts > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2)')
    if (partName.textContent.length > 22) {
        data.partName = partName.textContent.substring(0, 22) + '...';
    }
    else {
        data.partName = partName.textContent;
    }
    var regexp = /#+/g;
    url = window.location.href;
    data.url = url.replace(regexp, '');

    return data;
}