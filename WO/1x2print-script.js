document.addEventListener('DOMContentLoaded', (event) => {
    const printData = JSON.parse(localStorage.getItem('1x2printData') || '{}');
    const printContentDiv = document.getElementById('printContent');

    if (printContentDiv) {
        if (printData.S1 && printData.S2) {
            var new_html_content = ''
            for (let num = Number(printData.S1); num <= Number(printData.S2); num++) {
                num_0 = ("000" + String(num)).slice(-3)
                serial = '-'+num_0;
                new_html_content += `
                <div class="printSheet">
                <div class="container">
                <table>
                    <tr>
                        <td class="label poppins-bold">S/N:</td>
                        <td class="poppins-regular">${printData.WorkOrderNumber || 'Not found'}${serial}</td>
                    </tr>
                    <tr>
                        <td class="label poppins-bold">PO:</td>
                        <td class="poppins-regular">${printData.PONumber || 'Not found'}</td>
                    </tr>
                    <tr>
                        <td class="label poppins-bold">PN:</td>
                        <td class="poppins-regular">${printData.PartNumber || 'Not found'}</td>
                    </tr>
                    <tr>
                        <td class="label poppins-bold">REV:</td>
                        <td class="poppins-regular">${printData.Rev || 'Not found'}</td>
                    </tr>
                                
                </table>
                </div>
                </div>
                `;
            }
            printContentDiv.innerHTML = new_html_content;
        }
        else {
            const html_content = `
            <div class="printSheet">
            <div class="container">
            <table>
                <tr>
                    <td class="label poppins-bold">LOT:</td>
                    <td class="poppins-regular">${printData.WorkOrderNumber || 'Not found'}</td>
                </tr>
                <tr>
                    <td class="label poppins-bold">PO:</td>
                    <td class="poppins-regular">${printData.PONumber || 'Not found'}</td>
                </tr>
                <tr>
                    <td class="label poppins-bold">PN:</td>
                    <td class="poppins-regular">${printData.PartNumber || 'Not found'}</td>
                </tr>
                <tr>
                    <td class="label poppins-bold">REV:</td>
                    <td class="poppins-regular">${printData.Rev || 'Not found'}</td>
                </tr>
                            
            </table>
            </div>
            </div>
            `;
            printContentDiv.innerHTML = html_content;
        }
    }
    window.onload = function() {
        window.print();
    };
});
