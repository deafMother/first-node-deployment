console.log('Client side JS file loaded');
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-one');

const getWeather = location => {
  messageOne.textContent = 'loading...';
  fetch(`/weather?address=${location}`)
    .then(response => {
      response.json().then(data => {
        if (data.error) {
          messageTwo.textContent = data.error;
        } else {
          messageOne.textContent =
            data.location + data.forecast;
        }
      });
    })
    .catch(err => {
      // catch can be impleted properly here but not required in this silmple app
      console.log(err);
    });
};

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = searchElement.value;
  getWeather(location);
});
