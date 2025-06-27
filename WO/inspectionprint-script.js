document.addEventListener('DOMContentLoaded', (event) => {
    const printData = JSON.parse(localStorage.getItem('inspectionprintData') || '{}');
    const printContentDiv = document.getElementById('printContent');
    let cmm = 'N/A';
    let hand = 'N/A';
    let data = 'N/A';
    if (printData.cmm == true) {
        cmm = '';
    }
    if (printData.hand == true) {
        hand = '';
    }
    if (printData.proshop == true) {
        data = '';
    }
    let other = '';
    if (printData.other != '') {
        other = `
        <tr>
            <td class="task">${printData.other}</td>
            <td/>
        </tr>
        `;
    }
    let ipcNum = '';
    if (printData.ipcNum != '') {
        ipcNum = printData.ipcNum;
    }


    if (printContentDiv) {
        if (printData.S1 && printData.S2) {
            var new_html_content = ''
            for (let num = Number(printData.S1); num <= Number(printData.S2); num++) {
                if (num % ipcNum == 0) {
                    fullChecked = 'checked';
                    partialChecked = '';
                }
                else {
                    fullChecked = '';
                    partialChecked = 'checked';
                }
                num_0 = ("000" + String(num)).slice(-3)
                serial = '-'+num_0;
                new_html_content += `
                <div class="printSheet">
                <div class="container">
                    <table>
                        <th class="label poppins-bold" style="font-size: 14px;">${printData.woNumber}${serial}</th>
                        <tr>
                            <td>
                                <div style="text-align: center;"><strong class="checkbox-label">FA</strong>&nbsp;<input type="checkbox"/><strong class="checkbox-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IPC</strong>&nbsp;&nbsp;FUll<input type="checkbox" ${fullChecked}/>&nbsp;PARTIAL<input type="checkbox" ${partialChecked}/></div>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <th>TASK STATUS</th>
                        <th width="30%">COMPLETED BY</th>
                        <tr>
                            <td class="task">CMM</td>
                            <td>${cmm}</td>
                        </tr>
                        <tr>
                            <td class="task">Hand Check</td>
                            <td>${hand}</td>
                        </tr>
                        ${other}
                        <tr>
                            <td class="task">Data in Proshop</td>
                            <td>${data}</td>
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
                        <th class="label poppins-bold" style="font-size: 20px;">${printData.woNumber}</th>
                        <tr>
                            <td>
                                <div style="text-align: center;"><strong class="checkbox-label">FA</strong>&nbsp;<input type="checkbox"/><strong class="checkbox-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IPC</strong>&nbsp;&nbsp;FUll<input type="checkbox"/>&nbsp;PARTIAL<input type="checkbox" checked/></div>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <th>TASK STATUS</th>
                        <th width="30%">COMPLETED BY</th>
                        <tr>
                            <td class="task">CMM</td>
                            <td>${cmm}</td>
                        </tr>
                        <tr>
                            <td class="task">Hand Check</td>
                            <td>${hand}</td>
                        </tr>
                        ${other}
                        <tr>
                            <td class="task">Data in Proshop</td>
                            <td>${data}</td>
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