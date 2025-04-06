document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initCarousel();
    initAboutSection();
    initFeedbackForm();
    initContactButton();
    initToggleSection();
});

// 1. Navbar with Hamburger Menu
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
}

// 2. Image Carousel with Auto-sliding
function initCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselData = [
        {
            image: 'https://cdn.pixabay.com/photo/2024/02/09/15/22/ai-generated-8563258_1280.jpg',
            title: 'Innovative Technology Solutions',
            text: 'Cutting-edge solutions for your business needs'
        },
        {
            image: 'https://cdn.pixabay.com/photo/2020/02/19/07/51/web-4861609_1280.jpg',
            title: 'Custom Software Development',
            text: 'Tailored solutions for your unique requirements'
        },
        {
            image: 'https://cdn.pixabay.com/photo/2022/04/04/16/42/ai-7111802_1280.jpg',
            title: 'AI & Machine Learning',
            text: 'Harness the power of artificial intelligence'
        }
    ];

    // Create carousel items
    carouselData.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.style.backgroundImage = `url(${item.image})`;
        
        const caption = document.createElement('div');
        caption.className = 'carousel-caption';
        caption.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.text}</p>
        `;
        
        carouselItem.appendChild(caption);
        carouselInner.appendChild(carouselItem);
    });

    // Auto-slide functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    setInterval(nextSlide, 5000);
}

// 3. About Section with Features
function initAboutSection() {
    const featuresList = document.querySelector('.features-list');
    const features = [
        'Enterprise-grade security',
        'Scalable architecture',
        'Smart contract functionality',
        'Interoperability with existing systems',
        'Energy-efficient design'
    ];

    features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
}

// 4. Feedback Form with Excel Export
// Feedback Form with Excel Export (saving all data to same sheet)
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    feedbackForm.innerHTML = `
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="rating">Rating</label>
            <select id="rating" name="rating" required>
                <option value="">Select rating</option>
                <option value="5">Excellent</option>
                <option value="4">Very Good</option>
                <option value="3">Good</option>
                <option value="2">Fair</option>
                <option value="1">Poor</option>
            </select>
        </div>
        <div class="form-group">
            <label for="comments">Comments</label>
            <textarea id="comments" name="comments" required></textarea>
        </div>
        <button type="submit" class="submit-btn">Submit Feedback</button>
        <button type="button" id="exportBtn" class="export-btn">Export All Feedback</button>
    `;

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            rating: document.getElementById('rating').value,
            comments: document.getElementById('comments').value,
            timestamp: new Date().toISOString()
        };
        
        // Save feedback to localStorage
        saveFeedback(formData);
        
        // Show success message
        alert('Thank you for your feedback!');
        
        // Reset form
        this.reset();
    });

    // Export all feedback when button is clicked
    document.getElementById('exportBtn').addEventListener('click', exportAllFeedback);
}

// Save feedback to localStorage
function saveFeedback(feedback) {
    // Get existing feedback or initialize empty array
    let allFeedback = JSON.parse(localStorage.getItem('feedbackData')) || [];
    
    // Add new feedback
    allFeedback.push(feedback);
    
    // Save back to localStorage
    localStorage.setItem('feedbackData', JSON.stringify(allFeedback));
    
    console.log('Feedback saved. Total entries:', allFeedback.length);
}

// Export all feedback to Excel
function exportAllFeedback() {
    // Get all feedback from localStorage
    const allFeedback = JSON.parse(localStorage.getItem('feedbackData')) || [];
    
    if (allFeedback.length === 0) {
        alert('No feedback data to export');
        return;
    }

    // Using SheetJS library
    if (typeof XLSX === 'undefined') {
        console.error('SheetJS library not loaded');
        alert('Excel export requires SheetJS library. Data logged to console instead.');
        console.log('All feedback data:', allFeedback);
        return;
    }

    try {
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        
        // Convert data to worksheet
        const ws = XLSX.utils.json_to_sheet(allFeedback);
        
        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "All Feedback");
        
        // Generate Excel file and download
        const fileName = `feedback_data_${new Date().toISOString().slice(0,10)}.xlsx`;
        XLSX.writeFile(wb, fileName);
        
        console.log(`Exported ${allFeedback.length} feedback entries`);
    } catch (error) {
        console.error('Error generating Excel file:', error);
        alert('Error generating Excel file. See console for details.');
    }
}

// 5. WhatsApp Contact Button
function initContactButton() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    whatsappBtn.href = `https://wa.me/1234567890?text=${encodeURIComponent('Hello TechSolutions, I have a question')}`;
}

// 6. Toggle Sections
function initToggleSection() {
    const toggleButtons = document.querySelector('.toggle-buttons');
    const contentContainer = document.querySelector('.toggle-content-container');
    
    const sections = [
        {
            id: 'product',
            title: 'Product Info',
            content: `
                <h3>Product Information</h3>
                <p>Our flagship product is designed to meet all your business needs.</p>
                <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul>
            `
        },
        {
            id: 'pricing',
            title: 'Pricing',
            content: `
                <h3>Pricing Plans</h3>
                <div class="pricing-plans">
                    <div class="plan">
                        <h4>Basic</h4>
                        <p>$29/month</p>
                    </div>
                    <div class="plan">
                        <h4>Pro</h4>
                        <p>$99/month</p>
                    </div>
                </div>
            `
        },
        {
            id: 'support',
            title: 'Support',
            content: `
                <h3>Customer Support</h3>
                <p>We offer 24/7 support for all our customers.</p>
                <p>Email: support@techsolutions.com</p>
            `
        }
    ];
    
    // Create toggle buttons
    sections.forEach((section, index) => {
        const button = document.createElement('button');
        button.className = `toggle-btn ${index === 0 ? 'active' : ''}`;
        button.textContent = section.title;
        button.dataset.target = section.id;
        
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.toggle-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(section.id).classList.add('active');
        });
        
        toggleButtons.appendChild(button);
    });
    
    // Create content sections
    sections.forEach((section, index) => {
        const content = document.createElement('div');
        content.id = section.id;
        content.className = `toggle-content ${index === 0 ? 'active' : ''}`;
        content.innerHTML = section.content;
        contentContainer.appendChild(content);
    });
}