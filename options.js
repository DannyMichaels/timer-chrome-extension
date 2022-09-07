const nameInput = document.getElementById('name-input');
const timeInput = document.getElementById('time-input');
const saveBtn = document.getElementById('save-btn');

const onSaveClick = () => {
  // https://developer.chrome.com/docs/extensions/reference/storage/

  const name = nameInput.value;
  const notificationTime = timeInput.value;

  chrome.storage.sync.set(
    {
      name,
      notificationTime,
    },
    () => {
      console.log(`Name is set to: ${name}`);
      console.log(`notificationTime is set to: ${notificationTime}`);
    }
  );
};

const onComponentDidMount = () => {
  saveBtn.addEventListener('click', onSaveClick);

  // get name from storage, the array can get other valus too.
  chrome.storage.sync.get(['name', 'notificationTime'], (result) => {
    const { name = '', notificationTime = 1000 } = result;
    nameInput.value = name;
    timeInput.value = notificationTime;
  });
};

onComponentDidMount();
