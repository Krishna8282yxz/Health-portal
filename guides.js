// guides.js

// Load JSON data dynamically
async function fetchGuides() {
    const response = await fetch("guides.json");
    return await response.json();
}

// Render guides into cards
async function loadGuides() {
    const guidesData = await fetchGuides();
    const container = document.getElementById("guides-container");
    container.innerHTML = "";

    const colorMap = {
        "Prevention": "from-green-500 to-green-600",
        "Nutrition": "from-orange-500 to-orange-600",
        "Mental Health": "from-purple-500 to-purple-600",
        "Sleep": "from-blue-500 to-blue-600",
        "Hydration": "from-teal-500 to-teal-600",
        "Exercise": "from-red-500 to-red-600",
        "Yoga": "from-indigo-500 to-indigo-600",
        "Digestion": "from-yellow-500 to-yellow-600",
        "Hygiene": "from-gray-500 to-gray-600",
        "Infections": "from-pink-500 to-pink-600"
    };

    guidesData.forEach((guide, index) => {
        const gradient = colorMap[guide.category] || "from-gray-500 to-gray-600";
        const card = document.createElement("div");
        card.className = "guide-card bg-white rounded-2xl shadow-lg p-6 flex flex-col transition-all hover:shadow-xl border border-green-100";
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <span class="text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white shadow">${guide.category}</span>
                <span class="text-gray-500 text-sm">📄 ${guide.steps.length} Steps</span>
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-3">${guide.title}</h2>
            <p class="text-gray-700 mb-4 flex-grow">${guide.description}</p>
            <button data-index="${index}" class="view-guide-btn bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-xl hover:from-gray-200 hover:to-gray-300 transition text-sm">
                View Guide
            </button>
        `;
        container.appendChild(card);
    });

    // Attach modal listeners
    document.querySelectorAll(".view-guide-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const guides = await fetchGuides();
            const guide = guides[e.target.dataset.index];
            openModal(guide);
        });
    });
}

// Open modal with full guide
function openModal(guide) {
    const modal = document.createElement("div");
    modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold">×</button>
            <div class="flex justify-between items-start mb-4">
                <span class="text-sm font-semibold px-3 py-1 rounded-full bg-green-600 text-white shadow">${guide.category}</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-3">${guide.title}</h2>
            <p class="text-lg text-gray-700 mb-6">${guide.description}</p>
            <h3 class="font-bold text-lg text-gray-800">Steps:</h3>
            <ol class="list-decimal list-inside space-y-2 text-lg text-gray-800">
                ${guide.steps.map(step => `<li>${step}</li>`).join("")}
            </ol>
            ${guide.details?.length ? `
            <div class="mt-6 p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
                <strong>${guide.details[0].category}:</strong>
                <em>${guide.details[0].examples}</em>
            </div>` : ""}
        </div>
    `;
    modal.querySelector("button").addEventListener("click", () => modal.remove());
    document.body.appendChild(modal);
}

// Download PDF with jsPDF
document.getElementById("download-btn").addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
    const guides = await fetchGuides();
    const pdf = new jsPDF();
    let y = 20;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Health Guides Compendium", 105, y, { align: "center" });
    y += 15;

    guides.forEach((guide, idx) => {
        if (y > 260) { pdf.addPage(); y = 20; }

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.text(`${guide.title} (${guide.category})`, 15, y);
        y += 8;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text(guide.description, 15, y, { maxWidth: 180 });
        y += 12;

        guide.steps.forEach((step, i) => {
            if (y > 260) { pdf.addPage(); y = 20; }
            pdf.text(`${i + 1}. ${step}`, 20, y, { maxWidth: 170 });
            y += 8;
        });

        y += 10;
    });

    pdf.save("health_guides.pdf");
});

// Initialize
loadGuides();
