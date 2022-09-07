const timeElement = document.getElementById('time');
const nameElement = document.getElementById('name');
const timerElement = document.getElementById('timer');

const setTime = () => {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = currentTime;
};

// const setBadgeText = () => {
//   // https://developer.chrome.com/docs/extensions/reference/action/
//   chrome.action.setBadgeText(
//     {
//       text: 'TIME',
//     },
//     () => {
//       console.log('Finished setting badge text');
//     }
//   );
// };

const initName = () => {
  chrome.storage.sync.get(['name'], ({ name = '' }) => {
    if (!name) return;

    nameElement.textContent = `Your name is: ${name}`;
  });
};

const setTimer = () => {
  chrome.storage.local.get(['timer'], ({ timer = 0 }) => {
    timerElement.textContent = `The timer is at ${timer} seconds`;
  });
};

const onComponentDidMount = () => {
  // setBadgeText();
  setTimer();
  setTime();
  initName();
};

setInterval(() => {
  setTime();
  setTimer();
}, 1000);

onComponentDidMount();
