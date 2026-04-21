// feedbackscript.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript file loaded successfully.");

    document.getElementById('myForm').addEventListener('submit', function(event) {
        // Prevent the form from submitting
        event.preventDefault();

        // Clear previous error messages
        clearErrors();

        // Get the input elements
        const firstName = document.getElementById('fname');
        const lastName = document.getElementById('lname');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const visitYes = document.getElementById('yes2');
        const visitNo = document.getElementById('no2');
        const usefulYes = document.getElementById('useful-yes');
        const usefulNo = document.getElementById('useful-no');
        const improvements = document.getElementById('improvements2');
        const additionalRequests = document.getElementById('additional3');
        let hasError = false;

        // Initialize an array to hold error messages
        const errorMessages = [];

        // Validate first name
        if (firstName.value.trim() === '') {
            showError(firstName, 'Required');
            hasError = true;
        }

        // Validate last name
        if (lastName.value.trim() === '') {
            showError(lastName, 'Required');
            hasError = true;
        }

        // Validate email
        if (email.value.trim() === '') {
            showError(email, 'Required.');
            hasError = true;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, 'Please enter a valid email address.');
            hasError = true;
        }

        // Validate phone number
        if (phone.value.trim() === '') {
            showError(phone, 'Required.');
            hasError = true;
        } else if (!validatePhone(phone.value.trim())) {
            showError(phone, 'Enter a valid phone number');
            hasError = true;
        }

        // Validate radio buttons for usefulness
        if (!usefulYes.checked && !usefulNo.checked) {
            showError(usefulYes, 'Requred'); // Pass a radio button element
            hasError = true;
        }

        // Validate improvements textarea
        if (usefulNo.checked && improvements.value.trim() === '') {
            showError(improvements, 'Please suggest improvements if you found the site unhelpful.');
            hasError = true;
        }

        // Validate additional requests
        if (additionalRequests.value.trim() === '') {
            showError(additionalRequests, 'Please provide any additional questions or requests.');
            hasError = true;
        }

         // If there are errors, show them in a dialog box
         if (hasError) {
            alert(errorMessages.join('\n')); // Show all error messages in a dialog box
        } else {
            alert('Your feedback has been submitted successfully. Thank you!');

            // Clear input fields after successful submission
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            phone.value = '';
            visitYes.checked = false;
            visitNo.checked = false;
            usefulYes.checked = false;
            usefulNo.checked = false;
            improvements.value = '';
            additionalRequests.value = '';

            // Uncomment the line below to actually submit the form
            // this.submit();
        }
    });

        function showError(input, message) {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error';
            errorSpan.textContent = message;
        
            // Check if input is a valid DOM element
            if (input && input.parentNode) {
                const parent = input.parentNode;
                if (input.nextSibling) {
                    parent.insertBefore(errorSpan, input.nextSibling);
                } else {
                    parent.appendChild(errorSpan); // Fallback if nextSibling doesn't exist
                }
            } else {
                console.error('Invalid input element passed to showError:', input);
            }
        }

        // Function to clear previous error messages
        function clearErrors() {
            const errorSpans = document.querySelectorAll('.error');
            errorSpans.forEach(span => span.remove());
        }

        

        // Function to validate email format
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
            return re.test(email);
        }

        // Function to validate phone number format (digits only)
        function validatePhone(phone) {
            const re = /^\d+$/; // Matches only digits
            return re.test(phone);
        }

        
    });