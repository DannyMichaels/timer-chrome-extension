const timeElement = document.getElementById('time');

const setTime = () => {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = currentTime;
};

const setBadgeText = () => {
  return chrome.action.setBadgeText(
    {
      text: 'TIME',
    },
    () => {
      console.log('Finished setting badge text');
    }
  );
};

const onComponentDidMount = () => {
  setBadgeText();
  setTime();
};

setInterval(() => {
  setTime();
}, 1000);

onComponentDidMount();
