let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];

function calculateBMI() {
    let age = Number(ageInput.value);
    let gender = genderSelect.value;
    let weight = Number(weightInput.value);
    let height = Number(heightInput.value);

    const result = document.getElementById("result");
    const motivation = document.getElementById("motivation");
    const barFill = document.getElementById("barFill");
    const rightPanel = document.getElementById("resultBox");

    if (!age || !gender || !weight || !height) {
        alert("Please fill all fields");
        return;
    }

    if (age < 18) {
        alert("BMI calculation is for adults (18+)");
        return;
    }

    height /= 100;
    let bmi = (weight / (height * height)).toFixed(2);

    let status, color, advice, img, barWidth;

    if (bmi < 18.5) {
        status = "Underweight";
        color = "#ffc107";
        advice = "Increase calorie intake with nutritious food.";
        img = "image/under.png";
        barWidth = "25%";
    } else if (bmi < 25) {
        status = "Normal";
        color = "#28a745";
        advice = "Great job! Maintain your healthy lifestyle.";
        img = "image/helthy.png";
        barWidth = "50%";
    } else if (bmi < 30) {
        status = "Overweight";
        color = "#fd7e14";
        advice = "Exercise regularly and control diet.";
        img = "image/exc.png";
        barWidth = "75%";
    } else {
        status = "Obese";
        color = "#dc3545";
        advice = "Consult a healthcare professional.";
        img = "image/consul.jpg";
        barWidth = "100%";
    }

    result.innerHTML = `
        <span style="color:${color}">
            BMI: ${bmi}<br>
            Status: ${status}<br>
            Gender: ${gender}<br>
            Age: ${age}
        </span>
    `;

    barFill.style.background = color;
    barFill.style.width = barWidth;

    motivation.innerHTML = `
        <img src="${img}">
        <p>${advice}</p>
    `;

    rightPanel.style.display = "block";

    history.push({
        date: new Date().toLocaleString(),
        age,
        gender,
        bmi,
        status
    });

    localStorage.setItem("bmiHistory", JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.date} | BMI ${item.bmi} (${item.status})`;
        list.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem("bmiHistory");
    history = [];
    displayHistory();
}

const ageInput = document.getElementById("age");
const genderSelect = document.getElementById("gender");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");

displayHistory();
