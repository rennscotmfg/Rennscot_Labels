document.addEventListener('DOMContentLoaded', (event) => {
    const name = localStorage.getItem('name');
    const vendor = localStorage.getItem('vendor');
    const pn = localStorage.getItem('pn');
    const min = localStorage.getItem('min');
    const qty = localStorage.getItem('qty');
    const location = localStorage.getItem('location');
    const url = localStorage.getItem('url');

    const printContentDiv = document.getElementById('printContent');
    if (printContentDiv) {
        printContentDiv.innerHTML = `
        <table>
            <thead>
                <th class="name" colspan="2">${name}</th>
            </thead>
            <tbody>
                <tr>
                    <td class="title">VENDOR</td>
                    <td>${vendor}</td>
                </tr>
                <tr>
                    <td class="title">PN</td>
                    <td>${pn}</td>
                </tr>
                <tr>
                    <td class="title">MIN</td>
                    <td>${min}</td>
                </tr>
                <tr>
                    <td class="title">ORD QTY</td>
                    <td>${qty}</td>
                </tr>
                <tr>
                    <td class="title">LOCATION</td>
                    <td>${location}</td>
                </tr>
            </tbody>
        </table>
        <div class="qr-code">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x8 0&data=${url}" alt="QR Code">
        </div>
        `;
    }
    window.onload = function() {
        window.print();
    };
});
