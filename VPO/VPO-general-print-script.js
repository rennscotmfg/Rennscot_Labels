document.addEventListener('DOMContentLoaded', (event) => {
    const vpo = localStorage.getItem('vpo') || 'None';
    const supplier = localStorage.getItem('supplier') || 'None';
    const lineNum = localStorage.getItem('lineNum') || 'None';
    const order = localStorage.getItem('order') || 'None';
    const cots = localStorage.getItem('cots') || 'None';
    const description = localStorage.getItem('description') || 'None';
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
                <td class="label poppins-bold">Supplier:</td>
                <td class="poppins-regular">${supplier}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Line #</td>
                <td class="poppins-regular">${lineNum}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Order #:</td>
                <td class="poppins-regular">${order}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">COTS #:</td>
                <td class="poppins-regular">${cots}</td>
            </tr>
            <tr>
                <td class="label poppins-bold">Description:</td>
                <td class="poppins-regular">${description}</td>
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