// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const taxForm = document.getElementById('taxForm');
    const resultDiv = document.getElementById('result');
    const taxAmountDisplay = document.getElementById('taxAmount');
    const tipsButton = document.getElementById('tipsButton');

    const userId = localStorage.getItem("user_id");
    console.log("DEBUG: user_id =", userId);  // ✅ Check if it’s null or a number

    if (!userId) {
        alert("❌ User ID not found. Please sign in again.");
        return;
    }

    // Tax Calculation Logic
    taxForm.onsubmit = (e) => {
        e.preventDefault();

        const incomeInput = document.getElementById('income');
        const deductionsInput = document.getElementById('deductions');

        const income = parseFloat(incomeInput.value);
        const deductions = parseFloat(deductionsInput.value);

        if (isNaN(income) || isNaN(deductions)) {
            alert("Please enter valid numbers for both fields.");
            return;
        }

        const stdDeduction = 75000;
        let taxableIncome = income - deductions - stdDeduction;
        taxableIncome = Math.max(0, taxableIncome);

        let tax = 0;
        const slabs = [
            { limit: 400000, rate: 0 },
            { limit: 800000, rate: 0.05 },
            { limit: 1200000, rate: 0.10 },
            { limit: 1600000, rate: 0.15 },
            { limit: 2000000, rate: 0.20 },
            { limit: 2400000, rate: 0.25 },
            { limit: Infinity, rate: 0.30 }
        ];

        let remaining = taxableIncome;
        let prevLimit = 0;
        for (const slab of slabs) {
            if (remaining <= 0) break;
            const taxedAmt = Math.min(remaining, slab.limit - prevLimit);
            tax += taxedAmt * slab.rate;
            remaining -= taxedAmt;
            prevLimit = slab.limit;
        }

        let rebate = (taxableIncome <= 1200000) ? Math.min(60000, tax) : 0;
        const cess = (tax - rebate) * 0.04;
        const totalTax = tax - rebate + cess;

        taxAmountDisplay.textContent = `₹${totalTax.toFixed(2)}`;
        resultDiv.style.display = 'block';
        document.getElementById('taxableIncomeHidden').value = taxableIncome;

        // ✅ Save Tax Data to Backend
        fetch("http://localhost:5000/api/tax/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                annual_income: income,
                deductions: deductions,
                calculated_tax: totalTax.toFixed(2)
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("✅ Tax data saved:", data.message);
        })
        .catch(err => {
            console.error("❌ Error saving tax data:", err);
        });
    };

    // Tax Tips Logic
    tipsButton.onclick = () => {
        const tipsList = document.getElementById('tipsList');
        tipsList.innerHTML = '';

        const taxableIncome = parseFloat(document.getElementById('taxableIncomeHidden').value || "0");

        let tips = [];

        if (taxableIncome > 1000000) {
            tips = [
                "Invest in ELSS, PPF, or tax-saving FDs.",
                "Max out deductions under Section 80C.",
                "Claim medical insurance premiums under Section 80D.",
                "Use NPS for additional deductions under Section 80CCD(1B)."
            ];
        } else if (taxableIncome > 500000) {
            tips = [
                "Use standard deduction for salaried individuals.",
                "Claim tuition fees under Section 80C.",
                "Utilize HRA exemption if living in rented accommodation.",
                "Invest in health insurance for Section 80D deduction."
            ];
        } else {
            tips = [
                "Ensure you file ITR to claim any refund.",
                "Use Section 87A rebate if income is under ₹5,00,000.",
                "Avoid unnecessary investments if no tax liability.",
                "Keep all proof of deductions and exemptions ready."
            ];
        }

        tips.forEach(tip => {
            const li = document.createElement("li");
            li.textContent = tip;
            tipsList.appendChild(li);
        });

        const section = document.getElementById('taxTipsSection');
        section.style.display = 'block';
        section.scrollIntoView({ behavior: "smooth" });
    };

    // Sign Out
    document.getElementById('signOutBtn').onclick = () => {
        alert("Signed out successfully!");
        window.location.href = "index.html";
    };
});
