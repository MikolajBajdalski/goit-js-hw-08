import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const LOCAL_STORAGE_KEY = 'feedback-form-state';


const saveStateToLocalStorage = () => {
  const state = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};


const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedState) {
    const state = JSON.parse(savedState);
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
};


const clearLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};


form.addEventListener('input', throttle(saveStateToLocalStorage, 500));


window.addEventListener('load', loadStateFromLocalStorage);


form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearLocalStorage();
  console.log('Submitted:', {
    email: emailInput.value,
    message: messageInput.value
  });
  form.reset();
});
