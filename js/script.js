function probValidation(prob) {
  return (!isNaN(prob)) && prob >= 0 && prob <= 100;
}

function dateValidation(dateStart, dateCurrent, dateEnd) {
  const d1 = getDays(dateStart, dateCurrent);
  const d2 = getDays(dateCurrent, dateEnd);
  
  return (!isNaN(d1)) && (!isNaN(d2)) && d1 >= 0 && d2 >= 0;
}

// Expected to receive date strings like "YYYY-MM-DD"
function getDays(date1, date2) {
  const d1 = new Date(date1.value);
  const d2 = new Date(date2.value);
  
  return (d2 - d1) / 1000 / 3600 / 24;
}

function calculateProb(e) {
  e.preventDefault();
  
  //console.log("Running calculateProb");
  //console.log(e.target["prob"].value);
  
  const userProb = e.target["prob"].value;
  const daysTotal = getDays(dateStart, dateEnd);
  const daysLeft = getDays(dateCurrent, dateEnd);
  
  // Input validation
  if (!probValidation(userProb)) {
    result.textContent = "Error: probability must be a number between 0 and 100";
    result.style.color = "red";
    return;
  }
  else if (!dateValidation(dateStart, dateCurrent, dateEnd)) {
    result.textContent = "Error: dates must be in sequence";
    result.style.color = "red";
    return;
  }
  
  result.style.color = "black";
  
  if (linear.checked) {
    result.textContent = userProb / daysTotal * daysLeft + "%";
  }
  else if (exponential.checked) {
    const decayFactor = (1 - userProb / 100)**(1 / daysTotal)
    
    result.textContent = (1 - decayFactor**daysLeft) * 100 + "%";
  }
}

//console.log("Running at start");

const form = document.querySelector("#discounter");
const prob = document.querySelector("#prob");
const modeLinear = document.querySelector("#linear");
const modeExponential = document.querySelector("#exponential");
const dateStart = document.querySelector("#dateStart");
const dateCurrent = document.querySelector("#dateCurrent");
const dateEnd = document.querySelector("#dateEnd");
const result = document.querySelector("#result");

// Default values
linear.checked = true;
dateStart.value = new Date().toISOString().substring(0,10);   // Today
dateCurrent.value = new Date().toISOString().substring(0,10); // Today
dateEnd.value = new Date().getFullYear() + 1 + "-01-01";      // Start of next year

form.addEventListener("submit", calculateProb);