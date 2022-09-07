const timeElement = document.getElementById('time');
const nameElement = document.getElementById('name');

const setTime = () => {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = currentTime;
};

const setBadgeText = () => {
  // https://developer.chrome.com/docs/extensions/reference/action/
  chrome.action.setBadgeText(
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
  chrome.storage.sync.get(['name'], ({ name = '' }) => {
    if (!name) return;

    nameElement.textContent = `Your name is: ${name}`;
  });
};

setInterval(() => {
  setTime();
}, 1000);

onComponentDidMount();
