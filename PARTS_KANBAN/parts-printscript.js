document.addEventListener('DOMContentLoaded', (event) => {
    const printData = JSON.parse(localStorage.getItem('partsprintData') || '{}');
    const qty = localStorage.getItem('qty');
    const action = localStorage.getItem('action');

    const printContentDiv = document.getElementById('printContent');
    if (printContentDiv) {
        printContentDiv.innerHTML = `
        <table>
            <thead>
                <th class="name" colspan="2">PRODUCTION KANBAN</th>
            </thead>
            <tbody>
                <tr>
                    <td class="title">NAME</td>
                    <td>${printData.PartName}</td>
                </tr>
                <tr>
                    <td class="title">PN</td>
                    <td>${printData.PartNumber}</td>
                </tr>
                <tr>
                    <td class="title">QTY</td>
                    <td>${qty}</td>
                </tr>
                <tr>
                    <td colspan="2"><strong>ACTION:</strong> ${action}</td>
                </tr>
            </tbody>
        </table>
        </div>
        `;
    }
    window.onload = function() {
        window.print();
    };
});
