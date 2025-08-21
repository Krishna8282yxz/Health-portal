document.addEventListener("DOMContentLoaded", () => {
    loadTips();
    loadVaccines();
    initSymptomChecker();
    initBMI();
    initStepTracker();
    initWaterReminder();
    loadFAQs();
    initFAQToggle();
    if (document.getElementById("event-list")) {
        loadEvents();
    }
});

// ========================
// Health Tips
// ========================
function loadTips() {
    const tips = [
        "Wash hands regularly with soap.",
        "Drink at least 8 glasses of water a day.",
        "Exercise for 30 minutes daily."
    ];
    const tipsContainer = document.getElementById("tips-container");
    if (!tipsContainer) return;
    tips.forEach(tip => {
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded shadow mb-2";
        div.textContent = tip;
        tipsContainer.appendChild(div);
    });
}

// ========================
// Vaccine Reminders
// ========================
function loadVaccines() {
    const vaccines = ["Hepatitis B", "Polio", "MMR", "COVID-19 booster"];
    const vaccineList = document.getElementById("vaccine-list");
    if (!vaccineList) return;
    vaccines.forEach(v => {
        const li = document.createElement("li");
        li.textContent = v;
        vaccineList.appendChild(li);
    });
}

// ========================
// Symptom Checker
// ========================
function initSymptomChecker() {
    const form = document.getElementById("symptom-form");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        const symptom = document.getElementById("symptom-input").value.trim().toLowerCase();
        const resultBox = document.getElementById("symptom-result");

        if (!symptom) {
            resultBox.textContent = "Please enter a symptom.";
            return;
        }

        // Symptom-based guidance
        if (symptom.includes("fever") || symptom.includes("temperature")) {
            resultBox.textContent = "Possible causes: Flu, infection, COVID-19. Stay hydrated, rest, monitor your temperature, and consult a doctor if fever is high or persists.";
        } else if (symptom.includes("cough") || symptom.includes("cold") || symptom.includes("flu") || symptom.includes("sore throat")) {
            resultBox.textContent = "Possible causes: Cold, flu, allergies, respiratory infection. Rest, drink warm fluids, cover your mouth when coughing, wash hands regularly, and consult a doctor if symptoms persist.";
        } else if (symptom.includes("stomach") || symptom.includes("stomach pain") || symptom.includes("diarrhea") || symptom.includes("vomiting")) {
            resultBox.textContent = "Possible causes: Food poisoning, gastroenteritis, indigestion. Drink plenty of fluids, avoid oily or spicy food, maintain hygiene, and consult a doctor if severe or persistent.";
        } else if (symptom.includes("diabetes") || symptom.includes("blood sugar") || symptom.includes("high sugar")) {
            resultBox.textContent = "Diabetes can be diagnosed by checking blood sugar levels. Monitor your diet, exercise regularly, and consult a doctor for proper diagnosis and management.";
        } else if (symptom.includes("dengue") || symptom.includes("malaria") || symptom.includes("mosquito") || symptom.includes("mosquitoes")) {
            resultBox.textContent = "Dengue and malaria are mosquito-borne diseases. Use mosquito nets, repellents, and maintain clean surroundings. Consult a doctor immediately if you have high fever or body pain.";
        } else if (symptom.includes("headache") || symptom.includes("migraine")) {
            resultBox.textContent = "Possible causes: Stress, dehydration, lack of sleep, eye strain. Drink water, rest, avoid screen strain, take over-the-counter pain relievers if needed, and consult a doctor if severe.";
        } else if (symptom.includes("chest pain") || symptom.includes("heart pain")) {
            resultBox.textContent = "Possible causes: Heart issues, acidity, muscle strain. Seek medical attention immediately if severe, persistent, or accompanied by shortness of breath.";
        } else if (symptom.includes("back pain") || symptom.includes("lower back")) {
            resultBox.textContent = "Possible causes: Muscle strain, poor posture, injury. Apply heat/cold packs, maintain good posture, exercise gently, and consult a doctor if persistent or severe.";
        } else if (symptom.includes("rash") || symptom.includes("itching") || symptom.includes("skin")) {
            resultBox.textContent = "Possible causes: Allergies, infections, dermatitis. Avoid irritants, maintain hygiene, and consult a dermatologist if it persists or worsens.";
        } else if (symptom.includes("fatigue") || symptom.includes("tired")) {
            resultBox.textContent = "Possible causes: Lack of sleep, anemia, stress, illness. Rest, eat nutritious food, stay hydrated, and consult a doctor if persistent.";
        } else if (symptom.includes("nausea") || symptom.includes("vomiting")) {
            resultBox.textContent = "Possible causes: Food poisoning, viral infection, motion sickness. Drink fluids, eat light food, rest, and consult a doctor if severe or persistent.";
        } else if (symptom.includes("shortness of breath") || symptom.includes("difficulty breathing")) {
            resultBox.textContent = "Possible causes: Asthma, respiratory infection, heart problems. Seek immediate medical attention if severe or sudden.";
        } else if (symptom.includes("joint pain") || symptom.includes("arthritis")) {
            resultBox.textContent = "Possible causes: Arthritis, injury, inflammation. Rest, apply heat/cold, take pain relievers if needed, and consult a doctor for diagnosis.";
        } else if (symptom.includes("eye pain") || symptom.includes("blurred vision") || symptom.includes("red eyes")) {
            resultBox.textContent = "Possible causes: Eye strain, infection, vision problems. Avoid screen strain, maintain eye hygiene, and consult an eye specialist if persistent.";
        } else {
            resultBox.textContent = `Possible causes for "${symptom}" could include common illnesses. Please consult a doctor for an accurate diagnosis and treatment.`;
        }
    });
}


// ========================
// BMI Calculator
// ========================
function initBMI() {
    const btn = document.getElementById("calc-bmi");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const h = parseFloat(document.getElementById("height").value) / 100;
        const w = parseFloat(document.getElementById("weight").value);
        const age = parseInt(document.getElementById("age").value);
        const resultBox = document.getElementById("bmi-result");

        if (!h || !w || !age) {
            resultBox.textContent = "Please enter valid height, weight, and age.";
            return;
        }

        const bmi = (w / (h * h)).toFixed(1);
        let category = "";

        if (bmi < 18.5) category = "Underweight";
        else if (bmi < 24.9) category = "Normal weight";
        else if (bmi < 29.9) category = "Overweight";
        else category = "Obese";

        resultBox.innerHTML = `BMI: <strong>${bmi}</strong> (${category})`;

        // Optional age-based advice
        if (age < 18) resultBox.innerHTML += "<br>Note: BMI interpretation may differ for children and teens.";
        else if (age >= 65) resultBox.innerHTML += "<br>For seniors, maintain a healthy BMI but consult a doctor for specific targets.";
    });
}

// ========================
// Step Tracker
// ========================
function initStepTracker() {
    const btn = document.getElementById("save-steps");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const steps = document.getElementById("step-input").value;
        const result = document.getElementById("step-result");

        if (!steps || isNaN(steps) || steps < 0) {
            result.textContent = "Please enter a valid number of steps.";
            return;
        }

        localStorage.setItem("steps", steps);
        result.textContent = `Steps saved: ${steps}`;
    });
}

// ========================
// Water Intake Reminder
// ========================
function initWaterReminder() {
    const btn = document.getElementById("start-water");
    if (!btn) return;

    btn.addEventListener("click", () => {
        alert("Water reminder started. You will get alerts every hour.");
        setInterval(() => {
            alert("Time to drink water! 💧");
        }, 60 * 60 * 1000);
    });
}

// ========================
// FAQ Loader
// ========================
function loadFAQs() {
    const faqs = [
        { q: "How often should I exercise?", a: "Aim for at least 30 minutes daily." },
        { q: "How much water should I drink?", a: "About 2–3 liters daily." }
    ];
    const faqContainer = document.getElementById("faq-container");
    if (!faqContainer) return;

    faqs.forEach(f => {
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded shadow mb-2";
        div.innerHTML = `<button class="faq-question font-semibold w-full text-left">${f.q}</button>
                         <p class="faq-answer hidden mt-2">${f.a}</p>`;
        faqContainer.appendChild(div);
    });
}

// ========================
// FAQ Toggle
// ========================
function initFAQToggle() {
    document.addEventListener("click", e => {
        if (e.target.classList.contains("faq-question")) {
            const answer = e.target.nextElementSibling;
            answer.classList.toggle("hidden");
        }
    });
}

// ========================
// Event Calendar Loader
// ========================
async function loadEvents() {
    try {
        const res = await fetch("data/events.json");
        const events = await res.json();
        const eventList = document.getElementById("event-list");
        if (!eventList) return;

        eventList.innerHTML = "";

        events.forEach(event => {
            const li = document.createElement("li");
            li.className = "border-b py-2";
            li.innerHTML = `
                <strong>${event.name}</strong> - ${event.date}<br>
                <span class="text-sm text-gray-600">${event.location}</span><br>
                <span class="text-gray-700">${event.description}</span>
            `;
            eventList.appendChild(li);
        });
    } catch (err) {
        console.error("Error loading events:", err);
        const eventList = document.getElementById("event-list");
        if (eventList) {
            eventList.innerHTML = "<p class='text-red-500'>Unable to load events.</p>";
        }
    }
}

