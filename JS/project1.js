const clock = document.getElementById("digital-clock");
const toggleFormat = document.getElementById("toggle-format");
const fontSize = document.getElementById("font-size");
const colorScheme = document.getElementById("color-scheme");
const alarmTime = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm");
const alarmsList = document.getElementById("alarms-list");

let is24HourFormat = JSON.parse(localStorage.getItem("is24HourFormat")) || false;
let clockColor = localStorage.getItem("clockColor") || "#000000";
let clockFontSize = localStorage.getItem("clockFontSize") || "48";
let alarms = JSON.parse(localStorage.getItem("alarms")) || [];

// Update clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  if (!is24HourFormat) {
    hours = hours % 12 || 12;
  }

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const currentTime = `${formattedHours}:${formattedMinutes}`;

  clock.textContent = `${formattedHours}:${formattedMinutes}:${String(seconds).padStart(2, "0")}`;
  
  checkAlarms(currentTime);
}

// Toggle time format
toggleFormat.checked = is24HourFormat;
toggleFormat.addEventListener("change", () => {
  is24HourFormat = toggleFormat.checked;
  localStorage.setItem("is24HourFormat", is24HourFormat);
});

// Customize font size
fontSize.value = clockFontSize;
clock.style.fontSize = `${clockFontSize}px`;
fontSize.addEventListener("input", () => {
  clockFontSize = fontSize.value;
  clock.style.fontSize = `${clockFontSize}px`;
  localStorage.setItem("clockFontSize", clockFontSize);
});

// Customize color scheme
colorScheme.value = clockColor;
clock.style.color = clockColor;
colorScheme.addEventListener("input", () => {
  clockColor = colorScheme.value;
  clock.style.color = clockColor;
  localStorage.setItem("clockColor", clockColor);
});

// Set alarms
function renderAlarms() {
  alarmsList.innerHTML = "";
  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.textContent = alarm;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      alarms.splice(index, 1);
      localStorage.setItem("alarms", JSON.stringify(alarms));
      renderAlarms();
    });
    li.appendChild(deleteButton);
    alarmsList.appendChild(li);
  });
}

// Check alarms
function checkAlarms(currentTime) {
  alarms.forEach((alarm, index) => {
    if (alarm === currentTime) {
      setTimeout(() => {
        alert(`⏰ Alarm for ${alarm} is going off!`);
      }, 500); // Small delay to prevent multiple alerts in case of seconds mismatch

      // Remove the alarm after triggering
      alarms.splice(index, 1);
      localStorage.setItem("alarms", JSON.stringify(alarms));
      renderAlarms();
    }
  });
}

// Set new alarm
setAlarmButton.addEventListener("click", () => {
  if (alarmTime.value) {
    const [hours, minutes] = alarmTime.value.split(":");
    let formattedHours = parseInt(hours, 10);

    if (!is24HourFormat && formattedHours > 12) {
      formattedHours -= 12;
    } else if (!is24HourFormat && formattedHours === 0) {
      formattedHours = 12;
    }

    const formattedAlarmTime = `${String(formattedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    if (!alarms.includes(formattedAlarmTime)) {
      alarms.push(formattedAlarmTime);
      localStorage.setItem("alarms", JSON.stringify(alarms));
      renderAlarms();
    }
  }
});

// Initialize
renderAlarms();
setInterval(updateClock, 1000);
