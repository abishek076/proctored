chrome.runtime.onInstalled.addListener(() => {
  console.log('Proctored Plugin installed');
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'closeAllTabs') {
    chrome.tabs.query({}, (tabs) => {
      for (let tab of tabs) {
        chrome.tabs.remove(tab.id);
      }
    });
  } else if (message.type === 'disableExtensions') {
    chrome.management.getAll((extensions) => {
      extensions.forEach((extension) => {
        if (extension.id !== chrome.runtime.id && extension.enabled) {
          chrome.management.setEnabled(extension.id, false, () => {
            console.log(`Disabled extension: ${extension.name}`);
          });
        }
      });
      alert('All other extensions have been disabled. Please restart your browser to ensure they are completely disabled.');
    });
  }
});
