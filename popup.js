const timeElement = document.getElementById('time');
const nameElement = document.getElementById('name');
const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const stopBtn = document.getElementById('stop');

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

  startBtn.addEventListener('click', () => {
    chrome.storage.local.set({
      isRunning: true,
    });
  });

  stopBtn.addEventListener('click', () => {
    chrome.storage.local.set({
      isRunning: false,
    });
  });

  resetBtn.addEventListener('click', () => {
    chrome.storage.local.set({
      timer: 0,
      isRunning: false,
    });

    chrome.action.setBadgeText({
      text: '0',
    });
  });
};

setInterval(() => {
  setTime();
  setTimer();
}, 1000);

onComponentDidMount();
