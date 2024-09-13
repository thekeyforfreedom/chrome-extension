document.addEventListener('DOMContentLoaded', function () {
    // Existing functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const dmModal = document.getElementById('dmModal');
    const saveDmScriptBtn = document.getElementById('saveDmScript');
    const dmTextarea = document.getElementById('dmScript');
    const maxUsersInput = document.getElementById('maxUsers');
    const maxUsersValue = document.getElementById('maxUsersValue');
    const intervalRangeInput = document.getElementById('intervalRange');
    const intervalRangeValue = document.getElementById('intervalRangeValue');
    const startButton = document.getElementById('startBtn');
    const actionButtons = document.querySelectorAll('.toggle-btn');

    // New functionality for horizontal scroll
    const tabNavigation = document.querySelector('.tab-navigation');
    const leftIndicator = document.querySelector('.scroll-indicator.left');
    const rightIndicator = document.querySelector('.scroll-indicator.right');

    // Function to switch tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle DM Button Click
    const dmButton = document.querySelector('.action-btn[data-action="dm"]');
    dmButton.addEventListener('click', function () {
        dmModal.style.display = 'block';
    });

    // Handle Save DM Script button
    saveDmScriptBtn.addEventListener('click', function () {
        const dmScript = dmTextarea.value.trim();
        if (dmScript) {
            localStorage.setItem('dmScript', dmScript);
            alert('DM Script Saved!');
        } else {
            alert('Please enter a DM script!');
        }
        dmModal.style.display = 'none';
    });

    // Close the modal if the user clicks outside of the modal content
    window.addEventListener('click', function (event) {
        if (event.target === dmModal) {
            dmModal.style.display = 'none';
        }
    });

    // Handle Range Slider for max users
    maxUsersInput.addEventListener('input', function () {
        maxUsersValue.textContent = this.value;
    });

    // Handle Range Slider for delay between actions
    intervalRangeInput.addEventListener('input', function () {
        const value = this.value;
        intervalRangeValue.textContent = `${value} - ${parseInt(value) + 2}`;
    });

    // Add event listeners for the start button
    startButton.addEventListener('click', function () {
        alert('Starting actions...');
        // Implement start functionality here
    });

    // Toggle Action Buttons
    actionButtons.forEach(button => {
        const switchElement = button.querySelector('.switch input[type="checkbox"]');
        
        // Initialize button state based on switch
        if (switchElement) {
            button.classList.toggle('active', switchElement.checked);
        }

        button.addEventListener('click', function (event) {
            // Only toggle if the click is not on the switch itself
            if (!event.target.closest('.switch')) {
                if (switchElement) {
                    switchElement.checked = !switchElement.checked;
                }
                this.classList.toggle('active');
            }
        });

        // Add event listeners for switches
        if (switchElement) {
            switchElement.addEventListener('change', function () {
                button.classList.toggle('active', this.checked);
            });
        }
    });

    // New functions for horizontal scroll
    function updateScrollIndicators() {
        const isAtStart = tabNavigation.scrollLeft === 0;
        const isAtEnd = tabNavigation.scrollLeft + tabNavigation.clientWidth >= tabNavigation.scrollWidth - 1;

        leftIndicator.style.display = isAtStart ? 'none' : 'block';
        rightIndicator.style.display = isAtEnd ? 'none' : 'block';
    }

    function scrollTabs(direction) {
        const scrollAmount = tabNavigation.clientWidth / 2;
        tabNavigation.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }

    leftIndicator.addEventListener('click', () => scrollTabs('left'));
    rightIndicator.addEventListener('click', () => scrollTabs('right'));

    tabNavigation.addEventListener('scroll', updateScrollIndicators);
    window.addEventListener('resize', updateScrollIndicators);

    // Initial call to set up scroll indicators
    updateScrollIndicators();

    // Dynamic color change for range inputs
    const rangeInputs = document.querySelectorAll('input[type="range"]');

    function updateRangeColor(input) {
        const value = input.value;
        const min = input.min || 0;
        const max = input.max || 100;
        const percentage = (value - min) / (max - min);
        
        // Interpolate between start color (#3a3a3a) and end color (#00BFFF)
        const r = Math.round(58 + (0 - 58) * percentage);
        const g = Math.round(58 + (191 - 58) * percentage);
        const b = Math.round(58 + (255 - 58) * percentage);
        
        const color = `rgb(${r}, ${g}, ${b})`;
        
        input.style.setProperty('--thumb-color', color);
    }

    rangeInputs.forEach(input => {
        input.style.setProperty('--thumb-color', '#3a3a3a');
        
        input.addEventListener('input', function() {
            updateRangeColor(this);
        });
        
        // Initial color update
        updateRangeColor(input);
    });

    // New functionality for toggle buttons
    const generateBtn = document.getElementById('generateDmScript');
    const saveBtn = document.getElementById('saveDmScript');
    const dmToggle = document.getElementById('dmToggle');

    function updateGenerateButtonState() {
        generateBtn.classList.toggle('active', dmToggle.checked);
    }

    // Initialize button state based on toggle switch
    updateGenerateButtonState();

    // Update button state when toggle switch changes
    dmToggle.addEventListener('change', updateGenerateButtonState);

    // Remove click listener from generate button
    generateBtn.removeEventListener('click', toggleActive);

    // Keep save button functionality
    saveBtn.addEventListener('click', function() {
        // Add your save functionality here
        console.log('Saving script...');
    });

    // New functionality for AI Generate button
    function toggleActive(btn) {
        btn.classList.toggle('active');
    }

    generateBtn.addEventListener('click', function() {
        toggleActive(generateBtn);
    });

    // Save button functionality
    saveBtn.addEventListener('click', function() {
        // Add your save functionality here
        console.log('Saving script...');
    });
});
