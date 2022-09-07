// https://developer.chrome.com/docs/extensions/reference/alarms/
chrome.alarms.create({
  periodInMinutes: 1 / 60, // fire every one second (1 60th of a mintute is a second)
});

const onAlarm = (alarm) => {
  chrome.storage.local.get(['timer'], ({ timer = 0 }) => {
    chrome.storage.local.set({
      timer: timer + 1,
    });

    chrome.action.setBadgeText({
      text: `${timer + 1}`,
    });
  });

  // make sure that chrome has notifications enabled in Notifications & Actions settings windows 10...
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
  this.registration.showNotification('Chrome Timer Extension', {
    body: '1 second has passed!',
    icon: './icon.png',
  });

  // const options = {
  //   type: 'basic',
  //   iconUrl: './icon.png',
  //   title: 'Chrome Timer Extension',
  //   message: '1 second has passed!',
  // };

  // chrome.notifications.create(options);
};

chrome.alarms.onAlarm.addListener(onAlarm);

// console.log(this); // => ServiceWorkerGlobalScope
