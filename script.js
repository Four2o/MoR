console.log('Welcome to The Review Commission!');

// Review Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        // Set up form event listeners
        reviewForm.addEventListener('submit', handleReviewSubmission);
        
        // Set up service type change handler
        const serviceType = document.getElementById('serviceType');
        if (serviceType) {
            serviceType.addEventListener('change', handleServiceTypeChange);
        }
        
        // Set up individual review toggle
        const individualReviewCheckbox = document.getElementById('isIndividualReview');
        if (individualReviewCheckbox) {
            individualReviewCheckbox.addEventListener('change', handleIndividualReviewToggle);
        }
    }
});

// Service-specific data
const serviceOptions = {
    police: {
        name: "Police Force",
        options: [
            "Avon and Somerset Police",
            "Bedfordshire Police",
            "Cambridgeshire Constabulary",
            "Cheshire Constabulary",
            "City of London Police",
            "Cleveland Police",
            "Cumbria Constabulary",
            "Derbyshire Constabulary",
            "Devon & Cornwall Police",
            "Dorset Police",
            "Durham Constabulary",
            "Essex Police",
            "Gloucestershire Constabulary",
            "Greater Manchester Police",
            "Hampshire Constabulary",
            "Hertfordshire Constabulary",
            "Humberside Police",
            "Kent Police",
            "Lancashire Constabulary",
            "Leicestershire Police",
            "Lincolnshire Police",
            "Merseyside Police",
            "Metropolitan Police Service",
            "Norfolk Constabulary",
            "North Yorkshire Police",
            "Northamptonshire Police",
            "Northumbria Police",
            "Nottinghamshire Police",
            "South Yorkshire Police",
            "Staffordshire Police",
            "Suffolk Constabulary",
            "Surrey Police",
            "Sussex Police",
            "Thames Valley Police",
            "Warwickshire Police",
            "West Mercia Police",
            "West Midlands Police",
            "West Yorkshire Police",
            "Wiltshire Police"
        ]
    },
    healthcare: {
        name: "Healthcare Provider",
        options: [
            "NHS England",
            "NHS Scotland",
            "NHS Wales",
            "NHS Northern Ireland",
            "Private Healthcare Provider",
            "GP Practice",
            "Dental Practice",
            "Hospital",
            "Mental Health Services",
            "Emergency Services"
        ]
    },
    council: {
        name: "Council Service",
        options: [
            "Housing Services",
            "Social Services",
            "Waste Management",
            "Planning Department",
            "Council Tax",
            "Roads and Transport",
            "Environmental Health",
            "Education Services",
            "Libraries and Culture",
            "Benefits and Support"
        ]
    },
    education: {
        name: "Education Service",
        options: [
            "Primary School",
            "Secondary School",
            "Sixth Form College",
            "Further Education College",
            "University",
            "Special Education",
            "Adult Education",
            "Early Years",
            "Private Education",
            "Education Authority"
        ]
    },
    transport: {
        name: "Transport Service",
        options: [
            "National Rail",
            "London Underground",
            "Local Bus Services",
            "Tram Services",
            "Ferry Services",
            "Airport Services",
            "Transport for London",
            "Regional Transport Authority",
            "Coach Services",
            "Community Transport"
        ]
    }
};

function handleServiceTypeChange() {
    const serviceType = document.getElementById('serviceType').value;
    const specificDropdown = document.getElementById('serviceSpecificDropdown');
    const specificSelect = document.getElementById('specificService');
    const individualSection = document.getElementById('individualReviewSection');

    // Clear and hide specific service dropdown by default
    specificSelect.innerHTML = '<option value="">Please select...</option>';
    specificDropdown.style.display = 'none';
    
    if (serviceType && serviceOptions[serviceType]) {
        // Show and populate specific service dropdown
        specificDropdown.style.display = 'block';
        const options = serviceOptions[serviceType].options;
        options.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.toLowerCase().replace(/\s+/g, '-');
            optElement.textContent = option;
            specificSelect.appendChild(optElement);
        });
        
        // Show individual review section
        individualSection.style.display = 'block';
    } else {
        individualSection.style.display = 'none';
    }
}

function handleIndividualReviewToggle() {
    const isChecked = document.getElementById('isIndividualReview').checked;
    const individualFields = document.getElementById('individualFields');
    individualFields.style.display = isChecked ? 'block' : 'none';
}

function handleReviewSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const reviewData = {
        serviceType: formData.get('serviceType'),
        specificService: formData.get('specificService'),
        location: formData.get('location'),
        serviceDate: formData.get('serviceDate'),
        rating: formData.get('rating'),
        title: formData.get('reviewTitle'),
        text: formData.get('reviewText'),
        evidence: Array.from(formData.getAll('evidence')).map(file => file.name)
    };

    // Add individual review data if applicable
    if (formData.get('isIndividualReview')) {
        reviewData.individual = {
            name: formData.get('individualName'),
            idNumber: formData.get('identificationNumber'),
            jobTitle: formData.get('jobTitle')
        };
    }

    // For now, just log the data
    console.log('Review submitted:', reviewData);
    
    // Show success message
    alert('Thank you for your review! Once we implement backend storage, this will be saved.');
    
    // Reset form
    e.target.reset();
}

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Version tracking
let currentVersion = localStorage.getItem('siteVersion') || '1.0.0';

// Function to update version
function updateVersion() {
    const parts = currentVersion.split('.');
    parts[2] = (parseInt(parts[2]) + 1).toString();
    currentVersion = parts.join('.');
    localStorage.setItem('siteVersion', currentVersion);
    document.getElementById('version').textContent = currentVersion;
}

// Initialize version display
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('version').textContent = currentVersion;
});

// Track changes to the page content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (!mutation.target.id || mutation.target.id !== 'version') {
            updateVersion();
        }
    });
});

// Start observing the entire document for changes
observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
});
