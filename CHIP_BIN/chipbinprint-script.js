document.addEventListener('DOMContentLoaded', (event) => {
    const material_type = localStorage.getItem('material_type') || 'None';
    const material_form = localStorage.getItem('material_form') || 'None';
    const date = localStorage.getItem('date') || 'None';
    const printContentDiv = document.getElementById('printContent');
    if (printContentDiv) {
        printContentDiv.innerHTML = `
        <div class="material-row">
        <img src="../images/rennscot_box.png" class="rennscot">
        </div>
        <div class="material-row">
            <p>${material_type}</p>
        </div>
        <div class="material-row">
            <p>${material_form}</p>
        </div>
        <div class="material-row">
            <span class="poppins-regular">${date}</span>
        </div>
        `;
    }
    window.onload = function() {
        window.print();
    };
});
