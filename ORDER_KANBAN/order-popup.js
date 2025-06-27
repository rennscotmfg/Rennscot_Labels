document.getElementById('order').addEventListener('click', function() {
    localStorage.setItem('name', document.getElementById('name').value);
    localStorage.setItem('vendor', document.getElementById('vendor').value);
    localStorage.setItem('pn', document.getElementById('pn').value);
    localStorage.setItem('min', document.getElementById('min').value);
    localStorage.setItem('qty', document.getElementById('qty').value);
    localStorage.setItem('location', document.getElementById('location').value);
    localStorage.setItem('url', encodeURI(document.getElementById('url').value));

    chrome.tabs.create({ url: "ORDER_KANBAN/order-print.html" });
})