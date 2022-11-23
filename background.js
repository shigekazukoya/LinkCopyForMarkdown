const copyToClipboard = (tab, text) => {
  function injectedFunction(text) {
    try {
      navigator.clipboard.writeText(text);
      //console.log('successfully');
    } catch (e) {
      //console.log('failed');
    }
  }
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: injectedFunction,
    args: [text]
  });
};

const updateContextMenus = async () => {
  await chrome.contextMenus.removeAll();

  chrome.contextMenus.create({
      id: "LinkCopyForMarkdown",
      title: "LinkCopyForMarkdown",
      contexts: ["all"]
  });
};

chrome.runtime.onInstalled.addListener(updateContextMenus);
chrome.runtime.onStartup.addListener(updateContextMenus);
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
  case 'LinkCopyForMarkdown':
      copyToClipboard(tab, "["+tab.title+"}]("+tab.url+")");
    break;
  }
});
