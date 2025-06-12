// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Testimonial slider
const slider = document.querySelector('.testimonial-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Blinking Stars Generation
const blinkingStarsContainer = document.querySelector('.blinking-stars');
const numberOfStars = 100;

for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('span');
    const size = Math.random() * 3 + 1; // Stars between 1px and 4px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`; // Random delay up to 2 seconds
    blinkingStarsContainer.appendChild(star);
}

// Add parallax effect to the Milky Way background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const stars = document.querySelector('.stars');
    const twinkling = document.querySelector('.twinkling');
    
    stars.style.transform = `translateY(${scrolled * 0.5}px)`;
    twinkling.style.transform = `translateY(${scrolled * 0.3}px)`;
});

// Handle image loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading state
        img.classList.add('loading');
        
        // Handle successful load
        img.onload = () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        };
        
        // Handle load error
        img.onerror = () => {
            img.classList.remove('loading');
            img.classList.add('error');
            console.error(`Failed to load image: ${img.src}`);
        };
    });
});

// Modal functionality
const modal = document.getElementById('projectModal');
const modalImg = modal.querySelector('.modal-image');
const closeModal = modal.querySelector('.close-modal');

// Handle fullscreen view
document.querySelectorAll('.fullscreen-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectCard = button.closest('.project-card');
        const imgSrc = projectCard.querySelector('img').src;
        modalImg.src = imgSrc;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle project links
document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectTitle = button.closest('.project-card').querySelector('h5').textContent;
        const projectUrl = getProjectUrl(projectTitle);
        if (projectUrl) {
            window.open(projectUrl, '_blank');
        } else {
            alert(`No specific URL found for project: ${projectTitle}. Performing a general web search.`);
            window.open(`https://www.google.com/search?q=${encodeURIComponent(projectTitle + ' project')}`, '_blank');
        }
    });
});

// Function to get project URL based on title
function getProjectUrl(projectTitle) {
    const projectUrls = {
        'Alpaca Baby': 'https://alpaca.baby/',
        'The Fashion Space': 'https://thefashionspace.com/',
        'HodlPad App': 'https://hodlpad.app/',
        'MPRO Game Fantasy': 'https://fantasy.mprogame.com/',
        'Real Estate Agent Spain': 'https://realestateagentspain.com/',
        'UPPC BD': 'https://www.uppc-bd.org/',
        'ApeGorilla': 'https://apegorilla.com/',
        'Starl Project Market': 'https://market.starlproject.com/market',
        'BullRock VIP': 'https://bullrock.vip/',
        'Switchere': 'https://switchere.com/',
        'Roaming Abroad': 'https://www.roamingabroad.com.au/',
    };
    return projectUrls[projectTitle];
}

// Ensure sections fade in when scrolled into view
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
}); 