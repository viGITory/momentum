const setDate = () => {
  const currentTime = document.querySelector('.date__time');
  const currentDate = document.querySelector('.date__date');
  const greeting = document.querySelector('.date__greeting');

  const now = new Date();

  let seconds = now.getSeconds();
  let mins = now.getMinutes();
  let hour = now.getHours();

  if (hour >= 6 && hour < 12) {
    greeting.textContent = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greeting.textContent = 'Good afternoon';
  } else if (hour >= 18 && hour < 24) {
    greeting.textContent = 'Good evening';
  } else {
    greeting.textContent = 'Good night';
  }

  if (hour < 10) {
    hour = '0' + hour;
  }

  if (mins < 10) {
    mins = '0' + mins;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  currentTime.textContent = hour + ' : ' + mins + ' : ' + seconds;
  currentDate.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};
setDate();
setInterval(setDate, 1000);
