const currentHistoryState = window.history.state;
const pageTitle = document.querySelector('title').text;
const hashPaths = /#!(\/.*)$/.exec(location.hash);
const path = hashPaths ? hashPaths[1] : undefined;
if (path) {
  window.history.replaceState(currentHistoryState, pageTitle, path);
}
