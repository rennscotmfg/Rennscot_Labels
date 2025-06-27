// Get VPO Type from the active tab and execute a callback with the result
function getVPOType(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs.length > 0) {
            const tabId = tabs[0].id;
            chrome.scripting.executeScript({
                target: { tabId },
                func: extractVPOTypeFromPage
            }, (injectionResults) => {
                const VPOType = injectionResults?.[0]?.result || null;
                callback(VPOType);
            });
        } else {
            console.error("No active tabs found");
            callback(null);
        }
    });
}

// Function to extract the VPOType from the active tab's page
function extractVPOTypeFromPage() {
    const element = document.querySelector('#mainEditingForm > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > div:nth-child(4) > p:nth-child(2)');
    return element ? element.textContent.trim() : null;
}

// Extract material data from the page
function extractMaterialData() {
    const data = {};
    
    // Helper function to truncate text and add "..." if it's cut off
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    // Helper function to remove text inside parentheses
    function removeTextInParentheses(text) {
        return text.replace(/\(.*?\)/g, '').trim(); // Remove anything within parentheses, including the parentheses
    }
    
    data.vpo = document.querySelector('#mainEditingForm > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > div:nth-child(1) > p').textContent.trim();

    data.supplier = truncateText(document.querySelector('#mainEditingForm > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > div > div:nth-child(1) > div:nth-child(2) > div > div > a > span').textContent.trim(), 37);

    // Process the table rows and ensure no values exceed 37 characters, adding ellipsis if needed
    data.table = Array.from(document.querySelectorAll('#mainEditingForm > table > tbody > tr:nth-child(2) > td > table.add-new-row.table.table-striped.table-hover.poBody-main-table > tbody > tr'))
        .map(row => {
            const cells = row.getElementsByTagName('td');
            if (cells.length === 33 && cells[0].innerText.trim()) {
                return {
                    line: truncateText(cells[0].innerText.trim(), 37),
                    cots: removeTextInParentheses(truncateText(cells[2].innerText.trim(), 37)) || '',
                    cert: truncateText(cells[18].innerText.trim().split('\n')[0], 37),
                    material: truncateText(cells[4].innerText.trim(), 37),
                    size: truncateText(removeTextInParentheses(cells[5].innerText.trim()), 37) // Remove parentheses content from proc
                };
            }
            return null;
        })
        .filter(Boolean); // Remove any null entries

    return data;
}

// Inject script into the page to extract material data
function extractMaterialDataFromTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: extractMaterialData,
                world: "MAIN"
            }, (result) => {
                if (result?.[0]?.result) {
                    const data = result[0].result;
                    const { vpo, supplier, table } = data;

                    // Store the extracted data in localStorage
                    localStorage.setItem('vpo', vpo);
                    localStorage.setItem('supplier', supplier);

                    updateMaterialVPOList(table);
                }
            });
        }
    });
}

// Populate the VPO list with material lines and radio buttons
function updateMaterialVPOList(tableData) {
    const vpolist = document.getElementById('vpolist');
    vpolist.innerHTML = ''; // Clear existing items

    tableData.forEach(item => {
        const has_numbers = /\d/.test(item.line);
        if (has_numbers) {
        const listItem = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'lineSelection';
        radio.setAttribute('lineNum', item.line);
        if (item.cots !== '') {
            radio.setAttribute('cots', item.cots);
        }
        else {
            radio.setAttribute('cots', '');
        }
        radio.setAttribute('cert', item.cert);
        radio.setAttribute('material', item.material);
        radio.setAttribute('size', item.size);

        const span = document.createElement('span');
        span.textContent = item.line;

        listItem.appendChild(radio);
        listItem.appendChild(span);
        vpolist.appendChild(listItem);
        };
    });
}

function extractOPData() {
    const data = {};
    
    // Helper function to truncate text and add "..." if it's cut off
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    data.vpo = document.querySelector('#mainEditingForm > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > div:nth-child(1) > p').textContent.trim();

    data.supplier = truncateText(document.querySelector('#mainEditingForm > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > div > div:nth-child(1) > div:nth-child(2) > div > div > a > span').textContent.trim(), 37);

    // Process the table rows and ensure no values exceed 37 characters, adding ellipsis if needed
    data.table = Array.from(document.querySelectorAll('#mainEditingForm > table > tbody > tr:nth-child(2) > td > table.add-new-row.table.table-striped.table-hover.poBody-main-table > tbody > tr'))
        .map(row => {
            const cells = row.getElementsByTagName('td');
            if (cells.length === 31 && cells[0].innerText.trim()) {
                return {
                    line: truncateText(cells[0].innerText.trim(), 37),
                    cert: truncateText(cells[17].innerText.trim().split('\n')[0], 37),
                    process: truncateText(cells[3].innerText.trim(), 37)
                };
            }
            return null;
        })
        .filter(Boolean); // Remove any null entries

    return data;
}

function extractOPDataFromTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: extractOPData,
                world: "MAIN"
            }, (result) => {
                if (result?.[0]?.result) {
                    const data = result[0].result;
                    const { vpo, supplier, table } = data;

                    // Store the extracted data in localStorage
                    localStorage.setItem('vpo', vpo);
                    localStorage.setItem('supplier', supplier);

                    updateOPVPOList(table);
                }
            });
        }
    });
}

function updateOPVPOList(tableData) {
    const vpolist = document.getElementById('vpolist');
    vpolist.innerHTML = ''; // Clear existing items

    tableData.forEach(item => {
        const has_numbers = /\d/.test(item.line);
        if (has_numbers) {
        const listItem = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'lineSelection';
        radio.setAttribute('lineNum', item.line);
        radio.setAttribute('cert', item.cert);
        radio.setAttribute('process', item.process);
        const span = document.createElement('span');
        span.textContent = item.line;

        listItem.appendChild(radio);
        listItem.appendChild(span);
        vpolist.appendChild(listItem);
        };
    });
}

function extractToolingData() {
    const data = {};
    
    // Helper function to truncate text and add "..." if it's cut off
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    data.vpo = document.querySelector('#mainEditingForm > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > div:nth-child(1) > p').textContent.trim();

    data.supplier = truncateText(document.querySelector('#mainEditingForm > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > div > div:nth-child(1) > div:nth-child(2) > div > div > a > span').textContent.trim(), 37);

    // Process the table rows and ensure no values exceed 37 characters, adding ellipsis if needed
    data.table = Array.from(document.querySelectorAll('#mainEditingForm > table > tbody > tr:nth-child(2) > td > table.add-new-row.table.table-striped.table-hover.poBody-main-table > tbody > tr'))
        .map(row => {
            const cells = row.getElementsByTagName('td');
            if (cells.length === 29 && cells[0].innerText.trim()) {
                return {
                    line: truncateText(cells[0].innerText.trim(), 37),
                    order: truncateText(cells[1].innerText.trim(), 37),
                    tool: truncateText(cells[2].innerText.trim(), 37),
                    description: truncateText(cells[3].innerText.trim(), 37),
                };
            }
            return null;
        })
        .filter(Boolean); // Remove any null entries

    return data;
}

function extractToolingDataFromTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: extractToolingData,
                world: "MAIN"
            }, (result) => {
                if (result?.[0]?.result) {
                    const data = result[0].result;
                    const { vpo, supplier, table } = data;

                    // Store the extracted data in localStorage
                    localStorage.setItem('vpo', vpo);
                    localStorage.setItem('supplier', supplier);

                    updateToolingVPOList(table);
                }
            });
        }
    });
}

function updateToolingVPOList(tableData) {
    const vpolist = document.getElementById('vpolist');
    vpolist.innerHTML = ''; // Clear existing items

    tableData.forEach(item => {
        const has_numbers = /\d/.test(item.line);
        if (has_numbers) {
        const listItem = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'lineSelection';
        radio.setAttribute('lineNum', item.line);
        radio.setAttribute('order', item.order);
        radio.setAttribute('tool', item.tool);
        radio.setAttribute('description', item.description);
        const span = document.createElement('span');
        span.textContent = item.line;

        listItem.appendChild(radio);
        listItem.appendChild(span);
        vpolist.appendChild(listItem);
        };
    });
}

function extractGeneralData() {
    const data = {};
    
    // Helper function to truncate text and add "..." if it's cut off
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    function removeTextInParentheses(text) {
        return text.replace(/\(.*?\)/g, '').trim(); // Remove anything within parentheses, including the parentheses
    }
    
    data.vpo = truncateText(document.querySelector('#mainEditingForm > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > div:nth-child(1) > p').textContent.trim(), 37);

    data.supplier = truncateText(document.querySelector('#mainEditingForm > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > div > div:nth-child(1) > div:nth-child(2) > div > div > a > span').textContent.trim(), 37);

    // Process the table rows and ensure no values exceed 37 characters, adding ellipsis if needed
    data.table = Array.from(document.querySelectorAll('#mainEditingForm > table > tbody > tr:nth-child(2) > td > table.add-new-row.table.table-striped.table-hover.poBody-main-table > tbody > tr'))
        .map(row => {
            const cells = row.getElementsByTagName('td');
            if (cells.length === 29 && cells[0].innerText.trim()) {
                return {
                    line: truncateText(cells[0].innerText.trim(), 37),
                    order: truncateText(cells[1].innerText.trim(), 37),
                    cots: removeTextInParentheses(truncateText(cells[2].innerText.trim(), 37)),
                    description: truncateText(cells[3].innerText.trim(), 37),
                };
            }
            return null;
        })
        .filter(Boolean); // Remove any null entries

    return data;
}

function extractGeneralDataFromTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: extractGeneralData,
                world: "MAIN"
            }, (result) => {
                if (result?.[0]?.result) {
                    const data = result[0].result;
                    const { vpo, supplier, table } = data;

                    // Store the extracted data in localStorage
                    localStorage.setItem('vpo', vpo);
                    localStorage.setItem('supplier', supplier);

                    updateGeneralVPOList(table);
                }
            });
        }
    });
}

function updateGeneralVPOList(tableData) {
    const vpolist = document.getElementById('vpolist');
    vpolist.innerHTML = ''; // Clear existing items

    tableData.forEach(item => {
        const has_numbers = /\d/.test(item.line);
        if (has_numbers) {
        const listItem = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'lineSelection';
        radio.setAttribute('lineNum', item.line);
        radio.setAttribute('order', item.order);
        radio.setAttribute('cots', item.cots);
        radio.setAttribute('description', item.description);
        const span = document.createElement('span');
        span.textContent = item.line;

        listItem.appendChild(radio);
        listItem.appendChild(span);
        vpolist.appendChild(listItem);
        };
    });
}


// Run the extraction process based on VPOType
function runExtract() {
    getVPOType(VPOType => {
        if (VPOType) {
            localStorage.setItem('VPOType', VPOType);
            if (VPOType === 'Material') {
                extractMaterialDataFromTab();
            }
            if (VPOType === 'Outside Processing') {
                extractOPDataFromTab();
            }
            if (VPOType === 'Tooling') {
                extractToolingDataFromTab();
            }
            if (VPOType === 'General') {
                extractGeneralDataFromTab();
            }
        }
    });
}

// Handle the material print action
function handleMaterialPrint() {
    const selectedOption = document.querySelector('input[name="lineSelection"]:checked');
    if (selectedOption) {
        const line = selectedOption.getAttribute('lineNum');
        const cert = selectedOption.getAttribute('cert');
        const material = selectedOption.getAttribute('material');
        const size = selectedOption.getAttribute('size');
        const cots = selectedOption.getAttribute('cots');
        localStorage.setItem('cots', cots.replace(/\s*\(.*\)\s*/, ''));

        // Store selected line and cert in localStorage
        localStorage.setItem('lineNum', line);
        localStorage.setItem('cert', cert);
        localStorage.setItem('material', material);
        localStorage.setItem('size', size);

        if (document.getElementById('checkbox').checked) {
            localStorage.setItem('isChecked', '<tr><td class="label center poppins-bold" colspan="2">CUSTOMER SUPPLIED</td></tr>');
        } else {
            localStorage.removeItem('isChecked');
        };

        chrome.tabs.create({ url: "VPO/VPO-material-print.html" });
    }
}

// Handle the material print action
function handleOPPrint() {
    const selectedOption = document.querySelector('input[name="lineSelection"]:checked');
    if (selectedOption) {
        const line = selectedOption.getAttribute('lineNum');
        const cert = selectedOption.getAttribute('cert');
        const process = selectedOption.getAttribute('process');

        // Store selected line and cert in localStorage
        localStorage.setItem('lineNum', line);
        localStorage.setItem('cert', cert);
        localStorage.setItem('process', process);

        if (document.getElementById('checkbox').checked) {
            localStorage.setItem('isChecked', '<tr><td class="label center poppins-bold" colspan="2">CUSTOMER SUPPLIED</td></tr>');
        } else {
            localStorage.removeItem('isChecked');
        };

        chrome.tabs.create({ url: "VPO/VPO-op-print.html" });
    }
}

function handleToolingPrint() {
    const selectedOption = document.querySelector('input[name="lineSelection"]:checked');
    if (selectedOption) {
        const line = selectedOption.getAttribute('lineNum');
        const order = selectedOption.getAttribute('order');
        const tool = selectedOption.getAttribute('tool');
        const description = selectedOption.getAttribute('description');

        // Store selected line and cert in localStorage
        localStorage.setItem('lineNum', line);
        localStorage.setItem('order', order);
        localStorage.setItem('tool', tool);
        localStorage.setItem('description', description);

        if (document.getElementById('checkbox').checked) {
            localStorage.setItem('isChecked', '<tr><td class="label center poppins-bold" colspan="2">CUSTOMER SUPPLIED</td></tr>');
        } else {
            localStorage.removeItem('isChecked');
        };

        chrome.tabs.create({ url: "VPO/VPO-tooling-print.html" });
    }
}

function handleGeneralPrint() {
    const selectedOption = document.querySelector('input[name="lineSelection"]:checked');
    if (selectedOption) {
        const line = selectedOption.getAttribute('lineNum');
        const order = selectedOption.getAttribute('order');
        const cots = selectedOption.getAttribute('cots');
        const description = selectedOption.getAttribute('description');

        // Store selected line and cert in localStorage
        localStorage.setItem('lineNum', line);
        localStorage.setItem('order', order);
        localStorage.setItem('cots', cots);
        localStorage.setItem('description', description);

        if (document.getElementById('checkbox').checked) {
            localStorage.setItem('isChecked', '<tr><td class="label center poppins-bold" colspan="2">CUSTOMER SUPPLIED</td></tr>');
        } else {
            localStorage.removeItem('isChecked');
        };

        chrome.tabs.create({ url: "VPO/VPO-general-print.html" });
    }
}


// Event listener for the VPO button click
document.getElementById('vpo').addEventListener('click', () => {
    if (localStorage.getItem('VPOType') === 'Material') {
        handleMaterialPrint();
    }
    if (localStorage.getItem('VPOType') === 'Outside Processing') {
        handleOPPrint();
    }
    if (localStorage.getItem('VPOType') === 'Tooling') {
        handleToolingPrint();
    }
    if (localStorage.getItem('VPOType') === 'General') {
        handleGeneralPrint();
    }
});

// Initial execution
runExtract();
