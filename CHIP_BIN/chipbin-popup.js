document.getElementById('material_type').addEventListener('change', function() {
    if (this.value === 'Other') {
        document.getElementById('material_type_other').style.display = 'block';
    } else {
        document.getElementById('material_type_other').style.display = 'none';
    }
})

document.getElementById('material_form').addEventListener('change', function() {
    if (this.value === 'Other') {
        document.getElementById('material_form_other').style.display = 'block';
    } else {
        document.getElementById('material_form_other').style.display = 'none';
    }
})

document.getElementById('chipbin').addEventListener('click', function() {
    if (document.getElementById('material_type').value === 'Other') {
        localStorage.setItem('material_type', document.getElementById('material_type_other').value);
    } else {
        localStorage.setItem('material_type', document.getElementById('material_type').value);
    }
    if (document.getElementById('material_form').value === 'Other') {
        localStorage.setItem('material_form', document.getElementById('material_form_other').value);
    } else {
        localStorage.setItem('material_form', document.getElementById('material_form').value);
    }

    let date = new Date().toLocaleDateString();

    localStorage.setItem('date', date);

    chrome.tabs.create({ url: "CHIP_BIN/chipbinprint.html" });
})