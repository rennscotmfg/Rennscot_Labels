document.addEventListener('DOMContentLoaded', (event) => {
    const vpo = localStorage.getItem('vpo') || 'None';
    const supplier = localStorage.getItem('supplier') || 'None';
    const lineNum = localStorage.getItem('lineNum') || 'None';
    const cert = localStorage.getItem('cert') || 'None';
    const material = localStorage.getItem('material') || 'None';
    const size = localStorage.getItem('size') || 'None';
    const isChecked = localStorage.getItem('isChecked') || '';
    const printContentDiv = document.getElementById('printContent');
    let cots = localStorage.getItem('cots') || '';
    let cots_label = '';
    if (cots !== '') {
        cots = ` | ${cots}`;
        cots_label = ' | COTS #';
    }

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
                <td class="label poppins-bold">Supplier:</td>
                <td class="poppins-regular">${supplier}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Line #${cots_label}:</td>
                <td class="poppins-regular">${lineNum}${cots}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Cert #:</td>
                <td class="poppins-regular">${cert}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Material:</td>
                <td class="poppins-regular">${material}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Size:</td>
                <td class="poppins-regular">${size}</td>
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