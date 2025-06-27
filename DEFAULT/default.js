document.getElementById('chipbin').addEventListener('click', function() {
    chrome.tabs.create({ url: "CHIP_BIN/chipbin-popup.html" });
    window.close()
})

document.getElementById('order').addEventListener('click', function() {
    chrome.tabs.create({ url: "ORDER_KANBAN/order-popup.html" });
})