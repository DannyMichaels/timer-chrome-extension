const nameInput = document.getElementById('name-input');
const saveBtn = document.getElementById('save-btn');

const onSaveClick = () => {
  // https://developer.chrome.com/docs/extensions/reference/storage/

  const { value } = nameInput;

  chrome.storage.sync.set(
    {
      name: value,
    },
    () => {
      console.log(`Name is set to: ${value}`);
    }
  );
};

const onComponentDidMount = () => {
  saveBtn.addEventListener('click', onSaveClick);

  // get name from storage, the array can get other valus too.
  chrome.storage.sync.get(['name'], (result) => {
    const { name = '' } = result;
    nameInput.value = name;
  });
};

onComponentDidMount();
