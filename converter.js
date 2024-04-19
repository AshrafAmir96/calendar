const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');
const month_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');
const form = document.getElementById('converter');
const filesToCache = [
'/',
'/index.html',
'/manifest.json',
'/converter.css',
'/converter.js',
'/favicon.ico',
// Add more files and paths to cache as needed
];

self.addEventListener('install', function (e) {
e.waitUntil(
  caches.open(cacheName).then(function (cache) {
    return cache.addAll(filesToCache);
  })
);
});

self.addEventListener('fetch', function (e) {
e.respondWith(
  caches.match(e.request).then(function (response) {
    return response || fetch(e.request);
  })
);
});
month_picker.onclick = () => {
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
  dateFormate.classList.remove('showtime');
  dateFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  let calendar_header_year = document.querySelector('#year');
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  
  
  let currentDate = new Date();
  
  
  
  let first_day = new Date(year, month);


for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

    let day = document.createElement('div');

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;

      if (i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
    dayTextFormate.classList.remove('hideTime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hideTime');
    timeFormate.classList.add('showtime');
    dateFormate.classList.remove('hideTime');
    dateFormate.classList.add('showtime');
  };
});

(function () {
  month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);


const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');
function displayTime(){
  var dateTime = new Date();
  var hrs = dateTime.getHours();
  var min = dateTime.getMinutes();
  var sec = dateTime.getSeconds();
  var session = document.getElementById('session');

  if(hrs >= 12){
      session.innerHTML = 'PM';
  }else{
      session.innerHTML = 'AM';
  }

  if(hrs > 12){
      hrs = hrs - 12;
  }

  document.getElementById('hours').innerHTML = hrs;
  document.getElementById('minutes').innerHTML = min;
  document.getElementById('seconds').innerHTML = sec;
}
setInterval(displayTime, 10);

document.addEventListener("DOMContentLoaded", function () {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const calendar = document.querySelector('.calendar');
  const monthPicker = document.querySelector('.month-picker');
  const calendarDays = document.querySelector('.calendar-days');
  const eventModal = document.getElementById('eventModal');
  const addEventBtn = document.getElementById('addEventBtn');
  const closeEventBtn = document.getElementsByClassName("close")[0];
  const eventForm = document.getElementById('eventForm');

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();


  let event = false;
  eventsArr.forEach((eventObj) => {
    if (
      eventObj.day === i &&
      eventObj.month === month + 1 &&
      eventObj.year === year
    ) {
      event = true;
    }
  });
  if (
    i === new Date().getDate() &&
    year === new Date().getFullYear() &&
    month === new Date().getMonth()
  ) {
    activeDay = i;
    getActiveDay(i);
    updateEvents(i);
    if (event) {
      days += `<div class="day today active event">${i}</div>`;
    } else {
      days += `<div class="day today active">${i}</div>`;
    }
  
}


  monthPicker.addEventListener('click', () => {
    const monthList = document.querySelector('.month-list');
    monthList.innerHTML = '';
    monthNames.forEach((month, index) => {
      const monthListItem = document.createElement('div');
      monthListItem.textContent = month;
      monthListItem.addEventListener('click', () => {
        currentMonth = index;
        generateCalendar(currentMonth, currentYear);
        monthList.classList.remove('show');
      });
      monthList.appendChild(monthListItem);
    });
    monthList.classList.add('show');
  });

  addEventBtn.addEventListener('click', () => {
    eventModal.style.display = "block";
  });

  closeEventBtn.onclick = function() {
    eventModal.style.display = "none";
  }

  window.addEventListener('click', function(event) {
    if (event.target == eventModal) {
      eventModal.style.display = "none";
    }
  });

  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventDate = new Date(eventForm.eventDate.value);
    const eventName = eventForm.eventName.value;

    const formattedDate = `${eventDate.getDate()} - ${monthNames[eventDate.getMonth()]} - ${eventDate.getFullYear()}`;

    const eventDay = calendarDays.querySelector(`[data-date="${formattedDate}"]`);
    if (eventDay) {
      const eventBadge = document.createElement('span');
      eventBadge.classList.add('event-badge');
      eventBadge.textContent = '•';
      eventDay.appendChild(eventBadge);
      // Additional logic for saving the event data could be added here
    }
    eventModal.style.display = "none";
  });

  function generateCalendar(month, year) {
    calendarDays.innerHTML = '';

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const startingDay = firstDayOfMonth.getDay();

    for (let i = 0; i < startingDay; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('calendar-day', 'empty');
      calendarDays.appendChild(dayElement);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('calendar-day');
      dayElement.textContent = i;
      dayElement.dataset.date = `${i} - ${monthNames[month]} - ${year}`;
      calendarDays.appendChild(dayElement);
    }
  }

  generateCalendar(currentMonth, currentYear);
});

const addEventBtn = document.querySelector(".add-event"),
 addEventContainer = document.querySelector(".add-event-wrapper"),
 addEventCloseBtn = document.querySelector(".close"),
 addEventTitle = document.querySelector(".event-name"),
 addEventFrom = document.querySelector(".event-time-from"),
 addEventCloseTo = document.querySelector(".evet-time-to");
 

addEventBtn.addEventListener("click", () =>{
  addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
    addEventContainer.classList.remove("active");
  }
});

addEventTitle.addEventListener("input", (e) =>{
  addEventTitle.value = addEventTitle.value.slice(0, 50);
});

addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});
addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});



