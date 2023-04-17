const calculateButton = document.querySelector('#calculate');
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const dates = [day, month, year];

const dayError = document.querySelector("#day-err");
const monthError = document.querySelector("#month-err");
const yearError = document.querySelector("#year-err");
const arrayError = [dayError, monthError, yearError];

const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDate();
const currentYear = date.getFullYear();


function validateInput() {
    let isValid = true;
    const inputDate = new Date(year.value, month.value - 1, day.value);

    if (year.value == "" || month.value == "" || day.value == "") {
        arrayError.forEach((arrayError) => {
            arrayError.innerHTML = "This field is required";
        })
        day.style.borderColor = "red";
        month.style.borderColor = "red";
        year.style.borderColor = "red";
        isValid = false;
    }

    if (year.value > currentYear) {
        yearError.innerHTML = "Must be in the past";
        year.style.borderColor = "red";
        isValid = false;
    }

    if (month.value !== "" && (month.value > 12 || month.value < 1)) {
        monthError.innerHTML = "Must be a valid month";
        month.style.borderColor = "red";
        isValid = false;
    }

    if (day.value !== "" && (day.value > 31 || day.value < 1)) {
        dayError.innerHTML = "Must be a valid day";
        day.style.borderColor = "red";
        isValid = false;
    }

    return isValid;
}

calculateButton.addEventListener("click", function () {
    clear()
    if (validateInput()) {
      const birthDate = new Date(year.value, month.value - 1, day.value);
      const age = calculateAge(birthDate);
      document.getElementById("result-year").innerHTML = age.years;
      document.getElementById("result-month").innerHTML = age.months;
      document.getElementById("result-day").innerHTML = age.days;
    }
});

function calculateAge(birthDate) {
    const today = new Date();
    const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth();
    let y1 = birthDate.getFullYear();

    let d2 = today.getDate();
    let m2 = today.getMonth();
    let y2 = today.getFullYear();

    if(d1 > d2){
        d2 = d2 + month[m2 - 1];
        m2 = m2 - 1;
      }
    if(m1 > m2){
    m2 = m2 + 12;
    y2 = y2 - 1;
    }

    let years = y2 - y1;
    let months = m2 - m1;
    let days = d2 - d1;
  
    return { years: years, months: months, days: days };
}

function clear() {
    dayError.innerHTML = "";
    monthError.innerHTML = "";
    yearError.innerHTML = "";
    dates.forEach((dates) => {
        dates.style.borderColor = "rgb(107, 114, 128)";
    });
}