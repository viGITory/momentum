const setDate = () => {
  const dateHours = document.querySelector('.date__hour');
  const dateMinutes = document.querySelector('.date__minute');
  const dateSeconds = document.querySelector('.date__second');
  const dateDay = document.querySelector('.date__day');
  const dateGreeting = document.querySelector('.date__greeting');
  const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];

  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  dateHours.textContent = `${hours} : `;
  dateMinutes.textContent = `${minutes} : `;
  dateSeconds.textContent = `${seconds}`;
  dateDay.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  dateGreeting.textContent = `Good ${timesOfDay[Math.floor(hours / 6)]},`;

  setTimeout(setDate, 1000);
};
setDate();

const setUserName = () => {
  const userName = document.querySelector('.date__input');

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('name', userName.value);
  });

  window.addEventListener('load', () => {
    if (localStorage.getItem('name')) {
      userName.value = localStorage.getItem('name');
    }
  });

  userName.addEventListener('change', () => {
    if (userName.value) {
      userName.value = `${userName.value[0].toUpperCase()}${userName.value.slice(1)}`;
    }
  });
};
setUserName();
