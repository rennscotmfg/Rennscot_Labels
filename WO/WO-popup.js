// Display Serialization dropdown when checked


document.getElementById('1x2-serialization').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('1x2-serialization-numbers').style.display = 'flex';
    } else {
        document.getElementById('1x2-serialization-numbers').style.display = 'none';
    }
});


document.getElementById('inspection-serialization').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('inspection-serialization-numbers').style.display = 'flex';
    } else {
        document.getElementById('inspection-serialization-numbers').style.display = 'none';
    }
});

document.getElementById('inspection-options-button').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('inspection-options').style.display = 'flex';
    } else {
        document.getElementById('inspection-options').style.display = 'none';
    }
})

document.getElementById('other').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('other-task').style.display = 'block';
    } else {
        document.getElementById('other-task').style.display = 'none';
    }
})

// Work Order Label

document.getElementById('wo').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: WOextractPageData,
                world: "MAIN"
            }, (injectionResults) => {
                if (injectionResults && injectionResults.length > 0 && injectionResults[0].result) {
                    const data = injectionResults[0].result;
                    const printData = {
                        PONumber: data.poNumber,
                        PartNumber: data.partNumber,
                        PartName: data.partName,
                        Rev: data.rev,
                        WorkOrderNumber: data.woNumber,
                        Itar: data.itar,
                        URL: data.url,
                    };
                    localStorage.setItem('WOprintData', JSON.stringify(printData));
                    chrome.tabs.create({ url: "WO/WOprint.html" });
                } else {
                    console.error("No results returned from the content script.");
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
});

function WOextractPageData() {
    const data = {
        poNumber: '',
        partNumber: '',
        partName: '',
        rev: '',
        woNumber: '',
        itar: '',
        url: '',
    };

    const woNumber = document.querySelector('#mainAtts_workOrderNumber_value');
    data.woNumber = woNumber.textContent;
    if (document.querySelector('#mainAtts_partNumber_value > a')) {
        const partNumber = document.querySelector('#mainAtts_partNumber_value > a');
        data.partNumber = partNumber.getAttribute('data-ps-id');
    }
    else {
        const partNumber = document.querySelector('#mainAtts_partNumber_value > span > a:nth-child(1)');
        data.partNumber = partNumber.getAttribute('data-ps-id');
    }
    const poNumber = document.querySelector('#horizontalMainAtts_customerPoNumber_value');
    data.poNumber = poNumber.textContent;
    const partName = document.querySelector('#adion-card-content-2 > div:nth-child(2) > div > div.card-att-value');
    if (partName.textContent.length > 22) {
        data.partName = partName.textContent.substring(0, 22) + '...';
    }
    else {
        data.partName = partName.textContent;}
    const rev = document.querySelector('#horizontalMainAtts_drawingRev_value');
    data.rev = rev.textContent;
    const itar = document.querySelector('#horizontalMainAtts > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(6) > td:nth-child(2) > span');
    if (itar) {
        data.itar = '<tr><td class="label" colspan="2">EXPORT CONTROLLED</td></tr>';
    }
    var regexp = /#+/g;
    url = window.location.href;
    data.url = url.replace(regexp, '');

    return data;
}

// 1x2 Label

document.getElementById('label1x2').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: label1x2extractPageData,
                world: "MAIN"
            }, (injectionResults) => {
                if (injectionResults && injectionResults.length > 0 && injectionResults[0].result) {
                    const data = injectionResults[0].result;
                    if (document.getElementById('1x2-serialization').checked) {
                        const printData = {
                            PONumber: data.poNumber,
                            PartNumber: data.partNumber,
                            Rev: data.rev,
                            WorkOrderNumber: data.woNumber,
                            S1: document.getElementById('1x2-s_1').value,
                            S2: document.getElementById('1x2-s_2').value
                        }
                        localStorage.setItem('1x2printData', JSON.stringify(printData));
                        chrome.tabs.create({ url: "WO/1x2print.html" });
                    }
                    else {
                    const printData = {
                        PONumber: data.poNumber,
                        PartNumber: data.partNumber,
                        Rev: data.rev,
                        WorkOrderNumber: data.woNumber,
                    };
                    localStorage.setItem('1x2printData', JSON.stringify(printData));
                    chrome.tabs.create({ url: "WO/1x2print.html" });
                    }
                } else {
                    console.error("No results returned from the content script.");
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
});


function label1x2extractPageData() {
    const data = {
        poNumber: '',
        partNumber: '',
        rev: '',
        woNumber: '',
    };

    const woNumber = document.querySelector('#mainAtts_workOrderNumber_value');
    data.woNumber = woNumber.textContent;
    if (document.querySelector('#mainAtts_partNumber_value > a')) {
        const partNumber = document.querySelector('#mainAtts_partNumber_value > a');
        data.partNumber = partNumber.getAttribute('data-ps-id');
    }
    else {
        const partNumber = document.querySelector('#mainAtts_partNumber_value > span > a:nth-child(1)');
        data.partNumber = partNumber.getAttribute('data-ps-id');
    }
    const poNumber = document.querySelector('#horizontalMainAtts_customerPoNumber_value');
    data.poNumber = poNumber.textContent;
    const rev = document.querySelector('#horizontalMainAtts_drawingRev_value');
    data.rev = rev.textContent;

    return data;
}

document.getElementById('inspection').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: inspectionextractPageData,
                world: "MAIN"
            }, (injectionResults) => {
                if (injectionResults && injectionResults.length > 0 && injectionResults[0].result) {
                    const data = injectionResults[0].result;
                    if (document.getElementById('inspection-serialization').checked) {
                        const printData = {
                            partNumber: data.partNumber,
                            woNumber: data.woNumber,
                            partName: data.partName,
                            S1: document.getElementById('inspection-s_1').value,
                            S2: document.getElementById('inspection-s_2').value,
                            url: data.url,
                            cmm: document.getElementById('cmm').checked,
                            hand: document.getElementById('hand').checked,
                            proshop: document.getElementById('data').checked,
                            other: document.getElementById('other-task').value,
                            ipcNum: document.getElementById('ipc-num').value
                        }
                        localStorage.setItem('inspectionprintData', JSON.stringify(printData));
                        chrome.tabs.create({ url: "WO/inspectionprint.html" });
                    }
                    else if (document.getElementById('inspection-options-button').checked) {
                        const printData = {
                            woNumber: data.woNumber,
                            cmm: document.getElementById('cmm').checked,
                            hand: document.getElementById('hand').checked,
                            proshop: document.getElementById('data').checked,
                            other: document.getElementById('other-task').value,
                            ipcNum: document.getElementById('ipc-num').value
                        }
                        localStorage.setItem('inspectionprintData', JSON.stringify(printData));
                        chrome.tabs.create({ url: "WO/inspectionprint.html" });
                    }
                    else {
                    const printData = {
                        woNumber: data.woNumber,
                        cmm: true,
                        hand: true,
                        proshop: true,
                        other: '',
                        ipcNum: ''
                    };
                    localStorage.setItem('inspectionprintData', JSON.stringify(printData));
                    chrome.tabs.create({ url: "WO/inspectionprint.html" });
                    }
                } else {
                    console.error("No results returned from the content script.");
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
});

function inspectionextractPageData() {
    const data = {
        woNumber: '',
    };

    const woNumber = document.querySelector('#mainAtts_workOrderNumber_value');
    data.woNumber = woNumber.textContent;


    return data;
}

