// https://developer.chrome.com/docs/extensions/reference/alarms/
chrome.alarms.create({
  periodInMinutes: 1 / 60, // fire every one second (1 60th of a mintute is a second)
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(['timer'], ({ timer = 0 }) => {
    chrome.storage.local.set({
      timer: timer + 1,
    });

    chrome.action.setBadgeText({
      text: `${timer + 1}`,
    });
  });
});
