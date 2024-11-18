document.addEventListener('DOMContentLoaded', () => {
    // Initialize phone input
    const phoneInput = document.querySelector("#phone");
    const iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        separateDialCode: true,
        initialCountry: "us",
        preferredCountries: ["us", "gb", "ca"],
    });

    // Format SSN
    document.getElementById('ssn').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 9) value = value.slice(0, 9);
        if (value.length >= 5) {
            value = `${value.slice(0,3)}-${value.slice(3,5)}-${value.slice(5)}`;
        } else if (value.length >= 3) {
            value = `${value.slice(0,3)}-${value.slice(3)}`;
        }
        e.target.value = value;
    });

    // Format phone number
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        if (value.length >= 6) {
            this.value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            this.value = `(${value.slice(0,3)}) ${value.slice(3)}`;
        }
    });

    // Form submission
    document.getElementById('personalInfoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!iti.isValidNumber()) {
            phoneInput.classList.add('error');
            return;
        }
        
        // Collect data
        const formData = new FormData(this);
        // API call here
        console.log('Form submitted:', Object.fromEntries(formData));
    });
});