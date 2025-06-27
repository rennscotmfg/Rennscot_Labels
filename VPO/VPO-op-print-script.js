document.addEventListener('DOMContentLoaded', (event) => {
    const vpo = localStorage.getItem('vpo') || 'None';
    const supplier = localStorage.getItem('supplier') || 'None';
    const lineNum = localStorage.getItem('lineNum') || 'None';
    const cert = localStorage.getItem('cert') || 'None';
    const process = localStorage.getItem('process') || 'None';
    const isChecked = localStorage.getItem('isChecked') || '';
    const printContentDiv = document.getElementById('printContent');

    if (printContentDiv) {
        printContentDiv.innerHTML = `
        <div class="container">
        <div class="header-container">
        <div class="center poppins-bold" id="header"><strong>${vpo}</strong></div>
        <img class="barcode" src="https://quickchart.io/barcode?type=code39&text=${vpo}">
        <img src="../images/rennscot_print.png" width="32" height="40"></img>
        </div>
        </div>
        <table>
            <tr>
                <td class="label poppins-bold">Vendor:</td>
                <td class="poppins-regular">${supplier}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Line #</td>
                <td class="poppins-regular">${lineNum}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Cert #:</td>
                <td class="poppins-regular">${cert}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Process:</td>
                <td class="poppins-regular">${process}</td>
            </tr>
            ${isChecked}
        </table>
        </div>
        `;
    }
    window.onload = function() {
        window.print();
    };
});