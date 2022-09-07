// https://developer.chrome.com/docs/extensions/reference/alarms/
chrome.alarms.create({
  periodInMinutes: 1 / 60, // fire every one second (1 60th of a mintute is a second)
});

const onAlarm = async (alarm) => {
  chrome.storage.local.get(
    ['timer', 'isRunning'],
    async ({ timer = 0, isRunning = false }) => {
      if (!isRunning) return;

      chrome.storage.local.set({
        timer: timer + 1,
      });

      chrome.action.setBadgeText({
        text: `${timer + 1}`,
      });

      // if 1000 seconds have passed
      // if (timer % 1000 === 0) {
      //   showNotification('1000 seconds have passed!');
      // }

      const notificationTime = await getNotificationTime();
      console.log(timer, notificationTime);
      // if notification time has passed
      if (timer % notificationTime === 0) {
        showNotification(`${notificationTime} seconds has passed!`);
      }
    }
  );
};

chrome.alarms.onAlarm.addListener(onAlarm);

const showNotification = (message) => {
  // make sure that chrome has notifications enabled in Notifications & Actions settings windows 10...
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
  this.registration.showNotification('Chrome Timer Extension', {
    body: message,
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

const getNotificationTime = async () => {
  const { notificationTime = 1000 } = await chrome.storage.sync.get([
    'notificationTime',
  ]);

  return Number(notificationTime);
};

// console.log(this); // => ServiceWorkerGlobalScope
