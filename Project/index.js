// let schedule = [];

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('schedule-form').addEventListener('submit', function(e) {
//         e.preventDefault();
//         scheduleCab();
//     });

//     setInterval(checkReminders, 1000); // Check reminders every second
// });

// function scheduleCab() {
//     const dateInput = document.getElementById('date');
//     const timeInput = document.getElementById('time');
//     const passengerInput = document.getElementById('passenger');

//     const date = dateInput.value;
//     const time = timeInput.value;
//     const passenger = passengerInput.value;

//     if (date === '' || time === '' || passenger === '') {
//         alert('Please fill in all the fields.');
//         return;
//     }

//     const dateTime = new Date(`${date}T${time}`);
//     const currentDate = new Date();

//     if (dateTime <= currentDate) {
//         alert('Invalid date and time. Please provide a future date and time.');
//         return;
//     }

//     schedule.push({
//         date: dateTime,
//         passenger: passenger
//     });

//     const scheduledItem = document.createElement('li');
//     scheduledItem.textContent = `${dateTime.toLocaleString()}: ${passenger}`;

//     if (dateTime - currentDate <= 120000) { // Check if cab is scheduled within 2 minutes
//         scheduledItem.classList.add('reminder');
//         promptConfirmation(dateTime, passenger);
//     }

//     document.getElementById('schedule-items').appendChild(scheduledItem);

//     dateInput.value = '';
//     timeInput.value = '';
//     passengerInput.value = '';
// }

// function checkReminders() {
//     const currentDate = new Date();
//     const scheduleItems = document.querySelectorAll('#schedule-items li');

//     scheduleItems.forEach(function(item) {
//         const dateTime = new Date(item.textContent.split(': ')[0]);

//         if (dateTime - currentDate <= 120000 && !item.classList.contains('reminder')) {
//             item.classList.add('reminder');
//             promptConfirmation(dateTime, item.textContent.split(': ')[1]);
//         }
//     });
// }

// function promptConfirmation(dateTime, passenger) {
//     const confirmation = confirm(`Please confirm your cab for ${dateTime.toLocaleString()} with passenger ${passenger}`);

//     if (confirmation) {
//         // Code to handle confirmed cab
//         alert('Cab confirmed!');
//     } else {
//         // Code to handle canceled cab
//         alert('Cab canceled!');
//     }
// }

let schedule = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('schedule-form').addEventListener('submit', function(e) {
        e.preventDefault();
        scheduleCab();
    });

    setInterval(checkReminders, 1000); // Check reminders every second
});

function scheduleCab() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const passengerInput = document.getElementById('passenger');
    const sourceInput = document.getElementById('source');
    const destinationInput = document.getElementById('destination');

    const date = dateInput.value;
    const time = timeInput.value;
    const passenger = passengerInput.value;
    const source = sourceInput.value;
    const destination = destinationInput.value;

    if (date === '' || time === '' || passenger === '' || source === '' || destination === '') {
        alert('Please fill in all the fields.');
        return;
    }

    const dateTime = new Date(`${date}T${time}`);
    const currentDate = new Date();

    if (dateTime <= currentDate) {
        alert('Invalid date and time. Please provide a future date and time.');
        return;
    }

    schedule.push({
        date: dateTime,
        passenger: passenger,
        source: source,
        destination: destination
    });

    const scheduledItem = document.createElement('li');
    const dateTimeText = document.createElement('span');
    dateTimeText.textContent = `${dateTime.toLocaleString()}: ${passenger}: ${source} - ${destination}`;
    scheduledItem.appendChild(dateTimeText);

    const button = document.createElement('button');
    button.textContent = 'Start Ride';
    button.style.float = 'right';
    button.style.height = '40px';
    button.style.fontSize = '20px';
    button.addEventListener('click', function() {
        promptConfirmation(dateTime, passenger);
    });
    scheduledItem.appendChild(button);

    if (dateTime - currentDate <= 120000) { // Check if cab is scheduled within 2 minutes
        scheduledItem.classList.add('reminder');
        promptConfirmation(dateTime, passenger);
    }

    document.getElementById('schedule-items').appendChild(scheduledItem);

    dateInput.value = '';
    timeInput.value = '';
    passengerInput.value = '';
    sourceInput.value = '';
    destinationInput.value = '';
}

function checkReminders() {
    const currentDate = new Date();
    const scheduleItems = document.querySelectorAll('#schedule-items li');

    scheduleItems.forEach(function(item) {
        const dateTime = new Date(item.firstChild.textContent.split(': ')[0]);

        if (dateTime - currentDate <= 120000 && !item.classList.contains('reminder')) {
            item.classList.add('reminder');
            promptConfirmation(dateTime, item.firstChild.textContent.split(': ')[1]);
        }
    });
}

function promptConfirmation(dateTime, passenger) {
    const confirmation = confirm(`Please confirm your cab for ${dateTime.toLocaleString()} with passenger ${passenger}`);

    if (confirmation) {
        // Code to handle confirmed cab
        alert('Cab confirmed!');
        window.open('face.html','_blank');
    } else {
        // Code to handle canceled cab
        alert('Cab canceled!');
    }
}
