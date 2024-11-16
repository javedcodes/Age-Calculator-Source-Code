// Days in each month, index 0 is January, index 1 is February, etc.
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
// Function to update the number of days based on selected month and year
function updateDays(selectId) {
    const selectElement = document.querySelector(`#${selectId}`);
    const month = parseInt(document.querySelector(`#${selectId.replace('-day', '-month')}`).value) - 1; // Get the selected month (0-indexed)
    const year = parseInt(document.querySelector(`#${selectId.replace('-day', '-year')}`).value);
    
    // Clear existing options
    selectElement.innerHTML = '';
    
    // Get the correct number of days for the selected month
    let days = daysInMonth[month];
    
    // February (index 1) in a leap year
    if (month === 1) {
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            days = 29; // Leap year
        }
    }

    // Add day options dynamically
    for (let i = 1; i <= days; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectElement.appendChild(option);
    }
}

// Function to calculate the age and different time formats
function calculateAge(event) {
    event.preventDefault();

    // Get Date of Birth (DOB) and Age-at date values
    const dobMonth = parseInt(document.querySelector("#dob-month").value);
    const dobDay = parseInt(document.querySelector("#dob-day").value);
    const dobYear = parseInt(document.querySelector("#dob-year").value);
    const ageAtMonth = parseInt(document.querySelector("#ageAt-month").value);
    const ageAtDay = parseInt(document.querySelector("#ageAt-day").value);
    const ageAtYear = parseInt(document.querySelector("#ageAt-year").value);

    // Validate input
    if (isNaN(dobMonth) || isNaN(dobDay) || isNaN(dobYear) || isNaN(ageAtMonth) || isNaN(ageAtDay) || isNaN(ageAtYear)) {
        alert("Please enter valid dates.");
        return;
    }

    // Create Date objects for DOB and Age-at Date
    const dob = new Date(dobYear, dobMonth - 1, dobDay); // months are 0-indexed in JavaScript
    const ageAtDate = new Date(ageAtYear, ageAtMonth - 1, ageAtDay);

    // Calculate age
    let years = ageAtDate.getFullYear() - dob.getFullYear();
    let months = ageAtDate.getMonth() - dob.getMonth();
    let days = ageAtDate.getDate() - dob.getDate();

    // Adjust if days or months are negative
    if (days < 0) {
        months--;
        days += new Date(ageAtDate.getFullYear(), ageAtDate.getMonth(), 0).getDate(); // Get last day of previous month
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate total months, weeks, and other units
    const totalDays = Math.floor((ageAtDate - dob) / (1000 * 60 * 60 * 24)); // Total days
    const totalMonths = Math.floor(totalDays / 30.44); // Average days per month
    const totalWeeks = Math.floor(totalDays / 7); // Total weeks
    const totalHours = totalDays * 24; // Total hours
    const totalMinutes = totalHours * 60; // Total minutes
    const totalSeconds = totalMinutes * 60; // Total seconds

    // Calculate age in months, weeks, and days separately
    const monthsAndDays = `${totalMonths} months, ${Math.floor((totalDays % 30.44) / 7)} week(s), and ${totalDays % 7} day(s)`;
    const weeksAndDays = `${totalWeeks} week(s) and ${totalDays % 7} day(s)`;

    // Display results
    document.querySelector("#result").innerHTML = `
        <p class="age-bold">Age as of the selected date: ${years} years ${months} months ${days} days</p>
        <p><strong>Age in Months:</strong> ${monthsAndDays}</p>
        <p><strong>Age in Weeks:</strong> ${weeksAndDays}</p>
        <p><strong>Age in Days:</strong> ${totalDays} days</p>
        <p><strong>Age in Hours:</strong> ${totalHours} hours</p>
        <p><strong>Age in Minutes:</strong> ${totalMinutes} minutes</p>
        <p><strong>Age in Seconds:</strong> ${totalSeconds} seconds</p>
    `;
}

// Set default values for Date of Birth and current Age-at date
window.onload = function() {
    // Set default Date of Birth (8 June 1981)
    document.querySelector("#dob-month").value = 6;
    document.querySelector("#dob-day").value = 8;
    document.querySelector("#dob-year").value = 1981;
    updateDays("dob-day"); // Update days for default month (June)

    // Set Age-as-of date to current date
    const currentDate = new Date();
    document.querySelector("#ageAt-month").value = currentDate.getMonth() + 1; // 0-indexed month
    document.querySelector("#ageAt-day").value = currentDate.getDate();
    document.querySelector("#ageAt-year").value = currentDate.getFullYear();
    updateDays("ageAt-day"); // Update days for the current month
};