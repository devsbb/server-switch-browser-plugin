var selected = "";

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({version: 'default'}, function() {
      console.log("Wrote initial value.");
    });
    localStorage.setItem('version','default');

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlContains: 'getgrover.com'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });

      chrome.webRequest.onBeforeSendHeaders.addListener(
        rewriteUserAgentHeader,
        {urls: ['<all_urls>']},
        ["blocking", "requestHeaders"]
      );
});

function rewriteUserAgentHeader(e) {
    const result = localStorage.getItem('version');
    console.log("Rewrote Header: " + result);
    e.requestHeaders.push({name: "X-Server-Select", value: result});
    return {requestHeaders: e.requestHeaders};
}