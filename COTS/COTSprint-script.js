document.addEventListener('DOMContentLoaded', (event) => {
    const printData = JSON.parse(localStorage.getItem('COTSprintData') || '{}');
    const printContentDiv = document.getElementById('printContent');

    if (printContentDiv) {
        printContentDiv.innerHTML = `
        <div class="qr-code-container">
            <div class="tool-container center poppins-bold" id="header">
                <strong>${printData.cotsNumber}</strong>
            </div>
            <div id="qrcode"><img src="https://api.qrserver.com/v1/create-qr-code/?data=${printData.URL}&size=60x60"/></div>
        </div>
        `;
    }
    window.onload = function() {
        window.print();
    };
});

//<img class="barcode" src="https://quickchart.io/barcode?type=code39&text=${printData.NCRNumber}">