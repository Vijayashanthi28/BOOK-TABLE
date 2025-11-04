    //Navbar
          // Get all modal elements
        const registerBtn = document.getElementById('registerBtn');
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');
        const closeLogin = document.getElementById('closeLogin');
        const closeSignup = document.getElementById('closeSignup');
        const showSignup = document.getElementById('showSignup');
        const showLogin = document.getElementById('showLogin');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const registerSection = document.getElementById('registerSection');
        const userActions = document.getElementById('userActions');

        // Open login modal
        registerBtn.addEventListener('click', function() {
            loginModal.classList.add('active');
        });

        // Close login modal
        closeLogin.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });

        // Close signup modal
        closeSignup.addEventListener('click', function() {
            signupModal.classList.remove('active');
        });

        // Show signup modal from login
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            signupModal.classList.add('active');
        });

        // Show login modal from signup
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.classList.remove('active');
            loginModal.classList.add('active');
        });

        // Close modals when clicking outside
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });

        signupModal.addEventListener('click', function(e) {
            if (e.target === signupModal) {
                signupModal.classList.remove('active');
            }
        });

        // Handle login form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide register button, show user actions
            registerSection.classList.add('hidden');
            userActions.classList.add('active');
            
            // Close modal
            loginModal.classList.remove('active');
            
            alert('Login successful!');
        });

        // Handle signup form submission
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Switch to login modal after signup
            signupModal.classList.remove('active');
            loginModal.classList.add('active');
            
            alert('Account created! Please login.');
        });

        // Social login handlers
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                registerSection.classList.add('hidden');
                userActions.classList.add('active');
                loginModal.classList.remove('active');
                alert('Social login successful!');
            });
        });


//Contact
  // Get form and modal elements
        const contactForm = document.getElementById('contactForm');
        const successModal = document.getElementById('successModal');

        // Handle form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const phone = document.getElementById('userPhone').value;
            const message = document.getElementById('userMessage').value;

            // Here you would typically send the data to a server
            console.log('Form Data:', {
                name: name,
                email: email,
                phone: phone,
                message: message
            });

            // Show success modal
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal function
        function closeSuccessModal() {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Optional: Reset form after closing modal
            // contactForm.reset();
        }

        // Close modal when clicking outside
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                closeSuccessModal();
            }
        });
        //Payment options
          const dropdownHeader = document.getElementById('dropdownHeader');
        const dropdownArrow = document.getElementById('dropdownArrow');
        const optionsList = document.getElementById('optionsList');
        const paymentOptions = document.querySelectorAll('.payment-option');
        const paymentForm = document.getElementById('paymentForm');
        const submitBtn = document.getElementById('submitBtn');
        const successOverlay = document.getElementById('successOverlay');
        const closeModalBtn = document.getElementById('closeModalBtn');

        // Form inputs
        const cardholderName = document.getElementById('cardholderName');
        const cardNumber = document.getElementById('cardNumber');
        const expiryDate = document.getElementById('expiryDate');
        const cvv = document.getElementById('cvv');

        // Predefined data for double-click
        const predefinedData = {
            credit: {
                name: 'Amjath Althaf',
                number: '6398864798',
                expiry: '22/09/2029',
                cvv: '123'
            },
            debit: {
                name: 'Amjath Althaf',
                number: '5421987654321234',
                expiry: '15/12/2027',
                cvv: '456'
            },
            google: {
                name: 'Amjath Althaf',
                number: '9876543210123456',
                expiry: '08/06/2028',
                cvv: '789'
            },
            upi: {
                name: 'Amjath Althaf',
                number: '4532156789012345',
                expiry: '03/11/2026',
                cvv: '321'
            }
        };

        let selectedMethod = '';
        let clickTimeout = null;

        // Toggle dropdown
        dropdownHeader.addEventListener('click', () => {
            const isExpanded = optionsList.classList.contains('expanded');
            optionsList.classList.toggle('expanded');
            dropdownArrow.classList.toggle('rotated');
        });

        // Handle payment option selection
        paymentOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (clickTimeout) {
                    clearTimeout(clickTimeout);
                    clickTimeout = null;
                    
                    // Double click detected - fill with predefined data
                    handleDoubleClick(this);
                } else {
                    // Single click - just select the option
                    clickTimeout = setTimeout(() => {
                        handleSingleClick(this);
                        clickTimeout = null;
                    }, 300);
                }
            });
        });

        function handleSingleClick(option) {
            selectedMethod = option.getAttribute('data-method');
            
            // Remove selected class from all options
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Update dropdown header text
            dropdownHeader.querySelector('span').textContent = option.textContent;
            
            // Close dropdown
            optionsList.classList.remove('expanded');
            dropdownArrow.classList.remove('rotated');
            
            // Show payment form
            paymentForm.classList.add('visible');
            
            // Clear form
            clearForm();
        }

        function handleDoubleClick(option) {
            selectedMethod = option.getAttribute('data-method');
            
            // Select the option
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            // Update dropdown header text
            dropdownHeader.querySelector('span').textContent = option.textContent;
            
            // Close dropdown
            optionsList.classList.remove('expanded');
            dropdownArrow.classList.remove('rotated');
            
            // Show payment form
            paymentForm.classList.add('visible');
            
            // Fill with predefined data
            fillPredefinedData(selectedMethod);
        }

        function fillPredefinedData(method) {
            const data = predefinedData[method];
            if (data) {
                cardholderName.value = data.name;
                cardNumber.value = formatCardNumber(data.number);
                expiryDate.value = data.expiry;
                cvv.value = data.cvv;
            }
        }

        function clearForm() {
            cardholderName.value = '';
            cardNumber.value = '';
            expiryDate.value = '';
            cvv.value = '';
        }

        // Format card number with spaces
        function formatCardNumber(value) {
            const cleaned = value.replace(/\s/g, '');
            const formatted = cleaned.match(/.{1,4}/g);
            return formatted ? formatted.join(' ') : cleaned;
        }

        // Auto-format card number input
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            e.target.value = formatCardNumber(value);
        });

        // Auto-format expiry date
        expiryDate.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });

        // Submit button
        submitBtn.addEventListener('click', function() {
            // Validate form
            if (!cardholderName.value || !cardNumber.value || !expiryDate.value || !cvv.value) {
                alert('Please fill in all fields');
                return;
            }

            // Generate transaction ID
            const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();

            // Update success modal
            document.getElementById('paymentMethodText').textContent = 
                selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1) + ' Card';
            document.getElementById('cardholderText').textContent = cardholderName.value;
            document.getElementById('transactionId').textContent = transactionId;

            // Show success modal
            successOverlay.classList.add('active');
        });

        // Close modal
        closeModalBtn.addEventListener('click', function() {
            successOverlay.classList.remove('active');
            
            // Reset form after closing
            setTimeout(() => {
                clearForm();
                paymentForm.classList.remove('visible');
                paymentOptions.forEach(opt => opt.classList.remove('selected'));
                dropdownHeader.querySelector('span').textContent = 'Payment Selection';
                selectedMethod = '';
            }, 300);
        });

        // Close modal when clicking outside
        successOverlay.addEventListener('click', function(e) {
            if (e.target === successOverlay) {
                closeModalBtn.click();
            }
        });

       //Carousel index
// Sample city data with placeholder images
const cities = [
    { name: 'Chennai', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop' },
    { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop' },
    { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop' },
    { name: 'Delhi', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop' },
    { name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop' },
    { name: 'Pune', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop' }
];

const track = document.getElementById('carouselTrack');

// Create card element
function createCard(city) {
    const card = document.createElement('div');
    card.className = 'city-card';
    card.style.cursor = 'pointer'; // Add pointer cursor to indicate clickable
    card.innerHTML = `
        <img src="${city.image}" alt="${city.name} restaurants">
        <div class="city-name">${city.name}</div>
    `;
    
    // Add click event listener to redirect to collection.html
    card.addEventListener('click', function() {
        window.location.href = 'collections.html';
    });
    
    return card;
}

// Duplicate cards for seamless loop
// We create two sets to ensure smooth infinite scrolling
cities.forEach(city => track.appendChild(createCard(city)));
cities.forEach(city => track.appendChild(createCard(city)));

        //Reservation place
           let selectedRestaurant = null;

        function handleRestaurantClick(name, image, location, price) {
            selectedRestaurant = {
                name: name,
                image: image,
                location: location,
                price: price
            };
            
            document.getElementById('alertMessage').textContent = 
                `Would you like to book a table at ${name}?`;
            document.getElementById('alertModal').classList.add('active');
        }

        function confirmBooking() {
            // Store restaurant data in localStorage
            localStorage.setItem('selectedRestaurant', JSON.stringify(selectedRestaurant));
            // Redirect to booking page
            window.location.href = 'booking.html';
        }

        function closeAlert() {
            document.getElementById('alertModal').classList.remove('active');
        }

        function toggleFavorite(event, element) {
            event.stopPropagation();
            element.classList.toggle('active');
        }

        // Close modal when clicking outside
        document.getElementById('alertModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeAlert();
            }
        });