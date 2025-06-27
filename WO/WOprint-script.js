document.addEventListener('DOMContentLoaded', (event) => {
    const printData = JSON.parse(localStorage.getItem('WOprintData') || '{}');
    const printContentDiv = document.getElementById('printContent');

    if (printContentDiv) {
        printContentDiv.innerHTML = `
        <div class="container">
        <div class="qr-code-container">
        <img src="../images/rennscot_print.png" width="40" height="50"></img>
        <div class="center poppins-bold" style="font-size: 20px">${printData.WorkOrderNumber || 'Not found'}</div>
        <div id="qrcode"><img src="https://api.qrserver.com/v1/create-qr-code/?data=${printData.URL}&size=65x65"/></div>
        </div>
        <table>
            <tr>
                <td class="label poppins-bold">PO #:</td>
                <td class="poppins-regular">${printData.PONumber || 'Not found'}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Part #:</td>
                <td class="poppins-regular">${printData.PartNumber || 'Not found'}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Part Name:</td>
                <td class="poppins-regular">${printData.PartName || 'Not found'}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Rev:</td>
                <td class="poppins-regular">${printData.Rev || 'Not found'}</td>
            </tr>
            
            ${printData.Itar}
            
        </table>
        </div>
        `;
    }
    window.onload = function() {
        window.print();
    };
});
