e = document.getElementById("selector");

e.addEventListener("change", function() {
    chrome.storage.sync.set({version: e.options[e.selectedIndex].value}, function() {
        console.log("Wrote updated value.");
    });

    localStorage.setItem('version',e.options[e.selectedIndex].value);

    chrome.tabs.getSelected(null, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
    });
});