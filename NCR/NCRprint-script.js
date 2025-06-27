document.addEventListener('DOMContentLoaded', (event) => {
    const printData = JSON.parse(localStorage.getItem('NCRprintData') || '{}');
    const printContentDiv = document.getElementById('printContent');

    if (printContentDiv) {
        printContentDiv.innerHTML = `
        <div class="container">
        <div class="qr-code-container">
        <img src="../images/rennscot_print.png" width="40" height="50"></img>
        <div class="center poppins-bold" id="header"><strong>${printData.NCRNumber || ''}</strong></div>
        <div id="qrcode"><img src="https://api.qrserver.com/v1/create-qr-code/?data=${printData.URL}&size=60x60"/></div>
        </div>
        <table>
            <tr>
                <td class="label poppins-bold">NCR Code:</td>
                <td class="poppins-regular">${printData.NCRCode || ''}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Cause Code:</td>
                <td class="poppins-regular">${printData.CauseCode || ''}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Part # / Rev:</td>
                <td class="poppins-regular">${printData.PartNumber || ''} <strong>/</strong> ${printData.Rev || ''}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Part Name:</td>
                <td class="poppins-regular">${printData.PartName || ''}</td>
            </tr>
            <tr>
                <td class="label poppins-bold" colspan="2">NON CONFORMING</td>
            </tr>
        </table>
        </div>
        `;
    }
    window.onload = function() {
        window.print();
    };
});

//<img class="barcode" src="https://quickchart.io/barcode?type=code39&text=${printData.NCRNumber}">