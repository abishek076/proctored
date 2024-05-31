document.getElementById('start').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: startProctoring
      });
      chrome.runtime.sendMessage({ type: 'disableExtensions' });
    } else {
      console.error('No active tab found');
    }
  });
});

document.getElementById('stop').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: stopProctoring
      });
    } else {
      console.error('No active tab found');
    }
  });
});

function startProctoring() {
  startVideoCapture();
  monitorUserActivity();
  enterFullScreen();
  preventCopying();
}

function stopProctoring() {
  stopVideoCapture();
  stopMonitoringUserActivity();
  exitFullScreen();
  allowCopying();
}
