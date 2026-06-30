// Smooth scroll to signup section
function scrollToSignup() {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
        signupSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(signupForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email')
            };

            // For now, just show a success message
            // In production, this would send to an actual email service
            alert('Thank you for signing up! Your free guide will be sent to ' + data.email);
            signupForm.reset();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // For now, just show a success message
            // In production, this would send to an actual email service
            alert('Thank you for your message! I will get back to you within 24-48 hours.');
            contactForm.reset();
        });
    }
});
