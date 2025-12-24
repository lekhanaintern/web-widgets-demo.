// ===== WAIT FOR DOM TO LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== WIDGET 1: CALENDAR WIDGET =====
    const calendarInput = document.getElementById('calendar-input');
    const calendarOutput = document.getElementById('calendar-output');
    
    calendarInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        calendarOutput.textContent = `You selected: ${formattedDate}`;
    });
    
    
    // ===== WIDGET 2: DROPDOWN WIDGET =====
    const roleDropdown = document.getElementById('role-dropdown');
    const dropdownOutput = document.getElementById('dropdown-output');
    
    roleDropdown.addEventListener('change', function() {
        if (this.value) {
            dropdownOutput.textContent = `Selected Role: ${this.value}`;
        } else {
            dropdownOutput.textContent = 'No role selected';
        }
    });
    
    
    // ===== WIDGET 3: RADIO BUTTON WIDGET =====
    const radioButtons = document.querySelectorAll('input[name="gender"]');
    const radioOutput = document.getElementById('radio-output');
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            radioOutput.textContent = `Selected Gender: ${this.value}`;
        });
    });
    
    
    // ===== WIDGET 4: CHECKBOX WIDGET =====
    const checkboxes = document.querySelectorAll('input[name="skills"]');
    const checkboxOutput = document.getElementById('checkbox-output');
    
    function updateSkillsOutput() {
        const selectedSkills = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        if (selectedSkills.length > 0) {
            checkboxOutput.textContent = `Selected Skills: ${selectedSkills.join(', ')}`;
        } else {
            checkboxOutput.textContent = 'No skills selected';
        }
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSkillsOutput);
    });
    
    
    // ===== WIDGET 5: MERGED SEARCHABLE & SORTABLE TABLE =====
    const advancedTable = document.getElementById('advanced-table');
    const advancedTableBody = document.getElementById('advanced-table-body');
    const tableSearchInput = document.getElementById('table-search-input');
    const tableOutput = document.getElementById('table-output');
    const tableHeaders = advancedTable.querySelectorAll('th');
    
    // Get all rows and store original data
    const allTableRows = Array.from(advancedTableBody.querySelectorAll('tr'));
    const totalRows = allTableRows.length;
    
    // Store current sort state
    let currentSortColumn = null;
    let currentSortDirection = 'asc';
    
    // ===== SEARCH FUNCTIONALITY =====
    function filterTable() {
        const searchTerm = tableSearchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        
        allTableRows.forEach(row => {
            // Get all cell text content (including text inside span elements)
            const rowText = row.textContent.toLowerCase();
            
            if (rowText.includes(searchTerm)) {
                row.classList.remove('hidden');
                visibleCount++;
            } else {
                row.classList.add('hidden');
            }
        });
        
        // Update output message
        updateTableOutput(visibleCount, searchTerm);
    }
    
    function updateTableOutput(visibleCount, searchTerm) {
        if (visibleCount === 0) {
            tableOutput.textContent = 'No results found';
        } else if (searchTerm === '') {
            tableOutput.textContent = `Showing all ${totalRows} employees`;
        } else {
            tableOutput.textContent = `Found ${visibleCount} matching employee${visibleCount !== 1 ? 's' : ''}`;
        }
    }
    
    // Add search event listener
    tableSearchInput.addEventListener('input', filterTable);
    
    
    // ===== SORT FUNCTIONALITY =====
    function sortTable(column, dataType) {
        // Get only visible rows (not hidden by search)
        const visibleRows = Array.from(advancedTableBody.querySelectorAll('tr:not(.hidden)'));
        const columnIndex = Array.from(tableHeaders).findIndex(th => th.getAttribute('data-column') === column);
        
        // Toggle sort direction if clicking same column, otherwise start with ascending
        if (currentSortColumn === column) {
            currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            currentSortDirection = 'asc';
            currentSortColumn = column;
        }
        
        // Sort the visible rows
        visibleRows.sort((rowA, rowB) => {
            let aValue = rowA.cells[columnIndex].textContent.trim();
            let bValue = rowB.cells[columnIndex].textContent.trim();
            
            // Handle different data types
            switch(dataType) {
                case 'number':
                    aValue = parseInt(aValue) || 0;
                    bValue = parseInt(bValue) || 0;
                    break;
                    
                case 'currency':
                    aValue = parseInt(aValue.replace(/[$,]/g, '')) || 0;
                    bValue = parseInt(bValue.replace(/[$,]/g, '')) || 0;
                    break;
                    
                case 'string':
                default:
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                    break;
            }
            
            // Compare values based on sort direction
            if (currentSortDirection === 'asc') {
                if (dataType === 'number' || dataType === 'currency') {
                    return aValue - bValue;
                } else {
                    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                }
            } else {
                if (dataType === 'number' || dataType === 'currency') {
                    return bValue - aValue;
                } else {
                    return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
                }
            }
        });
        
        // Update header styles
        tableHeaders.forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
        });
        
        const activeHeader = Array.from(tableHeaders).find(th => th.getAttribute('data-column') === column);
        if (activeHeader) {
            activeHeader.classList.add(currentSortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
        }
        
        // Re-append rows in sorted order
        // First, get all hidden rows to preserve them
        const hiddenRows = Array.from(advancedTableBody.querySelectorAll('tr.hidden'));
        
        // Clear table body
        advancedTableBody.innerHTML = '';
        
        // Append sorted visible rows
        visibleRows.forEach(row => advancedTableBody.appendChild(row));
        
        // Append hidden rows at the end
        hiddenRows.forEach(row => advancedTableBody.appendChild(row));
    }
    
    // Add click event listeners to all headers
    tableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            const dataType = this.getAttribute('data-type');
            sortTable(column, dataType);
        });
    });
    
    
    // ===== WIDGET 7: CARD WIDGET =====
    const cardButtons = document.querySelectorAll('.card-btn');
    
    cardButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Resume')) {
                alert('Opening full resume... (This is a demo)');
            } else {
                alert('Opening contact form... (This is a demo)');
            }
        });
    });
    
    
    // ===== WIDGET 8: FORM INPUTS =====
    const userForm = document.getElementById('user-form');
    const rangeInput = document.getElementById('range-input');
    const rangeValue = document.getElementById('range-value');
    const formOutput = document.getElementById('form-output');
    const submitFormBtn = document.getElementById('submit-form-btn');
    
    // Range slider live update
    rangeInput.addEventListener('input', function() {
        rangeValue.textContent = this.value;
    });
    
    // Form submission
    submitFormBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const textInput = document.getElementById('text-input').value;
        const emailInput = document.getElementById('email-input').value;
        const numberInput = document.getElementById('number-input').value;
        const fileInput = document.getElementById('file-input').files[0];
        const rangeValue = document.getElementById('range-input').value;
        
        let message = 'Form Submitted Successfully!\n';
        if (textInput) message += `Name: ${textInput}\n`;
        if (emailInput) message += `Email: ${emailInput}\n`;
        if (numberInput) message += `Age: ${numberInput}\n`;
        if (fileInput) message += `File: ${fileInput.name}\n`;
        message += `Proficiency: ${rangeValue}%`;
        
        formOutput.textContent = message;
        formOutput.style.whiteSpace = 'pre-line';
    });
    
    
    // ===== WIDGET 9: ACCORDION WIDGET =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already open
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    
    
    // ===== WIDGET 10: TABS WIDGET =====
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    
    // ===== WIDGET 11: CAROUSEL WIDGET =====
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carouselOutput = document.getElementById('carousel-output');
    const carouselContainer = document.querySelector('.carousel-container');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    let isAutoPlaying = true;
    
    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update output message
        carouselOutput.textContent = `Slide ${index + 1} of ${totalSlides} | ${isAutoPlaying ? 'Auto-playing (pause on hover)' : 'Paused'}`;
    }
    
    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Function to start auto-play
    function startAutoPlay() {
        isAutoPlaying = true;
        autoPlayInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        carouselOutput.textContent = `Slide ${currentSlide + 1} of ${totalSlides} | Auto-playing (pause on hover)`;
    }
    
    // Function to stop auto-play
    function stopAutoPlay() {
        isAutoPlaying = false;
        clearInterval(autoPlayInterval);
        carouselOutput.textContent = `Slide ${currentSlide + 1} of ${totalSlides} | Paused`;
    }
    
    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoPlay(); // Stop auto-play when user manually navigates
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoPlay(); // Stop auto-play when user manually navigates
    });
    
    // Event listeners for indicator dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoPlay(); // Stop auto-play when user clicks a dot
        });
    });
    
    // Pause auto-play on hover
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
    
    // Start auto-play on page load
    startAutoPlay();
    
    
    // ===== INITIALIZE: Add some visual feedback on page load =====
    console.log('✅ All widgets loaded successfully!');
    console.log('📚 11 interactive widgets ready to use');
    console.log(`📊 Advanced Table: ${totalRows} entries with search & sort`);
    console.log(`🎠 Carousel: ${totalSlides} slides with auto-play`);
    console.log('🔍 Search the table and click column headers to sort!');
    
});