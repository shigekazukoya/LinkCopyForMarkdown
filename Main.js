// Create one test item for each context type.
var contexts = ["page", "selection", "link", "editable", "image", "video",
  "audio"];

for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Test '" + context + "' menu item";
  var id = chrome.contextMenus.create({
    "title": "LinkCopyForMarkdown", "contexts": [context],
    "onclick": genericOnClick
  });
}

function genericOnClick(info, tab) {
  var title = GetTitle()
  var url = GetURL()
  var formatedtext = FormatToMarkdownLink(tab.title, tab.url)
  CopyToClipBoad(formatedtext)
}

function GetTitle() {
  return window.title
}

function GetURL() {
  return window.location.href
}

function FormatToMarkdownLink(title, url) {
  let str = "[{0}]({1})";
  return str.format(title, url);
}

(function () {
  if (!String.prototype.format) {
    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    };
  }
})();

function CopyToClipBoad(text) {
  var ta = document.createElement("textarea")
  ta.value = text
  document.body.appendChild(ta)
  ta.select()
  document.execCommand("copy")
  ta.parentElement.removeChild(ta)
}