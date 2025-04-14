document.addEventListener('DOMContentLoaded', function () {

    // --- Slider Functionality ---
    const slider = document.querySelector('.slider'); // Get the main slider container

    // Proceed only if a slider element exists on the page
    if (slider) {
        const slides = slider.querySelectorAll('.slide');
        const nextBtn = slider.querySelector('.slider-btn.next');
        const prevBtn = slider.querySelector('.slider-btn.prev');
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 5000; // Time between slides in milliseconds (5 seconds)

        // Function to display a specific slide
        function showSlide(index) {
            // Remove 'active' class from all slides
            slides.forEach(slide => slide.classList.remove('active'));

            // Add 'active' class to the target slide
            if (slides[index]) {
                slides[index].classList.add('active');
            }
        }

        // Function to advance to the next slide
        function nextSlide() {
            // Calculate the index of the next slide, wrapping around if necessary
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Function to go to the previous slide
        function prevSlide() {
            // Calculate the index of the previous slide, wrapping around if necessary
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Function to start the automatic slideshow
        function startSlider() {
            // Clear any existing interval to prevent duplicates
            clearInterval(slideInterval);
            // Start the interval only if there's more than one slide
            if (slides.length > 1) {
                slideInterval = setInterval(nextSlide, intervalTime);
            }
        }

        // Function to stop the automatic slideshow
        function stopSlider() {
            clearInterval(slideInterval);
        }

        // Initial setup
        if (slides.length > 0) {
            showSlide(currentSlide); // Show the first slide initially
            startSlider(); // Start the automatic transitions

            // Add event listeners for Next/Prev buttons if they exist and there's more than one slide
            if (nextBtn && prevBtn && slides.length > 1) {
                nextBtn.addEventListener('click', () => {
                    stopSlider();  // Stop auto slide on manual click
                    nextSlide();
                    // Optional: Restart slider after a delay or keep it stopped
                    // setTimeout(startSlider, intervalTime * 2); // Example: Restart after 10s
                });

                prevBtn.addEventListener('click', () => {
                    stopSlider(); // Stop auto slide on manual click
                    prevSlide();
                    // Optional: Restart slider
                    // setTimeout(startSlider, intervalTime * 2);
                });
            } else {
                // Hide buttons if there's only one slide or they don't exist
                if (nextBtn) nextBtn.style.display = 'none';
                if (prevBtn) prevBtn.style.display = 'none';
            }

            // Optional: Pause slider on mouse hover
            slider.addEventListener('mouseenter', stopSlider);
            slider.addEventListener('mouseleave', startSlider);

        } else {
            // Optional: Hide the entire slider section if no slides are found
            slider.style.display = 'none';
            console.log("No slides found in the slider element.");
        }
    } else {
        // console.log("No slider element found on this page.");
    }

    // --- Add other potential JavaScript functionality below ---
    // Example: Smooth scrolling for navigation links if needed
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

}); // End DOMContentLoaded