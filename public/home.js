// Get references to DOM elements
const signInModal = document.getElementById("signInModal");
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const closeBtn = document.querySelector(".close");
const signInForm = document.getElementById("signInForm");

// Open Modal
signInBtn.onclick = () => {
    signInModal.style.display = "block";
};

// Close Modal
closeBtn.onclick = () => {
    signInModal.style.display = "none";
};

// Close modal when clicking outside of it
window.onclick = (event) => {
    if (event.target === signInModal) {
        signInModal.style.display = "none";
    }
};

// Handle Sign In form submission (no email)
signInForm.onsubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // ✅ Save user_id to localStorage
            localStorage.setItem("user_id", data.user_id);

            alert("✅ Signed in successfully!");
            window.location.href = "tax-calculator.html";
        } else {
            alert("❌ Error: " + data.error);
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        alert("❌ Network error or backend not running.");
    }
};


// Handle Sign Out
signOutBtn.onclick = () => {
    alert("Signed out successfully!");
    window.location.href = "index.html";
};
