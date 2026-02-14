document.addEventListener('DOMContentLoaded', () => {
    // Check for user session
    const currentUser = JSON.parse(localStorage.getItem('sheHopeUser'));

    // --- Authentication Logic (auth.html) ---
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const toggleAuth = document.getElementById('toggle-auth');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            // Simple simulation
            if (email) {
                const user = { email: email, name: "User" }; // Simulate fetch
                localStorage.setItem('sheHopeUser', JSON.stringify(user));
                window.location.href = 'assessment.html'; // Redirect to assessment instead of dashboard
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullname').value;
            const email = document.getElementById('signup-email').value;
            // Simulate registration
            const newUser = { name, email, interests: [], persona: '' };
            localStorage.setItem('sheHopeUser', JSON.stringify(newUser));
            window.location.href = 'assessment.html';
        });
    }

    // --- Assessment Logic (assessment.html) ---
    const assessmentForm = document.getElementById('assessment-form');
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect Form Data
            const formData = new FormData(assessmentForm);
            const interests = formData.getAll('interests');
            const goal = formData.get('goal');

            // Logic to determine Persona
            let persona = 'Community Member 🤝';
            if (goal === 'job_support') persona = 'Career-Focused 💼';
            else if (goal === 'health_support') persona = 'Health-Focused 🧘‍♀️';
            else if (goal === 'emotional_support') persona = 'Wellness Seeker ❤️';
            else if (goal === 'learning') persona = 'Learner 📚';

            if (currentUser) {
                currentUser.interests = interests;
                currentUser.persona = persona;
                localStorage.setItem('sheHopeUser', JSON.stringify(currentUser));
            }

            window.location.href = 'dashboard.html';
        });
    }

    // --- Dashboard Logic (dashboard.html) ---
    const userNameDisplay = document.getElementById('user-name');
    const userPersonaDisplay = document.getElementById('user-persona');

    if (userNameDisplay && currentUser) {
        userNameDisplay.textContent = currentUser.name || "Friend";
    }
    if (userPersonaDisplay && currentUser) {
        userPersonaDisplay.textContent = currentUser.persona || "Member";
    }

    // Tab Navigation
    const tabs = document.querySelectorAll('.sidebar a[data-target]');
    const sections = document.querySelectorAll('.dashboard-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('data-target');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show target section
            sections.forEach(sec => sec.style.display = 'none');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                // Trigger fade-in animation
                targetSection.classList.remove('fade-in');
                void targetSection.offsetWidth; // trigger reflow
                targetSection.classList.add('fade-in');
            }
        });
    });

    // Show first section by default
    if (sections.length > 0) {
        sections.forEach(s => s.style.display = 'none');
        sections[0].style.display = 'block';
        sections[0].classList.add('fade-in');
    }

    // Emergency Exit
    const exitBtn = document.getElementById('emergency-exit');
    if (exitBtn) {
        exitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.replace("https://www.google.com/search?q=weather");
        });
    }
});

// Helper for toggling auth modes
function switchAuthMode(mode) {
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');
    const title = document.getElementById('auth-title');

    if (mode === 'signup') {
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
        title.textContent = 'Join SheHope ✨';
    } else {
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
        title.textContent = 'Welcome Back 🔐';
    }
}
